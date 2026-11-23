import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { RECIPES } from '../data/recipes';
import { INITIAL_EQUIPMENT, STAFF_TYPES, DECORATIONS, EXPANSIONS, RESTAURANT_RANKS } from '../data/restaurantData';
import { sounds } from '../utils/soundEffects';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  // 基本ステータス
  const [money, setMoney] = useState(2000); // 初期資金2,000円
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);
  const [totalSales, setTotalSales] = useState(0);
  const [customersServed, setCustomersServed] = useState(0);

  // レシピ
  const [recipes, setRecipes] = useState(RECIPES);

  // 設備
  const [equipment, setEquipment] = useState(INITIAL_EQUIPMENT);

  // スタッフ (初期はフロア1名、キッチン1名)
  const [staffList, setStaffList] = useState([
    { id: 'staff_1', type: 'waiter', name: 'マリオ (給仕)', level: 1, speed: 1.0 },
    { id: 'staff_2', type: 'chef', name: 'ルイージ (厨房)', level: 1, speed: 1.0 }
  ]);

  // 装飾品
  const [decorations, setDecorations] = useState(DECORATIONS);

  // 店舗フロア
  const [currentExpansionIndex, setCurrentExpansionIndex] = useState(0);
  const currentExpansion = EXPANSIONS[currentExpansionIndex];

  // テーブル情報 (最大8席)
  // 各テーブル: { id, x, y, status: 'empty'|'waiting_order'|'ordered'|'cooking'|'ready'|'eating'|'paying', customer, recipe, progress, eatTimer }
  const [tables, setTables] = useState([
    { id: 0, gx: 3, gy: 3, status: 'empty', customer: null, recipe: null, progress: 0 },
    { id: 1, gx: 5, gy: 3, status: 'empty', customer: null, recipe: null, progress: 0 },
    { id: 2, gx: 3, gy: 5, status: 'empty', customer: null, recipe: null, progress: 0 },
    { id: 3, gx: 5, gy: 5, status: 'empty', customer: null, recipe: null, progress: 0 },
    { id: 4, gx: 2, gy: 4, status: 'empty', customer: null, recipe: null, progress: 0 },
    { id: 5, gx: 4, gy: 6, status: 'empty', customer: null, recipe: null, progress: 0 },
    { id: 6, gx: 6, gy: 4, status: 'empty', customer: null, recipe: null, progress: 0 },
    { id: 7, gx: 6, gy: 6, status: 'empty', customer: null, recipe: null, progress: 0 },
  ]);

  // 待機列のお客さん
  const [waitingQueue, setWaitingQueue] = useState([]);

  // ポップアップ通知 / アニメーション
  const [popups, setPopups] = useState([]); // { id, x, y, text, color, life }
  const [levelUpModal, setLevelUpModal] = useState(null); // レベルアップ祝賀
  const [unlockedRecipeModal, setUnlockedRecipeModal] = useState(null); // 新レシピ解放祝賀
  const [posterModalOpen, setPosterModalOpen] = useState(false); // 壁ポスター拡大
  const [cookingGameOrder, setCookingGameOrder] = useState(null); // 手動調理ミニゲーム対象
  const [activeTab, setActiveTab] = useState('floor'); // floor, menu, manage, staff, decor, expansion

  // サウンド制御
  const [isMuted, setIsMuted] = useState(false);
  const [isBgmOn, setIsBgmOn] = useState(false);

  // レベル計算
  useEffect(() => {
    const nextRank = RESTAURANT_RANKS.find(r => r.level === level + 1);
    if (nextRank && exp >= nextRank.expNeeded) {
      const newLevel = level + 1;
      setLevel(newLevel);
      sounds.playLevelUp();
      setLevelUpModal({
        level: newLevel,
        title: nextRank.title
      });

      // 新レシピ自動解放チェック
      const newlyUnlocked = recipes.filter(r => !r.unlocked && r.unlockLevel <= newLevel);
      if (newlyUnlocked.length > 0) {
        setRecipes(prev => prev.map(r => r.unlockLevel <= newLevel ? { ...r, unlocked: true } : r));
        setUnlockedRecipeModal(newlyUnlocked[0]);
      }
    }
  }, [exp, level, recipes]);

  // ポップアップ追加
  const addPopup = (x, y, text, color = '#facc15') => {
    setPopups(prev => [...prev, { id: Date.now() + Math.random(), x, y, text, color, life: 1.0 }]);
  };

  // 設備購入/強化
  const upgradeEquipment = (eqId) => {
    const eq = equipment.find(e => e.id === eqId);
    if (!eq) return;
    const cost = Math.floor(eq.baseCost * Math.pow(eq.costMultiplier, eq.level));
    if (money < cost) {
      alert('所持金が足りません！');
      return;
    }
    setMoney(prev => prev - cost);
    setEquipment(prev => prev.map(e => e.id === eqId ? { ...e, level: e.level + 1 } : e));
    sounds.playCoin();
  };

  // スタッフ雇用
  const hireStaff = (type) => {
    const sType = STAFF_TYPES.find(s => s.id === type);
    if (!sType) return;
    const cost = sType.baseSalary;
    if (money < cost) {
      alert('所持金が足りません！');
      return;
    }
    setMoney(prev => prev - cost);
    const newStaff = {
      id: `staff_${Date.now()}`,
      type,
      name: type === 'waiter' ? `給仕スタッフ ${staffList.filter(s => s.type === 'waiter').length + 1}` : `シェフ ${staffList.filter(s => s.type === 'chef').length + 1}`,
      level: 1,
      speed: 1.0
    };
    setStaffList(prev => [...prev, newStaff]);
    sounds.playCoin();
  };

  // スタッフ昇給
  const upgradeStaff = (staffId) => {
    const staff = staffList.find(s => s.id === staffId);
    if (!staff) return;
    const cost = staff.level * 800;
    if (money < cost) {
      alert('所持金が足りません！');
      return;
    }
    setMoney(prev => prev - cost);
    setStaffList(prev => prev.map(s => s.id === staffId ? { ...s, level: s.level + 1, speed: s.speed + 0.2 } : s));
    sounds.playCoin();
  };

  // 装飾品購入
  const buyDecoration = (decId) => {
    const dec = decorations.find(d => d.id === decId);
    if (!dec || dec.purchased) return;
    if (money < dec.cost) {
      alert('所持金が足りません！');
      return;
    }
    setMoney(prev => prev - dec.cost);
    setDecorations(prev => prev.map(d => d.id === decId ? { ...d, purchased: true } : d));
    sounds.playCoin();
  };

  // 店舗拡張
  const upgradeExpansion = () => {
    const nextExp = EXPANSIONS[currentExpansionIndex + 1];
    if (!nextExp) return;
    if (money < nextExp.cost) {
      alert('所持金が足りません！');
      return;
    }
    setMoney(prev => prev - nextExp.cost);
    setCurrentExpansionIndex(prev => prev + 1);
    sounds.playLevelUp();
  };

  // 手動でレシピ研究（先行アンロック）
  const unlockRecipeEarly = (recipeId) => {
    const rec = recipes.find(r => r.id === recipeId);
    if (!rec || rec.unlocked) return;
    const cost = rec.price * 3;
    if (money < cost) {
      alert('研究費が足りません！');
      return;
    }
    setMoney(prev => prev - cost);
    setRecipes(prev => prev.map(r => r.id === recipeId ? { ...r, unlocked: true } : r));
    sounds.playLevelUp();
    setUnlockedRecipeModal(rec);
  };

  // 会計処理完了
  const handlePayment = (tableId) => {
    const table = tables.find(t => t.id === tableId);
    if (!table || table.status !== 'paying' || !table.recipe) return;

    // ドリンクバーなどのボーナス計算
    const drinkBar = equipment.find(e => e.id === 'drink_bar');
    const drinkBonus = (drinkBar && drinkBar.level > 0) ? drinkBar.revenueBonus : 0;
    
    // 装飾品ボーナス
    const decBonus = decorations.find(d => d.id === 'antique_lamp' && d.purchased) ? 1.1 : 1.0;

    const earnedMoney = Math.floor((table.recipe.price + drinkBonus) * decBonus);
    const earnedExp = Math.floor(table.recipe.price * 0.4);

    setMoney(prev => prev + earnedMoney);
    setExp(prev => prev + earnedExp);
    setTotalSales(prev => prev + earnedMoney);
    setCustomersServed(prev => prev + 1);

    sounds.playCoin();

    // テーブルリセット
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, status: 'empty', customer: null, recipe: null, progress: 0 } : t));
  };

  // ミュート切り替え
  const toggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  // BGM切り替え
  const toggleBgm = () => {
    const playing = sounds.toggleBGM();
    setIsBgmOn(playing);
  };

  return (
    <GameContext.Provider
      value={{
        money,
        setMoney,
        exp,
        setExp,
        level,
        totalSales,
        customersServed,
        recipes,
        equipment,
        staffList,
        decorations,
        currentExpansion,
        currentExpansionIndex,
        tables,
        setTables,
        waitingQueue,
        setWaitingQueue,
        popups,
        setPopups,
        addPopup,
        levelUpModal,
        setLevelUpModal,
        unlockedRecipeModal,
        setUnlockedRecipeModal,
        posterModalOpen,
        setPosterModalOpen,
        cookingGameOrder,
        setCookingGameOrder,
        activeTab,
        setActiveTab,
        upgradeEquipment,
        hireStaff,
        upgradeStaff,
        buyDecoration,
        upgradeExpansion,
        unlockRecipeEarly,
        handlePayment,
        isMuted,
        toggleMute,
        isBgmOn,
        toggleBgm
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
