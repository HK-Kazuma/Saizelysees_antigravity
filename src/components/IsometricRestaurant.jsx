import React, { useRef, useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  TILE_W,
  TILE_H,
  gridToScreen,
  screenToGrid,
  drawFloorTile,
  drawWall,
  drawTable,
  drawPastaBoiler,
  drawOven,
  drawSaladStation,
  drawDrinkBar,
  drawRegister,
  drawCharacter,
  drawSteamParticle,
  drawPopupText,
  drawBubble
} from '../utils/pixelRenderer';
import { sounds } from '../utils/soundEffects';

export default function IsometricRestaurant() {
  const canvasRef = useRef(null);
  const {
    money,
    setMoney,
    exp,
    setExp,
    recipes,
    equipment,
    staffList,
    decorations,
    currentExpansion,
    tables,
    setTables,
    popups,
    setPopups,
    addPopup,
    setPosterModalOpen,
    setCookingGameOrder,
    handlePayment
  } = useGame();

  // 内部アニメーション状態
  const animRef = useRef(null);
  const steamParticlesRef = useRef([]);
  const charactersRef = useRef({
    waiters: [],
    chefs: [],
    customers: []
  });
  const [hoveredTable, setHoveredTable] = useState(null);
  const [posterHovered, setPosterHovered] = useState(false);

  // ポスター画像ロード
  const posterImgRef = useRef(null);
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/wall_poster_framed.png';
    img.onload = () => {
      posterImgRef.current = img;
    };
  }, []);

  // スタッフの初期配置同期
  useEffect(() => {
    const waiters = staffList
      .filter(s => s.type === 'waiter')
      .map((s, idx) => ({
        id: s.id,
        x: 180 + idx * 30,
        y: 200 + idx * 20,
        targetX: 180,
        targetY: 200,
        direction: 'right',
        state: 'idle', // idle, walking_to_table, carrying_order, carrying_food
        carryingItem: null,
        targetTableId: null,
        bobOffset: 0
      }));

    const chefs = staffList
      .filter(s => s.type === 'chef')
      .map((s, idx) => ({
        id: s.id,
        x: 320 + idx * 25,
        y: 110 + idx * 10,
        targetX: 320,
        targetY: 110,
        direction: 'left',
        state: 'cooking',
        bobOffset: 0
      }));

    charactersRef.current.waiters = waiters;
    charactersRef.current.chefs = chefs;
  }, [staffList.length]);

  // お客さんの来店・状態遷移シミュレーションタイマー
  useEffect(() => {
    const unlockedRecipes = recipes.filter(r => r.unlocked);
    if (unlockedRecipes.length === 0) return;

    const interval = setInterval(() => {
      setTables(prevTables => {
        // 利用可能なテーブル数（店舗拡張に基づく）
        const activeTableLimit = currentExpansion.tables;
        const availableTables = prevTables.filter(t => t.id < activeTableLimit);

        return prevTables.map(table => {
          if (table.id >= activeTableLimit) return table;

          // 1. 空席にお客さんが来店
          if (table.status === 'empty') {
            if (Math.random() < 0.4) {
              // ランダムなお客さん来店
              const randomRecipe = unlockedRecipes[Math.floor(Math.random() * unlockedRecipes.length)];
              const customerVariant = Math.floor(Math.random() * 4);
              sounds.playBell();
              return {
                ...table,
                status: 'waiting_order',
                customer: { variant: customerVariant, patience: 30 },
                recipe: randomRecipe,
                progress: 0,
                orderTimer: 2 // 2秒後に注文ベル
              };
            }
            return table;
          }

          // 2. 注文思案中 -> 注文完了 (自動または店員が取る)
          if (table.status === 'waiting_order') {
            const hasWaiters = staffList.some(s => s.type === 'waiter');
            // 店員がいるか、一定時間経過で注文が通る
            const newTimer = (table.orderTimer || 0) - 1;
            if (newTimer <= 0 && hasWaiters) {
              sounds.playServe();
              return {
                ...table,
                status: 'cooking',
                progress: 0,
                totalCookTime: table.recipe.cookTime
              };
            }
            return { ...table, orderTimer: newTimer };
          }

          // 3. 厨房で調理中
          if (table.status === 'cooking') {
            // 設備の速度補正計算
            const eq = equipment.find(e => e.id === table.recipe.equipment) || { level: 1, speedBonus: 0.1 };
            const speedMultiplier = 1 + (eq.level - 1) * (eq.speedBonus || 0.1);
            
            // シェフの人数とレベルによる調理速度ブースト
            const chefBoost = staffList
              .filter(s => s.type === 'chef')
              .reduce((acc, c) => acc + (0.5 * c.speed), 1.0);

            const advance = 1.0 * speedMultiplier * chefBoost;
            const newProgress = table.progress + advance;

            if (newProgress >= table.totalCookTime) {
              sounds.playServe();
              return {
                ...table,
                status: 'eating',
                progress: 0,
                eatTimer: 5 // 5秒間食事
              };
            }
            return { ...table, progress: newProgress };
          }

          // 4. 客が食事中
          if (table.status === 'eating') {
            const newEatTimer = table.eatTimer - 1;
            if (newEatTimer <= 0) {
              sounds.playEat();
              return {
                ...table,
                status: 'paying'
              };
            }
            return { ...table, eatTimer: newEatTimer };
          }

          // 5. 会計待ち (店員が自動会計、またはプレイヤーがタップで会計)
          if (table.status === 'paying') {
            // 店員がいる場合、自動でも少しずつ会計される
            if (Math.random() < 0.3) {
              // 自動会計
              setTimeout(() => {
                handlePayment(table.id);
              }, 100);
            }
            return table;
          }

          return table;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [recipes, equipment, staffList, currentExpansion, handlePayment]);

  // メイン描画ループ
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let tick = 0;

    const render = () => {
      tick++;

      // 高DPI対応とリサイズ
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = false; // ドット絵をパリッと描画

      // 背景クリア（温かい店外の壁色・イタリアンレッド＆クリームの縁）
      ctx.fillStyle = '#2c1810';
      ctx.fillRect(0, 0, width, height);

      // アイソメトリック原点（画面中央少し上）
      const originX = width / 2;
      const originY = 120;

      const gridSize = currentExpansion.floorSize || 8;

      // 1. 床タイルの描画
      for (let gy = 0; gy < gridSize; gy++) {
        for (let gx = 0; gx < gridSize; gx++) {
          const pos = gridToScreen(gx, gy, originX, originY);
          const isChecker = (gx + gy) % 2 === 0;
          const isKitchen = gx >= 4 && gy < 3; // 北東側は厨房フロア
          drawFloorTile(ctx, pos.x, pos.y, isChecker, isKitchen);
        }
      }

      // 2. レンガ壁の描画 (西壁 & 北壁)
      const northStart = gridToScreen(0, 0, originX, originY);
      drawWall(ctx, northStart.x, northStart.y, gridSize, 60, true);  // 北壁
      drawWall(ctx, northStart.x, northStart.y, gridSize, 60, false); // 西壁

      // 3. 壁掛け装飾の描画
      // ★ 添付画像をドット絵化した「サイゼリーゼ原点の額縁ポスター」を北壁中央に配置！
      if (posterImgRef.current) {
        const posterPos = gridToScreen(3.2, 0, originX, originY);
        const px = posterPos.x - 30;
        const py = posterPos.y - 68;

        // 額縁の光彩
        if (tick % 40 < 20) {
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.drawImage(posterImgRef.current, px, py, 60, 60 * 1.5);
        ctx.shadowBlur = 0;

        // ポスター上の「CLICK! / 鑑賞」ラベル
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('🖼️ 原点の絵', px + 3, py - 3);
      }

      // イタリア国旗（購入済みの場合、西壁に飾られる）
      const flagDec = decorations.find(d => d.id === 'italian_flag');
      if (flagDec && flagDec.purchased) {
        const flagPos = gridToScreen(0, 3, originX, originY);
        const fx = flagPos.x - 35;
        const fy = flagPos.y - 50;
        ctx.fillStyle = '#008f39';
        ctx.fillRect(fx, fy, 8, 18);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(fx + 8, fy, 8, 18);
        ctx.fillStyle = '#d12b2b';
        ctx.fillRect(fx + 16, fy, 8, 18);
      }

      // オリーブの木（鉢植え）
      const oliveDec = decorations.find(d => d.id === 'olive_tree');
      if (oliveDec && oliveDec.purchased) {
        const olivePos = gridToScreen(0.5, 5.5, originX, originY);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(olivePos.x - 6, olivePos.y - 8, 12, 10);
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(olivePos.x, olivePos.y - 14, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. 厨房設備の描画 (北東グリッド)
      // パスタ茹で麺器 (gx: 4, gy: 0.8)
      const boilerPos = gridToScreen(4.2, 0.8, originX, originY);
      const boilerEq = equipment.find(e => e.id === 'pasta_boiler');
      drawPastaBoiler(ctx, boilerPos.x, boilerPos.y, boilerEq?.level || 1);

      // コンベアオーブン (gx: 5.8, gy: 0.8)
      const ovenPos = gridToScreen(5.8, 0.8, originX, originY);
      const ovenEq = equipment.find(e => e.id === 'oven');
      drawOven(ctx, ovenPos.x, ovenPos.y, ovenEq?.level || 1);

      // サラダ仕込み台 (gx: 6.8, gy: 2.2)
      const saladPos = gridToScreen(6.8, 2.2, originX, originY);
      drawSaladStation(ctx, saladPos.x, saladPos.y);

      // ドリンクバーマシン (購入済みの場合、北壁西寄り gx: 1.5, gy: 0.8)
      const drinkBarEq = equipment.find(e => e.id === 'drink_bar');
      if (drinkBarEq && drinkBarEq.level > 0) {
        const drinkPos = gridToScreen(1.5, 0.8, originX, originY);
        drawDrinkBar(ctx, drinkPos.x, drinkPos.y);
      }

      // キャッシュレジカウンター (入口付近 gx: 1.2, gy: 5.5)
      const regPos = gridToScreen(1.2, 5.5, originX, originY);
      drawRegister(ctx, regPos.x, regPos.y);

      // 5. 湯気パーティクルの発生 & 更新
      // 茹で麺器から常時もくもく湯気！
      if (tick % 6 === 0) {
        steamParticlesRef.current.push({
          x: boilerPos.x - 4 + Math.random() * 12,
          y: boilerPos.y - 20,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.8 - Math.random() * 0.6,
          size: 2 + Math.random() * 2.5,
          life: 1.0,
          decay: 0.02
        });
      }
      // オーブンからも熱気・湯気！
      if (tick % 10 === 0) {
        steamParticlesRef.current.push({
          x: ovenPos.x - 8 + Math.random() * 16,
          y: ovenPos.y - 18,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.6 - Math.random() * 0.5,
          size: 2.5 + Math.random() * 2,
          life: 1.0,
          decay: 0.025
        });
      }

      // 食事中のテーブルからも美味しそうな湯気！
      tables.forEach(table => {
        if (table.status === 'eating' && tick % 15 === 0) {
          const tPos = gridToScreen(table.gx, table.gy, originX, originY);
          steamParticlesRef.current.push({
            x: tPos.x - 4 + Math.random() * 8,
            y: tPos.y - 18,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -0.5 - Math.random() * 0.4,
            size: 2 + Math.random() * 1.5,
            life: 1.0,
            decay: 0.03
          });
        }
      });

      // 湯気パーティクルの描画と更新
      steamParticlesRef.current = steamParticlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        drawSteamParticle(ctx, p);
        return p.life > 0;
      });

      // 6. テーブルと客の描画 (拡張席数分)
      const activeTableLimit = currentExpansion.tables;
      tables.forEach(table => {
        if (table.id >= activeTableLimit) return;
        const tPos = gridToScreen(table.gx, table.gy, originX, originY);
        const isHovered = hoveredTable === table.id;

        // テーブル描画
        drawTable(ctx, tPos.x, tPos.y, table.status, table.recipe, isHovered);

        // 着席しているお客さん描画
        if (table.customer && table.status !== 'empty') {
          // 左席に座る客
          drawCharacter(
            ctx,
            tPos.x - 16,
            tPos.y - 12,
            { variant: table.customer.variant },
            'right',
            table.status === 'eating' ? (Math.sin(tick * 0.2) * 2) : 0
          );

          // 状態吹き出し表示
          if (table.status === 'waiting_order') {
            drawBubble(ctx, tPos.x - 16, tPos.y - 30, '🛎️', '注文!');
          } else if (table.status === 'cooking') {
            const pct = Math.floor((table.progress / table.totalCookTime) * 100);
            drawBubble(ctx, tPos.x - 16, tPos.y - 30, '⏳', `${pct}%`);
          } else if (table.status === 'eating') {
            const icon = table.recipe ? table.recipe.icon : '🍴';
            drawBubble(ctx, tPos.x - 16, tPos.y - 30, icon, 'Buono!');
          } else if (table.status === 'paying') {
            drawBubble(ctx, tPos.x - 16, tPos.y - 30, '💰', '会計');
          }
        }
      });

      // 7. スタッフ（店員・シェフ）のアニメーションと描画
      // シェフ
      charactersRef.current.chefs.forEach((chef, idx) => {
        const bob = Math.sin((tick + idx * 20) * 0.15) * 2;
        drawCharacter(ctx, chef.x, chef.y, 'chef', chef.direction, bob);
      });

      // 給仕店員
      charactersRef.current.waiters.forEach((waiter, idx) => {
        // テーブルへ巡回移動ロジック
        const activeTables = tables.filter(t => t.id < activeTableLimit && t.status !== 'empty');
        if (activeTables.length > 0 && tick % 180 === 0) {
          const target = activeTables[Math.floor(Math.random() * activeTables.length)];
          const tPos = gridToScreen(target.gx + 0.5, target.gy, originX, originY);
          waiter.targetX = tPos.x;
          waiter.targetY = tPos.y;
          waiter.carryingItem = target.status === 'cooking' ? target.recipe : null;
        }

        // 移動補間
        const dx = waiter.targetX - waiter.x;
        const dy = waiter.targetY - waiter.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 2) {
          waiter.x += (dx / dist) * 1.5;
          waiter.y += (dy / dist) * 1.5;
          waiter.direction = dx > 0 ? 'right' : 'left';
          waiter.bobOffset = Math.sin(tick * 0.3) * 2;
        } else {
          waiter.bobOffset = 0;
        }

        drawCharacter(ctx, waiter.x, waiter.y, 'waiter', waiter.direction, waiter.bobOffset, waiter.carryingItem);
      });

      // 8. ポップアップテキスト（コイン・EXP加算）
      setPopups(prev => {
        return prev.filter(popup => {
          popup.y -= 0.6; // 上にふわっと上昇
          popup.life -= 0.02;
          drawPopupText(ctx, popup);
          return popup.life > 0;
        });
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [tables, hoveredTable, decorations, equipment, staffList, currentExpansion, setPopups]);

  // クリック・タップ操作ハンドラ
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = rect.width;
    const originX = width / 2;
    const originY = 120;

    // 1. 壁の「サイゼリーゼ原点のポスター」クリック判定
    const posterPos = gridToScreen(3.2, 0, originX, originY);
    const px = posterPos.x - 30;
    const py = posterPos.y - 68;
    if (clickX >= px && clickX <= px + 65 && clickY >= py && clickY <= py + 95) {
      sounds.playClick();
      setPosterModalOpen(true);
      return;
    }

    // 2. テーブルクリック判定
    const activeTableLimit = currentExpansion.tables;
    for (let table of tables) {
      if (table.id >= activeTableLimit) continue;
      const tPos = gridToScreen(table.gx, table.gy, originX, originY);
      const dist = Math.hypot(clickX - tPos.x, clickY - tPos.y);

      if (dist < 32) {
        // テーブルをタップしたときの処理
        if (table.status === 'waiting_order') {
          // 注文を取る
          sounds.playBell();
          addPopup(tPos.x, tPos.y - 20, '注文完了! 🛎️', '#38bdf8');
          setTables(prev => prev.map(t => t.id === table.id ? { ...t, status: 'cooking', progress: 0, totalCookTime: t.recipe.cookTime } : t));
          return;
        } else if (table.status === 'cooking') {
          // 調理ミニゲームを起動して手動調理！
          sounds.playClick();
          setCookingGameOrder(table);
          return;
        } else if (table.status === 'paying') {
          // レジ会計！
          const earned = table.recipe ? table.recipe.price : 300;
          addPopup(tPos.x, tPos.y - 20, `+¥${earned} 💰`, '#facc15');
          addPopup(tPos.x, tPos.y - 35, `+${Math.floor(earned * 0.4)} EXP ⭐`, '#a855f7');
          handlePayment(table.id);
          return;
        } else if (table.status === 'eating') {
          // 客を励ます
          sounds.playEat();
          addPopup(tPos.x, tPos.y - 20, 'Buono! ❤️', '#ef4444');
          return;
        } else if (table.status === 'empty') {
          // 呼び込み
          sounds.playClick();
          addPopup(tPos.x, tPos.y - 20, '空席 🍴', '#94a3b8');
          return;
        }
      }
    }

    // 3. 厨房設備タップ判定
    const boilerPos = gridToScreen(4.2, 0.8, originX, originY);
    if (Math.hypot(clickX - boilerPos.x, clickY - boilerPos.y) < 25) {
      sounds.playSizzle();
      addPopup(boilerPos.x, boilerPos.y - 20, '茹で麺器 沸騰中♨️', '#38bdf8');
      return;
    }

    const ovenPos = gridToScreen(5.8, 0.8, originX, originY);
    if (Math.hypot(clickX - ovenPos.x, clickY - ovenPos.y) < 25) {
      sounds.playSizzle();
      addPopup(ovenPos.x, ovenPos.y - 20, 'オーブン 熱気満点🔥', '#f97316');
      return;
    }
  };

  // マウスホバー位置の判定
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const width = rect.width;
    const originX = width / 2;
    const originY = 120;

    let foundTable = null;
    const activeTableLimit = currentExpansion.tables;
    for (let table of tables) {
      if (table.id >= activeTableLimit) continue;
      const tPos = gridToScreen(table.gx, table.gy, originX, originY);
      if (Math.hypot(mx - tPos.x, my - tPos.y) < 30) {
        foundTable = table.id;
        break;
      }
    }
    setHoveredTable(foundTable);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-stone-900 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        className="w-full h-full block cursor-pointer"
        style={{ touchAction: 'manipulation' }}
      />

      {/* 画面内オーバーレイ案内 */}
      <div className="absolute top-2 left-2 pointer-events-none flex flex-col gap-1 text-xs text-white/90 font-mono bg-black/40 backdrop-blur-sm p-2 rounded border border-amber-600/40">
        <div className="flex items-center gap-1.5 font-bold text-amber-300">
          <span>🇮🇹</span>
          <span>Saizelysees 客席・厨房ビュー</span>
        </div>
        <div className="text-[11px] text-stone-300">
          ・テーブルタップ: 注文受領 / 調理参加 / 会計<br />
          ・壁の絵タップ: 額縁ポスター鑑賞
        </div>
      </div>
    </div>
  );
}
