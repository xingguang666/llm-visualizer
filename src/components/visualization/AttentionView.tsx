import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, STEPS } from '../../stores';
import { EXAMPLES } from '../../data';
import { Tooltip, HighlightTerm } from '../ui/Tooltip';

export const AttentionView: React.FC = () => {
  const { currentExample, depthMode } = useAppStore();
  const step = STEPS[5];
  const example = EXAMPLES[currentExample];
  const highlights = example.attention.highlights;
  const tokens = example.tokenization.bpe.slice(0, 8);
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);
  const [selectedHead, setSelectedHead] = useState(0);

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {step.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: 'var(--text-secondary)' }}
        >
          {step.description}
        </motion.p>
      </div>

      {/* 注意力可视化 */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          {depthMode === 'simple' ? (
            /* ===== 简单模式：注意力连线 ===== */
            <div className="space-y-6">
              {/* 注意力概念图 */}
              <div className="text-center mb-6">
                <p style={{ color: 'var(--text-primary)' }}>
                  <HighlightTerm termId="self-attention">自注意力</HighlightTerm>
                  让每个词都能"看到"其他所有词，并决定给每个词多少关注。
                </p>
              </div>

              {/* Token行与注意力连线 */}
              <div className="relative h-64">
                {/* Token行 */}
                <div className="absolute top-0 left-0 right-0 flex justify-around px-4">
                  {tokens.map((token, i) => (
                    <motion.div
                      key={i}
                      className="relative"
                      onMouseEnter={() => setHoveredToken(i)}
                      onMouseLeave={() => setHoveredToken(null)}
                    >
                      <motion.span
                        className="token cursor-pointer"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: hoveredToken === i ? 1.15 : 1
                        }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {token}
                      </motion.span>

                      {/* 悬停时显示注意力去向 */}
                      <AnimatePresence>
                        {hoveredToken === i && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-xs whitespace-nowrap"
                            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent-cyan)' }}
                          >
                            关注: {highlights.find(h => h.from === token)?.to || '所有词'}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* 注意力连线SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '20px' }}>
                  {highlights.map((h, i) => {
                    const fromIndex = tokens.indexOf(h.from);
                    const toIndex = tokens.indexOf(h.to);
                    if (fromIndex === -1 || toIndex === -1) return null;

                    // 计算位置
                    const containerWidth = 600;
                    const startX = 80 + (fromIndex * (containerWidth - 160) / (tokens.length - 1 || 1));
                    const endX = 80 + (toIndex * (containerWidth - 160) / (tokens.length - 1 || 1));
                    const midY = 100;

                    return (
                      <motion.g key={i}>
                        <motion.path
                          d={`M ${startX} 50 Q ${(startX + endX) / 2} ${midY} ${endX} 50`}
                          fill="none"
                          stroke={`hsl(${180 + h.weight * 60}, 70%, 60%)`}
                          strokeWidth={h.weight * 6}
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{
                            pathLength: 1,
                            opacity: hoveredToken === null || hoveredToken === fromIndex ? h.weight : 0.2
                          }}
                          transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
                          className="attention-line"
                          style={{ filter: `drop-shadow(0 0 ${h.weight * 8}px hsl(${180 + h.weight * 60}, 70%, 60%))` }}
                        />
                        {/* 权重标签 */}
                        <motion.text
                          x={(startX + endX) / 2}
                          y={midY - 5}
                          textAnchor="middle"
                          fill={`hsl(${180 + h.weight * 60}, 70%, 70%)`}
                          fontSize="11"
                          fontWeight="500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredToken === null || hoveredToken === fromIndex ? 0.9 : 0.2 }}
                          transition={{ delay: 1 + i * 0.2 }}
                        >
                          {Math.round(h.weight * 100)}%
                        </motion.text>
                      </motion.g>
                    );
                  })}
                </svg>

                {/* 图例 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span>线越粗 = 注意力权重越高</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>悬停Token查看关注对象</span>
                </motion.div>
              </div>

              {/* 关键发现 */}
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-medium mb-2" style={{ color: 'var(--accent-purple)' }}>🔍 关键发现</h4>
                <div className="space-y-2">
                  {highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span style={{ color: 'var(--text-primary)' }}>"{h.from}"</span>
                      <span style={{ color: 'var(--text-muted)' }}>→</span>
                      <span style={{ color: 'var(--text-primary)' }}>"{h.to}"</span>
                      <span className="text-xs" style={{ color: 'var(--accent-cyan)' }}>
                        (权重: {Math.round(h.weight * 100)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ===== 详细模式：Q/K/V计算 ===== */
            <div className="space-y-6">
              {/* Q/K/V概念解释 */}
              <div className="flex justify-center gap-6 mb-6">
                {[
                  { id: 'query', label: 'Query (Q)', icon: '🔍', desc: '我想找什么', color: 'cyan' },
                  { id: 'key', label: 'Key (K)', icon: '🏷️', desc: '我是什么', color: 'purple' },
                  { id: 'value', label: 'Value (V)', icon: '📦', desc: '我携带的信息', color: 'pink' }
                ].map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex flex-col items-center"
                  >
                    <Tooltip termId={item.id}>
                      <div className={`w-28 h-20 rounded-xl flex flex-col items-center justify-center mb-2 border-2 ${
                        item.color === 'cyan' ? '' :
                        item.color === 'purple' ? '' :
                        ''
                      }`}
                      style={{
                        backgroundColor: item.color === 'cyan' ? 'rgba(79, 172, 254, 0.1)' : item.color === 'purple' ? 'rgba(102, 126, 234, 0.1)' : 'rgba(240, 147, 251, 0.1)',
                        borderColor: item.color === 'cyan' ? 'var(--accent-cyan)' : item.color === 'purple' ? 'var(--accent-purple)' : 'var(--accent-pink)',
                        color: item.color === 'cyan' ? 'var(--accent-cyan)' : item.color === 'purple' ? 'var(--accent-purple)' : 'var(--accent-pink)'
                      }}
                      >
                        <span className="text-2xl mb-1">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label.split(' ')[0]}</span>
                      </div>
                    </Tooltip>
                    <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* 计算流程 */}
              <div className="rounded-lg p-4 space-y-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="text-center font-medium" style={{ color: 'var(--text-primary)' }}>计算流程</h4>

                {/* 步骤1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full text-sm flex items-center justify-center" style={{ backgroundColor: 'rgba(79, 172, 254, 0.2)', color: 'var(--accent-cyan)' }}>1</span>
                  <span style={{ color: 'var(--text-primary)' }}>
                    计算相似度: <span className="font-mono" style={{ color: 'var(--accent-cyan)' }}>Q × K<sup>T</sup></span>
                  </span>
                </motion.div>

                {/* 步骤2 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full text-sm flex items-center justify-center" style={{ backgroundColor: 'rgba(102, 126, 234, 0.2)', color: 'var(--accent-purple)' }}>2</span>
                  <span style={{ color: 'var(--text-primary)' }}>
                    缩放: <span className="font-mono" style={{ color: 'var(--accent-purple)' }}>÷ √d<sub>k</sub></span>
                    <Tooltip termId="attention">
                      <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>(防止梯度消失)</span>
                    </Tooltip>
                  </span>
                </motion.div>

                {/* 步骤3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full text-sm flex items-center justify-center" style={{ backgroundColor: 'rgba(240, 147, 251, 0.2)', color: 'var(--accent-pink)' }}>3</span>
                  <span style={{ color: 'var(--text-primary)' }}>
                    归一化: <Tooltip termId="softmax"><span className="font-mono" style={{ color: 'var(--accent-pink)' }}>Softmax</span></Tooltip>
                    → 得到注意力权重
                  </span>
                </motion.div>

                {/* 步骤4 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full text-sm flex items-center justify-center" style={{ backgroundColor: 'rgba(67, 233, 123, 0.2)', color: 'var(--flow-green)' }}>4</span>
                  <span style={{ color: 'var(--text-primary)' }}>
                    加权求和: <span className="font-mono" style={{ color: 'var(--flow-green)' }}>权重 × V</span>
                    → 得到输出
                  </span>
                </motion.div>
              </div>

              {/* 公式 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-lg p-4 text-center font-mono text-sm"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <p style={{ color: 'var(--text-primary)' }}>
                  <HighlightTerm termId="attention">Attention</HighlightTerm>(Q, K, V) ={' '}
                  <Tooltip termId="softmax"><span style={{ color: 'var(--accent-cyan)' }}>softmax</span></Tooltip>
                  (QK<sup>T</sup> / √d<sub>k</sub>) × V
                </p>
              </motion.div>

              {/* 注意力矩阵 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>注意力权重矩阵</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>注意力头:</span>
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(4, example.attention.heads) }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedHead(i)}
                          className={`w-8 h-8 rounded text-sm transition-all ${
                            selectedHead === i
                              ? 'gradient-purple-cyan text-white'
                              : ''
                          }`}
                          style={selectedHead !== i ? { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' } : {}}
                        >
                          #{i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 图例 - 移到矩阵上方 */}
                <div className="flex justify-center items-center gap-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(79, 172, 254, 0.2)' }}></div>
                    <span>低关注</span>
                  </div>
                  <div className="w-32 h-2 rounded-full" style={{ background: 'linear-gradient(to right, rgba(79, 172, 254, 0.2), var(--accent-cyan))' }}></div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--accent-cyan)' }}></div>
                    <span>高关注</span>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <div className="relative pl-12 pb-16">
                    {/* Y轴标题 - Query */}
                    <div className="absolute -left-28 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
                      <span className="text-sm font-semibold" style={{ color: 'var(--accent-cyan)' }}>Query (查询词)</span>
                    </div>

                    {/* 行标签 */}
                    <div className="absolute left-0 top-0 flex flex-col gap-1" style={{ transform: 'translateX(-4px)' }}>
                      {tokens.map((t, i) => (
                        <div key={i} className="w-10 h-10 flex items-center justify-center text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                          {t}
                        </div>
                      ))}
                    </div>

                    {/* 矩阵区域 */}
                    <div className="ml-10">
                      {/* 矩阵 - 根据selectedHead生成不同的权重 */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedHead}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="grid gap-1"
                          style={{ gridTemplateColumns: `repeat(${tokens.length}, 1fr)` }}
                        >
                          {tokens.map((_, i) =>
                            tokens.map((_, j) => {
                              // 获取基础权重，确保矩阵大小匹配
                              let baseWeight = example.attention.weights[i]?.[j] ?? 0;

                              // 不同注意力头显示略微不同的模式（通过对角线偏移实现）
                              const diagonalOffset = (selectedHead - 1.5) * 0.03 * (i === j ? 1 : 0);
                              const adjustedWeight = baseWeight + diagonalOffset;

                              // 对当前行重新应用softmax归一化，确保行和为1
                              const rowWeights = tokens.map((_, k) => {
                                const w = example.attention.weights[i]?.[k] ?? 0;
                                const offset = (selectedHead - 1.5) * 0.03 * (i === k ? 1 : 0);
                                return Math.exp((w + offset) * 3); // 放大差异
                              });
                              const rowSum = rowWeights.reduce((a, b) => a + b, 0);
                              const weight = rowWeights[j] / rowSum;

                              return (
                                <motion.div
                                  key={`${i}-${j}`}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: (i * tokens.length + j) * 0.02 }}
                                  className="w-10 h-10 rounded flex items-center justify-center text-xs font-medium cursor-pointer transition-all"
                                  style={{
                                    backgroundColor: `rgba(79, 172, 254, ${weight * 2})`,
                                    color: weight > 0.15 ? 'var(--bg-primary)' : 'white'
                                  }}
                                  whileHover={{ boxShadow: '0 0 8px var(--accent-cyan)' }}
                                  title={`${tokens[i]} 关注 ${tokens[j]}: ${(weight * 100).toFixed(1)}%`}
                                >
                                  {Math.round(weight * 100)}
                                </motion.div>
                              );
                            })
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* 列标签 */}
                      <div className="mt-2 flex justify-around">
                        {tokens.map((t, i) => (
                          <div key={i} className="w-10 text-center text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* X轴标题 - Key */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 whitespace-nowrap">
                      <span className="text-sm font-semibold" style={{ color: 'var(--accent-purple)' }}>Key (被关注词)</span>
                    </div>
                  </div>
                </div>

                {/* 矩阵读取说明 */}
                <div className="mt-8 text-center">
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    💡 行表示查询词，列表示被关注的词。数值表示关注度权重（0-100%）
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 说明 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl p-6"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
      >
        {depthMode === 'simple' ? (
          <div className="space-y-4">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              <HighlightTerm termId="attention">注意力机制</HighlightTerm>
              就像读书时用荧光笔标重点，告诉模型哪些词要重点看。
            </p>
            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                💡 例如："美味"会重点关注"好"，因为它们经常一起出现表达积极情感。
                这让模型能理解词语之间的关联，而不仅仅是单独看每个词。
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p style={{ color: 'var(--text-primary)' }}>
              <HighlightTerm termId="self-attention">Self-Attention</HighlightTerm>
              计算每个Token与其他所有Token的关联程度，是Transformer的核心创新。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-medium mb-2" style={{ color: 'var(--accent-cyan)' }}>
                  <Tooltip termId="query">Query</Tooltip>
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>当前Token的"查询"，表示想找什么信息</p>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-medium mb-2" style={{ color: 'var(--accent-purple)' }}>
                  <Tooltip termId="key">Key</Tooltip>
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>每个Token的"索引"，用于被Query匹配</p>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-medium mb-2" style={{ color: 'var(--accent-pink)' }}>
                  <Tooltip termId="value">Value</Tooltip>
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Token携带的实际信息内容</p>
              </div>
            </div>
            <p className="text-sm mt-4" style={{ color: 'var(--text-secondary)' }}>
              时间复杂度: O(n²) — 每个Token都要与所有Token计算注意力，这是Transformer的主要计算瓶颈。
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};