import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { sounds } from '../utils/soundEffects';

export default function RecipeBookPanel() {
  const { recipes, money, level, unlockRecipeEarly, setCookingGameOrder } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(recipes[0]);

  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'pasta', name: 'パスタ・サイド' },
    { id: 'doria', name: 'ドリア＆グラタン' },
    { id: 'salad', name: 'サラダ・スープ' },
    { id: 'pizza', name: 'ピザ' },
    { id: 'appetizer', name: '前菜' },
    { id: 'bread', name: '焼きたてパン' },
    { id: 'meat', name: '肉料理' },
    { id: 'drink', name: 'ワイン・ドリンク' }
  ];

  const filteredRecipes = selectedCategory === 'all'
    ? recipes
    : recipes.filter(r => r.category === selectedCategory);

  const handleSelect = (r) => {
    sounds.playClick();
    setSelectedRecipe(r);
  };

  const handleUnlock = (r) => {
    unlockRecipeEarly(r.id);
  };

  const handlePracticeCook = (r) => {
    sounds.playClick();
    setCookingGameOrder({
      id: -1, // 練習クッキング用
      recipe: r,
      isPractice: true
    });
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-stone-900 text-white font-mono">
      {/* 左側：カテゴリ＆レシピリスト */}
      <div className="w-full md:w-7/12 flex flex-col border-r border-stone-800 h-full overflow-hidden">
        {/* カテゴリバー */}
        <div className="flex gap-1.5 p-2 overflow-x-auto bg-stone-950 border-b border-stone-800 shrink-0 scrollbar-thin">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { sounds.playClick(); setSelectedCategory(cat.id); }}
              className={`px-3 py-1 text-xs rounded-full whitespace-nowrap font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* レシピグリッドリスト */}
        <div className="flex-1 overflow-y-auto p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredRecipes.map(r => {
            const isSelected = selectedRecipe?.id === r.id;
            return (
              <div
                key={r.id}
                onClick={() => handleSelect(r)}
                className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-amber-400 bg-amber-950/40 shadow-lg'
                    : 'border-stone-800 bg-stone-850 hover:bg-stone-800'
                } ${!r.unlocked ? 'opacity-65' : ''}`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 shadow"
                    style={{ backgroundColor: `${r.color}33`, border: `1px solid ${r.color}` }}
                  >
                    {r.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{r.name}</span>
                      {!r.unlocked && <span className="text-[10px] text-amber-400">🔒 Lv.{r.unlockLevel}</span>}
                    </div>
                    <div className="text-[11px] text-amber-300 font-bold">
                      売価: ¥{r.price} <span className="text-stone-400 font-normal">/ 原価: ¥{r.cost}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    r.unlocked ? 'bg-green-900/60 text-green-300 border border-green-700' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {r.unlocked ? '販売中' : '未解放'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 右側：選択中レシピの詳細＆調理手順 (recipe.mdに完全準拠) */}
      <div className="w-full md:w-5/12 flex flex-col h-full overflow-y-auto bg-stone-950 p-4 border-t md:border-t-0 border-stone-800">
        {selectedRecipe ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 border-b border-stone-800 pb-3">
              <span className="text-4xl p-2 rounded-xl bg-stone-900 border border-stone-700">
                {selectedRecipe.icon}
              </span>
              <div>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  {selectedRecipe.categoryName}
                </span>
                <div className="text-lg font-black text-white mt-1">{selectedRecipe.name}</div>
                <div className="text-xs text-stone-400">
                  調理器具: {selectedRecipe.equipment === 'oven' ? '🔥 2段コンベアオーブン' : selectedRecipe.equipment === 'pasta_boiler' ? '♨️ パスタ茹で麺器' : '🥗 サラダ仕込み台'}
                </div>
              </div>
            </div>

            {/* 料理紹介文 */}
            <p className="text-xs text-stone-300 leading-relaxed bg-stone-900 p-2.5 rounded-lg border border-stone-800">
              {selectedRecipe.desc}
            </p>

            {/* 原価・売価・利益・調理時間 */}
            <div className="grid grid-cols-3 gap-2 bg-stone-900 p-2.5 rounded-xl border border-stone-800 text-center">
              <div>
                <div className="text-[10px] text-stone-400">販売価格</div>
                <div className="text-sm font-bold text-amber-300">¥{selectedRecipe.price}</div>
              </div>
              <div>
                <div className="text-[10px] text-stone-400">1皿の利益</div>
                <div className="text-sm font-bold text-green-400">+¥{selectedRecipe.price - selectedRecipe.cost}</div>
              </div>
              <div>
                <div className="text-[10px] text-stone-400">調理時間</div>
                <div className="text-sm font-bold text-sky-400">{selectedRecipe.cookTime}秒</div>
              </div>
            </div>

            {/* 材料リスト (recipe.mdより) */}
            <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
              <div className="text-xs text-amber-300 font-bold mb-2 flex items-center gap-1">
                <span>🥕</span>
                <span>必要な材料 (レシピ通り)</span>
              </div>
              <ul className="text-xs text-stone-300 flex flex-col gap-1 list-disc list-inside">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            {/* 作り方手順 (recipe.mdより) */}
            <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
              <div className="text-xs text-amber-300 font-bold mb-2 flex items-center gap-1">
                <span>👨‍🍳</span>
                <span>作り方・手順</span>
              </div>
              <ol className="text-xs text-stone-300 flex flex-col gap-1.5 list-decimal list-inside">
                {selectedRecipe.steps.map((st, i) => (
                  <li key={i} className="leading-snug">{st}</li>
                ))}
              </ol>
            </div>

            {/* アクションボタン */}
            <div className="mt-2 flex flex-col gap-2">
              {selectedRecipe.unlocked ? (
                <button
                  onClick={() => handlePracticeCook(selectedRecipe)}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs rounded-xl shadow-lg border border-emerald-400 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <span>🍳</span>
                  <span>厨房で手動クッキング練習（ミニゲーム）</span>
                </button>
              ) : (
                <button
                  onClick={() => handleUnlock(selectedRecipe)}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg border border-amber-400 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <span>💡</span>
                  <span>研究費を払って先行解放 (¥{selectedRecipe.price * 3})</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-stone-500">
            左側のレシピ一覧から料理を選択してください
          </div>
        )}
      </div>
    </div>
  );
}
