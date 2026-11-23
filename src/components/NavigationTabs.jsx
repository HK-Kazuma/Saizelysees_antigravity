import React from 'react';
import { useGame } from '../context/GameContext';
import { sounds } from '../utils/soundEffects';

export default function NavigationTabs() {
  const { activeTab, setActiveTab, setPosterModalOpen } = useGame();

  const tabs = [
    { id: 'floor', label: '🏪 レストラン店内', desc: '客席と厨房' },
    { id: 'recipes', label: '📖 レシピ図鑑', desc: '料理作り・研究' },
    { id: 'manage', label: '💼 経営・設備・スタッフ', desc: '強化・雇用・装飾・拡張' },
    { id: 'poster', label: '🖼️ 原点の絵画', desc: 'La Buona Tavola' }
  ];

  const handleTabClick = (tabId) => {
    sounds.playClick();
    if (tabId === 'poster') {
      setPosterModalOpen(true);
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <nav className="bg-stone-950 border-t-2 border-stone-800 px-2 py-1.5 flex items-center justify-around gap-1 shrink-0 z-30 font-mono select-none">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              isActive
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg border border-amber-400 scale-[1.02]'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
