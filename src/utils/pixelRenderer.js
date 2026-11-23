// ピクセルアート アイソメトリック レンダラー

// タイルサイズ定数
export const TILE_W = 56;
export const TILE_H = 28;

// グリッド座標 -> 画面座標
export function gridToScreen(gx, gy, originX, originY) {
  return {
    x: (gx - gy) * (TILE_W / 2) + originX,
    y: (gx + gy) * (TILE_H / 2) + originY
  };
}

// 画面座標 -> グリッド座標 (クリック判定用)
export function screenToGrid(sx, sy, originX, originY) {
  const dx = sx - originX;
  const dy = sy - originY;
  const gx = (dx / (TILE_W / 2) + dy / (TILE_H / 2)) / 2;
  const gy = (dy / (TILE_H / 2) - dx / (TILE_W / 2)) / 2;
  return { gx: Math.floor(gx), gy: Math.floor(gy) };
}

// ドット絵風の床タイル描画 (サイゼ風テラコッタタイル or チェッカータイル)
export function drawFloorTile(ctx, sx, sy, isChecker = false, isKitchen = false) {
  const hw = TILE_W / 2;
  const hh = TILE_H / 2;

  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx + hw, sy + hh);
  ctx.lineTo(sx, sy + hh * 2);
  ctx.lineTo(sx - hw, sy + hh);
  ctx.closePath();

  if (isKitchen) {
    // 厨房は清潔なライトグレーのステンレス・磁器タイル
    ctx.fillStyle = isChecker ? '#e2e8f0' : '#cbd5e1';
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.stroke();
  } else {
    // 客席は温かみのあるサイゼ調テラコッタ・クリームタイル
    ctx.fillStyle = isChecker ? '#f6ebe0' : '#eed6c4';
    ctx.fill();
    ctx.strokeStyle = '#d7ba9d';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// レンガ壁の描画
export function drawWall(ctx, sx, sy, length, height = 50, isNorth = true) {
  const hw = TILE_W / 2;
  const hh = TILE_H / 2;

  // レンガ風グラデーションとパターン
  for (let l = 0; l < length; l++) {
    const wx = isNorth ? sx + l * hw : sx - l * hw;
    const wy = isNorth ? sy - l * hh : sy - l * hh;

    ctx.fillStyle = '#b45309'; // 温かいレンガ色
    ctx.beginPath();
    if (isNorth) {
      // 北壁 (右奥方向)
      ctx.moveTo(wx, wy);
      ctx.lineTo(wx + hw, wy + hh);
      ctx.lineTo(wx + hw, wy + hh - height);
      ctx.lineTo(wx, wy - height);
    } else {
      // 西壁 (左奥方向)
      ctx.moveTo(wx, wy);
      ctx.lineTo(wx - hw, wy + hh);
      ctx.lineTo(wx - hw, wy + hh - height);
      ctx.lineTo(wx, wy - height);
    }
    ctx.closePath();
    ctx.fill();

    // レンガ目地
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 上部の縁
    ctx.fillStyle = '#d97706';
    ctx.fillRect(wx - 2, wy - height - 3, hw + 4, 3);
  }
}

// テーブルと椅子の描画
export function drawTable(ctx, sx, sy, status, recipe, isHovered = false) {
  // 影
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + 10, 22, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // テーブルの脚
  ctx.fillStyle = '#78350f';
  ctx.fillRect(sx - 3, sy - 8, 6, 16);

  // テーブル天板（赤白のチェック柄クロス）
  const tw = 36;
  const th = 20;
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(sx, sy - 8, tw / 2, th / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.strokeStyle = '#c92a2a';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 赤いチェック模様
  ctx.fillStyle = '#e03131';
  ctx.fillRect(sx - 8, sy - 14, 16, 4);
  ctx.fillRect(sx - 12, sy - 8, 24, 4);
  ctx.fillRect(sx - 8, sy - 2, 16, 4);
  ctx.restore();

  // 椅子（左右）
  // 左椅子
  ctx.fillStyle = '#92400e';
  ctx.fillRect(sx - 24, sy - 10, 6, 14);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(sx - 26, sy - 20, 10, 10);
  // 右椅子
  ctx.fillStyle = '#92400e';
  ctx.fillRect(sx + 18, sy - 10, 6, 14);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(sx + 16, sy - 20, 10, 10);

  // テーブル上の料理またはベル状態
  if (status === 'eating' && recipe) {
    // 料理皿
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(sx, sy - 12, 10, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ced4da';
    ctx.stroke();

    // 料理の具材色
    ctx.fillStyle = recipe.color || '#e8590c';
    ctx.beginPath();
    ctx.ellipse(sx, sy - 13, 7, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // ホバー枠線
  if (isHovered) {
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(sx - 28, sy - 25, 56, 40);
  }
}

// 厨房設備：パスタ茹で麺器（湯気付き）
export function drawPastaBoiler(ctx, sx, sy, level = 1) {
  // 台座（ステンレス）
  ctx.fillStyle = '#64748b';
  ctx.fillRect(sx - 16, sy - 16, 32, 24);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(sx - 16, sy - 20, 32, 8);

  // 茹で槽（お湯）
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(sx - 12, sy - 18, 24, 6);

  // 振りザル（テボ）
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(sx - 8, sy - 24, 5, 10);
  ctx.fillRect(sx + 3, sy - 24, 5, 10);

  // つまみ
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(sx - 6, sy - 4, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(sx + 6, sy - 4, 3, 0, Math.PI * 2);
  ctx.fill();
}

// 厨房設備：コンベアオーブン（ピザ・ドリア用）
export function drawOven(ctx, sx, sy, level = 1) {
  // オーブン本体
  ctx.fillStyle = '#334155';
  ctx.fillRect(sx - 20, sy - 22, 40, 28);
  ctx.fillStyle = '#475569';
  ctx.fillRect(sx - 18, sy - 26, 36, 6);

  // 焼き口（赤く光る熱気）
  ctx.fillStyle = '#f97316';
  ctx.fillRect(sx - 14, sy - 16, 28, 10);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(sx - 10, sy - 14, 20, 6);

  // コンベアの網
  ctx.fillStyle = '#0f172a';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(sx - 12 + i * 7, sy - 15, 2, 8);
  }
}

// 厨房設備：サラダ仕込み台
export function drawSaladStation(ctx, sx, sy) {
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(sx - 16, sy - 16, 32, 24);
  // 保冷ケース（レタスグリーン、トマトレッド、エビピンク）
  ctx.fillStyle = '#22c55e'; // レタス
  ctx.fillRect(sx - 12, sy - 14, 7, 7);
  ctx.fillStyle = '#ef4444'; // トマト
  ctx.fillRect(sx - 3, sy - 14, 7, 7);
  ctx.fillStyle = '#fb7185'; // 小エビ
  ctx.fillRect(sx + 6, sy - 14, 7, 7);
}

// ドリンクバー設備
export function drawDrinkBar(ctx, sx, sy) {
  // マシン本体
  ctx.fillStyle = '#dc2626'; // サイゼ風赤サーバー
  ctx.fillRect(sx - 14, sy - 28, 28, 32);
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(sx - 12, sy - 26, 24, 6);

  // ディスペンサーノズル & グラス置き
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(sx - 10, sy - 14, 20, 10);
  // メロンソーダの緑ノズル
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(sx - 7, sy - 12, 4, 4);
  // ウーロン茶／コーラの茶色ノズル
  ctx.fillStyle = '#a16207';
  ctx.fillRect(sx - 1, sy - 12, 4, 4);
  // 白ワイン／レモン
  ctx.fillStyle = '#facc15';
  ctx.fillRect(sx + 5, sy - 12, 4, 4);
}

// レジカウンター
export function drawRegister(ctx, sx, sy) {
  // カウンター木製台
  ctx.fillStyle = '#92400e';
  ctx.fillRect(sx - 16, sy - 12, 32, 20);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(sx - 18, sy - 16, 36, 6);

  // キャッシュレジ本体
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(sx - 8, sy - 26, 16, 12);
  // 画面（緑色LED）
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(sx - 6, sy - 24, 12, 5);
}

// ドット絵キャラクター描画 (店員・客)
export function drawCharacter(ctx, x, y, charType, direction, bobOffset = 0, item = null) {
  const by = y + bobOffset;

  // 足元影
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.ellipse(x, y + 2, 8, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  if (charType === 'waiter') {
    // 店員（給仕係）：緑エプロン、白シャツ、黒ズボン
    // 足
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x - 4, by - 6, 3, 6);
    ctx.fillRect(x + 1, by - 6, 3, 6);

    // 体・エプロン
    ctx.fillStyle = '#ffffff'; // シャツ
    ctx.fillRect(x - 5, by - 16, 10, 10);
    ctx.fillStyle = '#008f39'; // サイゼグリーンエプロン
    ctx.fillRect(x - 4, by - 13, 8, 9);

    // 頭・顔
    ctx.fillStyle = '#fed7aa'; // 肌色
    ctx.fillRect(x - 4, by - 24, 8, 8);
    // 髪の毛
    ctx.fillStyle = '#451a03';
    ctx.fillRect(x - 4, by - 26, 8, 3);
    // 目
    ctx.fillStyle = '#1e293b';
    if (direction === 'left') {
      ctx.fillRect(x - 3, by - 21, 2, 2);
    } else {
      ctx.fillRect(x + 1, by - 21, 2, 2);
    }

    // トレイを持っている場合
    if (item) {
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(x + (direction === 'left' ? -9 : 3), by - 14, 9, 3);
      // トレイの上の料理
      ctx.fillStyle = item.color || '#e8590c';
      ctx.fillRect(x + (direction === 'left' ? -7 : 5), by - 17, 5, 4);
    }
  } else if (charType === 'chef') {
    // キッチンシェフ：白コックコート、赤バンダナ、長エプロン
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x - 4, by - 6, 3, 6);
    ctx.fillRect(x + 1, by - 6, 3, 6);

    // コックコート
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(x - 5, by - 17, 10, 12);
    // 赤いタイ・バンダナ
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(x - 3, by - 16, 6, 3);

    // 頭
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(x - 4, by - 24, 8, 7);
    // コック帽または赤バンダナ
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(x - 5, by - 27, 10, 4);

    // 目
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x + (direction === 'left' ? -3 : 1), by - 21, 2, 2);

    // フライパンまたはヘラ
    ctx.fillStyle = '#475569';
    ctx.fillRect(x + (direction === 'left' ? -8 : 5), by - 13, 6, 2);
  } else {
    // お客さん（客タイプに応じたバリエーション 0〜3）
    const variant = (charType.variant || 0) % 4;
    const skinColor = '#fed7aa';
    const clothesColors = [
      { shirt: '#3b82f6', pants: '#1e293b', hair: '#78350f' }, // 青シャツ客
      { shirt: '#ec4899', pants: '#374151', hair: '#1c1917' }, // ピンク服女性客
      { shirt: '#eab308', pants: '#065f46', hair: '#b45309' }, // 黄色服学生客
      { shirt: '#9333ea', pants: '#1e1b4b', hair: '#71717a' }  // 紫服のワイン好き紳士
    ];
    const palette = clothesColors[variant];

    // 足
    ctx.fillStyle = palette.pants;
    ctx.fillRect(x - 4, by - 5, 3, 5);
    ctx.fillRect(x + 1, by - 5, 3, 5);

    // 服
    ctx.fillStyle = palette.shirt;
    ctx.fillRect(x - 5, by - 15, 10, 10);

    // 顔
    ctx.fillStyle = skinColor;
    ctx.fillRect(x - 4, by - 23, 8, 8);

    // 髪
    ctx.fillStyle = palette.hair;
    ctx.fillRect(x - 4, by - 25, 8, 3);

    // 目
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x + (direction === 'left' ? -3 : 1), by - 20, 2, 2);
  }
}

// 湯気パーティクル描画
export function drawSteamParticle(ctx, p) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, p.life);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// コイン・テキストポップアップ描画
export function drawPopupText(ctx, popup) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, popup.life);
  ctx.font = 'bold 12px "Courier New", monospace, sans-serif';
  ctx.textAlign = 'center';

  // 縁取り
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.strokeText(popup.text, popup.x, popup.y);

  ctx.fillStyle = popup.color || '#facc15';
  ctx.fillText(popup.text, popup.x, popup.y);
  ctx.restore();
}

// 吹き出し（注文やリアクション）描画
export function drawBubble(ctx, x, y, icon, text = '') {
  ctx.save();
  const bw = text ? 46 : 26;
  const bh = 22;
  const bx = x - bw / 2;
  const by = y - bh - 10;

  // 吹き出し背景（丸角ピクセル）
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(bx, by, bw, bh, 6);
  ctx.fill();
  ctx.stroke();

  // 尻尾
  ctx.beginPath();
  ctx.moveTo(x - 4, by + bh);
  ctx.lineTo(x, by + bh + 5);
  ctx.lineTo(x + 4, by + bh);
  ctx.closePath();
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.stroke();

  // 中身のアイコンや文字
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#0f172a';
  if (text) {
    ctx.fillText(`${icon} ${text}`, x, by + bh / 2);
  } else {
    ctx.fillText(icon, x, by + bh / 2);
  }

  ctx.restore();
}
