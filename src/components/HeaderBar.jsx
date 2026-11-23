import React from 'react';
import { useGame } from '../context/GameContext';
import { RESTAURANT_RANKS } from '../data/restaurantData';
import { sounds } from '../utils/soundEffects';

export default function HeaderBar() {
  const {
    money,
    exp,
    level,
    activeTab,
    setActiveTab,
    isMuted,
    toggleMute,
    isBgmOn,
    toggleBgm,
    totalSales,
    customersServed
  } = useGame();

  const currentRank = RESTAURANT_RANKS.find(r => r.level === level) || { title: 'サイゼリーゼ' };
  const nextRank = RESTAURANT_RANKS.find(r => r.level === level + 1);
  const prevExp = currentRank.expNeeded || 0;
  const targetExp = nextRank ? nextRank.expNeeded : exp;
  const expPercent = nextRank ? Math.min(100, Math.floor(((exp - prevExp) / (targetExp - prevExp)) * 100)) : 100;

  return (
    <header className="bg-stone-950 border-b-2 border-amber-600/60 px-3 py-1.5 flex flex-wrap items-center justify-between text-white font-mono select-none shadow-md shrink-0 z-30">
      {/* ロゴと店舗ランク */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-red-700 via-stone-850 to-green-700 px-2.5 py-1 rounded-lg border border-amber-500/50 shadow">
          <span className="text-xl">🍕</span>
          <div>
            <div className="text-xs font-black tracking-wider text-amber-200">Saizelysees</div>
            <div className="text-[10px] text-amber-400 font-bold">サイゼリーゼ</div>
          </div>
        </div>

        {/* レベル・EXP */}
        <div className="hidden sm:flex flex-col gap-0.5 min-w-[130px]">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-amber-300">Lv.{level} {currentRank.title}</span>
            <span className="text-stone-400">{exp} EXP</span>
          </div>
          <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden border border-stone-700">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${expPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 経済ステータス (所持金・累計) */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-stone-900 px-3 py-1 rounded-xl border border-amber-500/40 shadow">
          <span className="text-lg">💰</span>
          <span className="text-sm sm:text-base font-black text-amber-300">
            ¥{money.toLocaleString()}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] text-stone-400">
          <span>客数: <strong className="text-stone-200">{customersServed}人</strong></span>
          <span>総売上: <strong className="text-emerald-400">¥{totalSales.toLocaleString()}</strong></span>
        </div>

        {/* 音声制御ボタン */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleBgm}
            title={isBgmOn ? 'BGMを停止' : 'イタリアンBGMを再生'}
            className={`px-2 py-1 rounded-lg text-xs font-bold border transition-all ${
              isBgmOn
                ? 'bg-green-600/80 border-green-400 text-white shadow'
                : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-white'
            }`}
          >
            🎵 {isBgmOn ? 'BGM ON' : 'BGM OFF'}
          </button>
          <button
            onClick={toggleMute}
            title={isMuted ? 'ミュート解除' : 'ミュート'}
            className={`px-2 py-1 rounded-lg text-xs font-bold border transition-all ${
              !isMuted
                ? 'bg-amber-600/80 border-amber-400 text-white'
                : 'bg-stone-800 border-stone-700 text-stone-400'
            }`}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>
    </header>
  );
}
