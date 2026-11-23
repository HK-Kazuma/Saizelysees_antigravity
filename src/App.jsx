import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import HeaderBar from './components/HeaderBar';
import NavigationTabs from './components/NavigationTabs';
import IsometricRestaurant from './components/IsometricRestaurant';
import RecipeBookPanel from './components/RecipeBookPanel';
import ManagementPanel from './components/ManagementPanel';
import CookingMiniGame from './components/CookingMiniGame';
import PosterDetailModal from './components/PosterDetailModal';
import { LevelUpModal, RecipeUnlockedModal } from './components/RewardModals';
import { sounds } from './utils/soundEffects';

function GameContent() {
  const { activeTab } = useGame();
  const [hasStartedAudio, setHasStartedAudio] = useState(false);

  // 最初の画面タップでAudioContextを開始
  const handleFirstInteraction = () => {
    if (!hasStartedAudio) {
      sounds.init();
      setHasStartedAudio(true);
    }
  };

  return (
    <div
      onClick={handleFirstInteraction}
      onTouchStart={handleFirstInteraction}
      className="relative w-full h-full flex flex-col overflow-hidden bg-stone-900 select-none"
    >
      {/* 上部ヘッダーステータスバー */}
      <HeaderBar />

      {/* メイン画面エリア */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {activeTab === 'floor' && <IsometricRestaurant />}
        {activeTab === 'recipes' && <RecipeBookPanel />}
        {activeTab === 'manage' && <ManagementPanel />}
      </main>

      {/* 下部ナビゲーション */}
      <NavigationTabs />

      {/* モーダル群 */}
      <CookingMiniGame />
      <PosterDetailModal />
      <LevelUpModal />
      <RecipeUnlockedModal />

      {/* スマホ縦画面時の横向き推奨案内 */}
      <div className="portrait-warning hidden fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex-col items-center justify-center p-6 text-center text-white font-mono gap-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-600/20 border-2 border-amber-500 flex items-center justify-center text-3xl animate-bounce">
          📱 ➔ 🔄
        </div>
        <div className="text-xl font-black text-amber-300">
          画面を横向きにしてください
        </div>
        <p className="text-xs text-stone-300 max-w-xs leading-relaxed">
          「Saizelysees(サイゼリーゼ)」はスマホ横画面（ランドスケープ）に最適化されています。端末を横にしてお楽しみください。
        </p>
        <div className="text-[11px] text-emerald-400 font-bold border border-emerald-500/40 bg-emerald-950/40 px-3 py-1.5 rounded-full">
          🇮🇹 温かみのあるピクセルアート経営ゲーム
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
