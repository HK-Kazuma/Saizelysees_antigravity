import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { STAFF_TYPES, EXPANSIONS } from '../data/restaurantData';
import { sounds } from '../utils/soundEffects';

export default function ManagementPanel() {
  const {
    money,
    equipment,
    staffList,
    decorations,
    currentExpansionIndex,
    upgradeEquipment,
    hireStaff,
    upgradeStaff,
    buyDecoration,
    upgradeExpansion
  } = useGame();

  const [subTab, setSubTab] = useState('equipment'); // equipment, staff, decor, expansion

  const tabs = [
    { id: 'equipment', name: '⚙️ 厨房設備', desc: '茹で麺器・オーブン等の強化' },
    { id: 'staff', name: '🧑‍🍳 スタッフ', desc: '店員・シェフの雇用と昇給' },
    { id: 'decor', name: '🖼️ 店内装飾', desc: '壁画・旗・照明・植物' },
    { id: 'expansion', name: '🏗️ 店舗拡張', desc: '客席フロアの増設' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-stone-900 text-white font-mono overflow-hidden">
      {/* サブタブ切り替え */}
      <div className="flex bg-stone-950 p-2 border-b border-stone-800 gap-2 overflow-x-auto shrink-0">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => { sounds.playClick(); setSubTab(t.id); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              subTab === t.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* コンテンツエリア */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* 1. 厨房設備 */}
        {subTab === 'equipment' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {equipment.map(eq => {
              const cost = Math.floor(eq.baseCost * Math.pow(eq.costMultiplier, eq.level));
              const isMax = eq.level >= eq.maxLevel;
              return (
                <div key={eq.id} className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 flex flex-col justify-between gap-2 shadow">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl p-2 bg-stone-900 rounded-lg border border-stone-800">{eq.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{eq.name}</span>
                        <span className="text-xs text-amber-400 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                          Lv.{eq.level}/{eq.maxLevel}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-1 leading-snug">{eq.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                    <div className="text-xs text-emerald-400 font-bold">
                      {eq.speedBonus ? `調理速度 +${Math.round(eq.speedBonus * 100 * eq.level)}%` : eq.revenueBonus ? `客単価 +¥${eq.revenueBonus}` : ''}
                    </div>
                    {isMax ? (
                      <span className="text-xs text-stone-500 font-bold py-1 px-3 bg-stone-900 rounded-lg">MAX強化</span>
                    ) : (
                      <button
                        onClick={() => upgradeEquipment(eq.id)}
                        disabled={money < cost}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold shadow flex items-center gap-1 transition-all ${
                          money >= cost
                            ? 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white border border-amber-400'
                            : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                        }`}
                      >
                        <span>Lvアップ (¥{cost})</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. スタッフ雇用＆育成 */}
        {subTab === 'staff' && (
          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {/* 新規雇用カード */}
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <div className="text-xs text-amber-300 font-bold mb-2">【新しいスタッフの雇用】</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STAFF_TYPES.map(st => (
                  <div key={st.id} className="bg-stone-900 p-2.5 rounded-lg border border-stone-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{st.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-white">{st.name}</div>
                        <div className="text-[10px] text-stone-400">{st.desc}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => hireStaff(st.id)}
                      disabled={money < st.baseSalary}
                      className={`text-xs px-2.5 py-1.5 rounded-lg font-bold shrink-0 shadow ${
                        money >= st.baseSalary
                          ? 'bg-green-600 hover:bg-green-500 text-white'
                          : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      雇用 (¥{st.baseSalary})
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 在籍スタッフ一覧 */}
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <div className="text-xs text-amber-300 font-bold mb-2">【在籍中のスタッフ一覧】（計 {staffList.length}名）</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {staffList.map((s) => {
                  const upgradeCost = s.level * 800;
                  return (
                    <div key={s.id} className="bg-stone-900 p-2.5 rounded-lg border border-stone-800 flex flex-col justify-between gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{s.type === 'waiter' ? '🧑‍🍳' : '👨‍🍳'}</span>
                          <div>
                            <div className="text-xs font-bold text-white">{s.name}</div>
                            <div className="text-[10px] text-amber-400">ランク: Lv.{s.level} (速度 {s.speed.toFixed(1)}x)</div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => upgradeStaff(s.id)}
                        disabled={money < upgradeCost}
                        className={`w-full py-1 text-[11px] rounded font-bold shadow ${
                          money >= upgradeCost
                            ? 'bg-amber-600 hover:bg-amber-500 text-white'
                            : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                        }`}
                      >
                        トレーニング昇給 (¥{upgradeCost})
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 3. 店内装飾 */}
        {subTab === 'decor' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {decorations.map(dec => (
              <div key={dec.id} className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 flex flex-col justify-between gap-2 shadow">
                <div className="flex items-start gap-3">
                  <span className="text-3xl p-2 bg-stone-900 rounded-lg border border-stone-800">{dec.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{dec.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        dec.purchased ? 'bg-green-950 text-green-300 border border-green-800' : 'bg-stone-800 text-stone-400'
                      }`}>
                        {dec.purchased ? '設置済み' : '未購入'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1 leading-snug">{dec.desc}</p>
                    <div className="text-xs text-amber-400 font-bold mt-1.5">
                      効果: {dec.effect}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-800 text-right">
                  {dec.purchased ? (
                    <span className="text-xs text-emerald-400 font-bold">✨ 効果発動中</span>
                  ) : (
                    <button
                      onClick={() => buyDecoration(dec.id)}
                      disabled={money < dec.cost}
                      className={`text-xs px-4 py-1.5 rounded-lg font-bold shadow ${
                        money >= dec.cost
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border border-green-400'
                          : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      購入して設置 (¥{dec.cost})
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. 店舗拡張 */}
        {subTab === 'expansion' && (
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col gap-3 shadow">
              <div className="text-sm font-bold text-amber-300">
                現在のフロア規模: {EXPANSIONS[currentExpansionIndex].name}
              </div>
              <div className="text-xs text-stone-300 leading-relaxed">
                客席数: <strong className="text-amber-400">{EXPANSIONS[currentExpansionIndex].tables}席</strong>
                （同時に来店できるお客様の最大数）
              </div>

              {currentExpansionIndex + 1 < EXPANSIONS.length ? (
                <div className="mt-3 p-3 bg-stone-900 rounded-xl border border-stone-700 flex flex-col gap-2">
                  <div className="text-xs font-bold text-emerald-400">
                    次の拡張: {EXPANSIONS[currentExpansionIndex + 1].name}
                  </div>
                  <p className="text-xs text-stone-400">
                    {EXPANSIONS[currentExpansionIndex + 1].desc}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-800">
                    <span className="text-xs text-stone-300">
                      工事費用: <strong className="text-amber-400 text-sm">¥{EXPANSIONS[currentExpansionIndex + 1].cost}</strong>
                    </span>
                    <button
                      onClick={upgradeExpansion}
                      disabled={money < EXPANSIONS[currentExpansionIndex + 1].cost}
                      className={`text-xs px-4 py-2 rounded-xl font-bold shadow ${
                        money >= EXPANSIONS[currentExpansionIndex + 1].cost
                          ? 'bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white border border-amber-300'
                          : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      店舗を拡張する！
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-700 text-center text-xs text-amber-300 font-bold">
                  👑 最高峰「伝説のサイゼリーゼ本店」最大規模に拡張完了しました！
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
