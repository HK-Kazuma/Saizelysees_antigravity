import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export function LevelUpModal() {
  const { levelUpModal, setLevelUpModal } = useGame();

  useEffect(() => {
    if (levelUpModal) {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  }, [levelUpModal]);

  if (!levelUpModal) return null;

  const handleClose = () => {
    sounds.playClick();
    setLevelUpModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in font-mono">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-stone-900 to-stone-950 border-4 border-yellow-400 rounded-2xl shadow-2xl p-6 text-white text-center flex flex-col items-center gap-3">
        <span className="text-5xl animate-bounce">👑</span>
        <div className="text-xs text-yellow-400 font-bold uppercase tracking-widest">
          ★ RESTAURANT LEVEL UP ★
        </div>
        <div className="text-2xl font-black text-amber-200">
          Lv.{levelUpModal.level} へ昇格！
        </div>
        <div className="text-base font-bold text-emerald-400 bg-stone-800/80 px-4 py-1.5 rounded-full border border-stone-700">
          称号: 『{levelUpModal.title}』
        </div>
        <p className="text-xs text-stone-300 mt-2 leading-relaxed">
          サイゼリーゼの評判が高まりました！新メニューや新設備が解放され、より多くのお客様が来店します！
        </p>
        <button
          onClick={handleClose}
          className="mt-3 w-full py-2.5 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-stone-950 font-black text-sm rounded-xl shadow-lg border border-yellow-300 active:scale-95 transition-transform"
        >
          ボーノ！（閉じる）
        </button>
      </div>
    </div>
  );
}

export function RecipeUnlockedModal() {
  const { unlockedRecipeModal, setUnlockedRecipeModal } = useGame();

  if (!unlockedRecipeModal) return null;

  const handleClose = () => {
    sounds.playClick();
    setUnlockedRecipeModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in font-mono">
      <div className="relative w-full max-w-sm bg-stone-900 border-4 border-emerald-500 rounded-2xl shadow-2xl p-6 text-white text-center flex flex-col items-center gap-3">
        <span className="text-5xl animate-bounce">{unlockedRecipeModal.icon}</span>
        <div className="text-xs text-emerald-400 font-bold uppercase tracking-widest">
          ★ NEW RECIPE UNLOCKED ★
        </div>
        <div className="text-xl font-black text-white">
          新メニュー解放！
        </div>
        <div className="text-lg font-bold text-amber-300 bg-stone-800 px-4 py-1 rounded-xl border border-stone-700">
          {unlockedRecipeModal.name}
        </div>
        <p className="text-xs text-stone-300 leading-relaxed">
          {unlockedRecipeModal.desc}
        </p>
        <div className="text-xs text-emerald-300 font-bold">
          販売価格: ¥{unlockedRecipeModal.price} / 調理器具: {unlockedRecipeModal.equipment === 'oven' ? 'オーブン' : '茹で麺器'}
        </div>
        <button
          onClick={handleClose}
          className="mt-2 w-full py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-sm rounded-xl shadow-lg border border-emerald-300 active:scale-95 transition-transform"
        >
          メニューに追加！（閉じる）
        </button>
      </div>
    </div>
  );
}
