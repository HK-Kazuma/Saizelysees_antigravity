import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { sounds } from '../utils/soundEffects';

export default function PosterDetailModal() {
  const { posterModalOpen, setPosterModalOpen } = useGame();
  const [viewMode, setViewMode] = useState('pixel'); // 'pixel' or 'original' or 'compare'

  if (!posterModalOpen) return null;

  const handleClose = () => {
    sounds.playClick();
    setPosterModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-stone-900 border-4 border-amber-600 rounded-2xl shadow-2xl p-5 text-white flex flex-col gap-4 font-mono max-h-[92vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b-2 border-amber-700/50 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🖼️</span>
            <div>
              <div className="text-xs text-amber-400 font-bold">Saizelysees 象徴の絵画</div>
              <div className="text-xl font-black text-amber-100">
                『楽しい食卓 La Buona Tavola!』
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold border border-stone-600 flex items-center justify-center text-lg"
          >
            ✕
          </button>
        </div>

        {/* 表示モード切り替えタブ */}
        <div className="flex gap-2 bg-stone-800 p-1 rounded-xl border border-stone-700 text-xs">
          <button
            onClick={() => { sounds.playClick(); setViewMode('pixel'); }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === 'pixel'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            🎨 ドット絵版（ピクセルアート）
          </button>
          <button
            onClick={() => { sounds.playClick(); setViewMode('original'); }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === 'original'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            📜 原画メニュー表
          </button>
          <button
            onClick={() => { sounds.playClick(); setViewMode('compare'); }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === 'compare'
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            ⚖️ 比較ビュー
          </button>
        </div>

        {/* 画像鑑賞エリア */}
        <div className="relative bg-stone-950 p-4 rounded-xl border-2 border-amber-800/80 flex items-center justify-center min-h-[300px] overflow-hidden">
          {viewMode === 'pixel' && (
            <div className="flex flex-col items-center gap-2">
              <img
                src="/assets/poster_pixel_art.png"
                alt="Saizelysees Pixel Art Poster"
                className="max-h-[360px] object-contain rounded-lg shadow-2xl border-4 border-amber-600/70"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="text-[11px] text-amber-300">
                店内の北壁に飾られている、特別変換ピクセルアート額縁ポスター
              </div>
            </div>
          )}

          {viewMode === 'original' && (
            <div className="flex flex-col items-center gap-2">
              <img
                src="/assets/poster_original.jpg"
                alt="Original Menu Poster"
                className="max-h-[360px] object-contain rounded-lg shadow-2xl border-2 border-stone-700"
              />
              <div className="text-[11px] text-stone-300">
                『楽しい食卓 La Buona Tavola!』サイゼリヤ グランドメニュー原画
              </div>
            </div>
          )}

          {viewMode === 'compare' && (
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="flex flex-col items-center">
                <div className="text-xs text-green-400 font-bold mb-1">ドット絵版</div>
                <img
                  src="/assets/poster_pixel_art.png"
                  alt="Pixel Art"
                  className="max-h-[300px] object-contain rounded border-2 border-green-600/60"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs text-red-400 font-bold mb-1">原画</div>
                <img
                  src="/assets/poster_original.jpg"
                  alt="Original"
                  className="max-h-[300px] object-contain rounded border-2 border-red-600/60"
                />
              </div>
            </div>
          )}
        </div>

        {/* 絵画とサイゼリーゼ世界観の解説 */}
        <div className="bg-stone-800/70 p-4 rounded-xl border border-stone-700 flex flex-col gap-2 text-xs text-stone-300">
          <div className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
            <span>🇮🇹</span>
            <span>「サイゼリーゼ」の原点と世界観</span>
          </div>
          <p className="leading-relaxed">
            ポスターに描かれているのは、仲間や家族が集い、ワイングラスを傾けながらおいしいパスタやピザを囲む
            <strong className="text-amber-200">「楽しい食卓（La Buona Tavola）」</strong>の風景です。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-stone-700">
            <div className="bg-stone-900 p-2 rounded border border-stone-700">
              <div className="text-amber-400 font-bold">🍾 白マグナム</div>
              <div className="text-[10px] text-stone-400">大迫力1.5Lボトル。気兼ねなく楽しめる直輸入ワイン。</div>
            </div>
            <div className="bg-stone-900 p-2 rounded border border-stone-700">
              <div className="text-amber-400 font-bold">🥗 小エビのサラダ</div>
              <div className="text-[10px] text-stone-400">特製ドレッシングと甘みのある小エビの至高の調和。</div>
            </div>
            <div className="bg-stone-900 p-2 rounded border border-stone-700">
              <div className="text-amber-400 font-bold">🥘 ミラノ風ドリア</div>
              <div className="text-[10px] text-stone-400">創業以来の国民的人気メニュー。300円の奇跡。</div>
            </div>
            <div className="bg-stone-900 p-2 rounded border border-stone-700">
              <div className="text-amber-400 font-bold">🥣 たまねぎのズッパ</div>
              <div className="text-[10px] text-stone-400">じっくり炒めた玉ねぎとチーズがとろける熱々スープ。</div>
            </div>
          </div>

          <div className="mt-2 text-emerald-400 font-bold flex items-center gap-1">
            <span>✨</span>
            <span>壁掛け効果発動中：来店客の満足度 +15%！</span>
          </div>
        </div>
      </div>
    </div>
  );
}
