import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export default function CookingMiniGame() {
  const { cookingGameOrder, setCookingGameOrder, setTables, addPopup, setMoney, setExp } = useGame();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [ovenGauge, setOvenGauge] = useState(0);
  const [gaugeDirection, setGaugeDirection] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!cookingGameOrder || !cookingGameOrder.recipe) return null;

  const recipe = cookingGameOrder.recipe;
  const steps = recipe.steps || ['材料を準備する', '加熱調理する', '仕上げのトッピングをして完成'];
  const currentStepText = steps[currentStepIndex];

  // オーブン・焼き物料理用のタイミングゲージループ
  const isBakeRecipe = recipe.equipment === 'oven';
  useEffect(() => {
    if (!isBakeRecipe || isCompleted) return;
    const interval = setInterval(() => {
      setOvenGauge(prev => {
        let next = prev + gaugeDirection * 4;
        if (next >= 100) {
          setGaugeDirection(-1);
          return 100;
        }
        if (next <= 0) {
          setGaugeDirection(1);
          return 0;
        }
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [isBakeRecipe, gaugeDirection, isCompleted]);

  // ステップ進行
  const handleAction = () => {
    sounds.playSizzle();

    // オーブン料理の場合はタイミング判定
    if (isBakeRecipe && currentStepIndex === steps.length - 1) {
      if (ovenGauge >= 40 && ovenGauge <= 85) {
        // Excellent!
        finishCooking(true);
      } else {
        // ちょっと焦げた/生焼け
        finishCooking(false);
      }
      return;
    }

    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      finishCooking(true);
    }
  };

  // 完成
  const finishCooking = (perfect) => {
    setIsCompleted(true);
    sounds.playServe();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    const bonusMoney = perfect ? Math.floor(recipe.price * 0.2) : 0;
    const bonusExp = perfect ? 20 : 5;

    setTimeout(() => {
      // テーブルの状態を eating に進める
      setTables(prev => prev.map(t => t.id === cookingGameOrder.id ? {
        ...t,
        status: 'eating',
        progress: 0,
        eatTimer: 5
      } : t));

      setMoney(prev => prev + bonusMoney);
      setExp(prev => prev + bonusExp);

      if (perfect) {
        addPopup(window.innerWidth / 2, window.innerHeight / 2, `パーフェクト調理! +¥${bonusMoney} bonus`, '#4ade80');
      }

      setCookingGameOrder(null);
    }, 1200);
  };

  const handleClose = () => {
    sounds.playClick();
    setCookingGameOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-stone-900 border-4 border-amber-600 rounded-xl shadow-2xl p-5 text-white flex flex-col gap-4 font-mono">
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b-2 border-stone-700 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{recipe.icon}</span>
            <div>
              <div className="text-xs text-amber-400 font-bold">サイゼ厨房・本格クッキング</div>
              <div className="text-lg font-black text-white">{recipe.name}</div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold border border-stone-600 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* 料理概要と材料 */}
        <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700 text-xs">
          <div className="text-amber-300 font-bold mb-1">【使用材料】</div>
          <div className="flex flex-wrap gap-1.5">
            {recipe.ingredients.map((ing, i) => (
              <span key={i} className="bg-stone-700 px-2 py-0.5 rounded text-amber-100 border border-stone-600">
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* 調理ステージ */}
        <div className="relative h-44 bg-gradient-to-b from-stone-950 to-stone-800 rounded-xl border-2 border-stone-700 flex flex-col items-center justify-center p-4 overflow-hidden">
          {/* 調理器具背景 */}
          <div className="text-6xl mb-2 animate-bounce">
            {recipe.equipment === 'oven' ? '🔥' : recipe.equipment === 'pasta_boiler' ? '♨️' : '🍳'}
          </div>

          <div className="text-sm font-bold text-center text-amber-200 px-4">
            {isCompleted ? (
              <span className="text-green-400 text-lg">✨ 美味しく完成！熱々のまま配膳へ！ ✨</span>
            ) : (
              `Step ${currentStepIndex + 1}/${steps.length}: ${currentStepText}`
            )}
          </div>

          {/* オーブンのタイミングバー（オーブン料理の場合） */}
          {isBakeRecipe && !isCompleted && currentStepIndex === steps.length - 1 && (
            <div className="w-full mt-4 flex flex-col items-center gap-1">
              <div className="text-[11px] text-amber-300 font-bold">
                緑の【GOOD焼き加減】エリアで止めて焼き上げろ！
              </div>
              <div className="relative w-64 h-6 bg-stone-700 rounded-full overflow-hidden border border-stone-500">
                {/* 良好ゾーン */}
                <div className="absolute left-[40%] w-[45%] h-full bg-green-500/50 border-x-2 border-green-300"></div>
                {/* ゲージ針 */}
                <div
                  className="absolute top-0 bottom-0 w-2 bg-yellow-300 shadow-lg transition-all"
                  style={{ left: `${ovenGauge}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* アクションボタン */}
        {!isCompleted ? (
          <button
            onClick={handleAction}
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-black text-base rounded-xl shadow-lg border-2 border-amber-300 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <span>🍳</span>
            <span>
              {isBakeRecipe && currentStepIndex === steps.length - 1
                ? 'オーブンから取り出す！（STOP）'
                : `調理を進める（${currentStepIndex + 1}/${steps.length}）`}
            </span>
          </button>
        ) : (
          <div className="text-center py-2 text-green-400 font-bold animate-pulse">
            席へお届け中...
          </div>
        )}
      </div>
    </div>
  );
}
