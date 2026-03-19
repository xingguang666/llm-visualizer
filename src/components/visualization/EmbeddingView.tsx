import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, STEPS } from '../../stores';
import { EXAMPLES } from '../../data';
import { Tooltip, HighlightTerm } from '../ui/Tooltip';

export const EmbeddingView: React.FC = () => {
  const { currentExample, depthMode } = useAppStore();
  const step = STEPS[3];
  const example = EXAMPLES[currentExample];
  const vectors = example.embeddings.vectors;
  const [hoveredVector, setHoveredVector] = useState<number | null>(null);

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

      {/* 概念解释 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto text-center"
      >
        <p style={{ color: 'var(--text-primary)' }}>
          <HighlightTerm termId="embedding">词嵌入</HighlightTerm>
          把每个<HighlightTerm termId="token">Token</HighlightTerm>变成一串数字（
          <HighlightTerm termId="vector">向量</HighlightTerm>）。
          意思相近的词，它们的向量也会比较接近。
        </p>
      </motion.div>

      {/* 向量可视化 */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          {depthMode === 'simple' ? (
            /* ===== 简单模式：概念图 ===== */
            <div className="space-y-6">
              {/* Token到向量示意 */}
              <div className="flex items-center justify-center gap-6 py-4">
                {/* Token列表 */}
                <div className="text-center">
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Token（词语）</p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-[200px]">
                    {vectors.slice(0, 5).map((v, i) => (
                      <motion.span
                        key={i}
                        className="token text-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {v.token}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* 箭头 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-3xl" style={{ color: 'var(--accent-cyan)' }}>→</span>
                  <span className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>嵌入</span>
                </motion.div>

                {/* 向量列表 */}
                <div className="text-center">
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Vector（数字）</p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-[280px]">
                    {vectors.slice(0, 5).map((v, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="px-3 py-2 rounded-lg text-xs font-mono"
                        style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent-cyan)' }}
                      >
                        [{v.vector.x.toFixed(1)}, {v.vector.y.toFixed(1)}, ...]
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 语义空间示意 */}
              <div className="relative h-72 rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <div className="absolute inset-0 p-4">
                  <svg viewBox="0 0 400 260" className="w-full h-full">
                    {/* 坐标轴 */}
                    <line x1="40" y1="220" x2="380" y2="220" stroke="#4a4a6a" strokeWidth="1" />
                    <line x1="40" y1="20" x2="40" y2="220" stroke="#4a4a6a" strokeWidth="1" />

                    {/* 轴标签 */}
                    <text x="210" y="250" textAnchor="middle" fill="#6a6a8a" fontSize="10">语义维度1</text>
                    <text x="20" y="120" textAnchor="middle" fill="#6a6a8a" fontSize="10" transform="rotate(-90, 20, 120)">语义维度2</text>

                    {/* 数据点 */}
                    {vectors.slice(0, 6).map((v, i) => {
                      const x = 60 + v.vector.x * 300;
                      const y = 200 - v.vector.y * 160;
                      return (
                        <motion.g
                          key={i}
                          onMouseEnter={() => setHoveredVector(i)}
                          onMouseLeave={() => setHoveredVector(null)}
                          style={{ cursor: 'pointer' }}
                        >
                          {/* 发光效果 */}
                          {hoveredVector === i && (
                            <motion.circle
                              cx={x}
                              cy={y}
                              r="16"
                              fill={v.color}
                              opacity="0.3"
                              initial={{ r: 8 }}
                              animate={{ r: 16 }}
                            />
                          )}

                          {/* 主圆点 */}
                          <motion.circle
                            cx={x}
                            cy={y}
                            r="8"
                            fill={v.color}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          />

                          {/* 标签 */}
                          <motion.text
                            x={x}
                            y={y + 22}
                            textAnchor="middle"
                            fill={hoveredVector === i ? '#fff' : '#a0a0c0'}
                            fontSize={hoveredVector === i ? 13 : 11}
                            fontWeight={hoveredVector === i ? '600' : '400'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                          >
                            {v.token}
                          </motion.text>
                        </motion.g>
                      );
                    })}

                    {/* 相似词连线 */}
                    <motion.line
                      x1={60 + vectors[0].vector.x * 300}
                      y1={200 - vectors[0].vector.y * 160}
                      x2={60 + vectors[1].vector.x * 300}
                      y2={200 - vectors[1].vector.y * 160}
                      stroke="#4facfe"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                    />
                    <motion.text
                      x={(60 + vectors[0].vector.x * 300 + 60 + vectors[1].vector.x * 300) / 2}
                      y={(200 - vectors[0].vector.y * 160 + 200 - vectors[1].vector.y * 160) / 2 - 8}
                      textAnchor="middle"
                      fill="#4facfe"
                      fontSize="9"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      相似
                    </motion.text>
                  </svg>
                </div>

                {/* 说明文字 */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded text-xs" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', opacity: 0.9 }}>
                  💡 意思相近的词，在图中距离更近
                </div>
              </div>
            </div>
          ) : (
            /* ===== 详细模式：完整向量展示 ===== */
            <div className="space-y-6">
              {/* 向量维度信息 */}
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>向量维度：</span>
                  <span className="font-medium text-lg" style={{ color: 'var(--accent-cyan)' }}>{example.embeddings.dimensions}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Token数量：</span>
                  <span className="font-medium" style={{ color: 'var(--accent-purple)' }}>{vectors.length}</span>
                </div>
              </div>

              {/* 每个Token的向量可视化 */}
              <div className="space-y-3">
                {vectors.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg transition-colors"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                    onMouseEnter={() => setHoveredVector(i)}
                    onMouseLeave={() => setHoveredVector(null)}
                  >
                    {/* Token名称 */}
                    <span
                      className="token text-sm w-20 text-center"
                      style={{ background: `linear-gradient(135deg, ${v.color}, ${v.color}88)` }}
                    >
                      {v.token}
                    </span>

                    {/* 向量条形图 */}
                    <div className="flex-1 h-10 rounded-lg overflow-hidden flex items-center px-2" style={{ backgroundColor: 'var(--bg-card)' }}>
                      <AnimatePresence>
                        {hoveredVector === i && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-cyber-accent-cyan/5"
                          />
                        )}
                      </AnimatePresence>
                      <div className="flex gap-0.5 w-full h-6">
                        {Array.from({ length: 32 }).map((_, j) => (
                          <motion.div
                            key={j}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.3 + i * 0.05 + j * 0.01 }}
                            className="flex-1 rounded-sm"
                            style={{
                              backgroundColor: `hsl(${(j * 11) % 360}, 70%, ${30 + Math.random() * 40}%)`,
                              transformOrigin: 'bottom'
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 向量数值 */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                        [{v.vector.x.toFixed(2)}, {v.vector.y.toFixed(2)}, ...]
                      </span>
                      <Tooltip termId="vector">
                        <span className="text-xs cursor-help" style={{ color: 'var(--accent-cyan)' }}>ℹ️</span>
                      </Tooltip>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 维度解释 */}
              <div className="rounded-lg p-4 mt-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-medium mb-2 flex items-center gap-2" style={{ color: 'var(--accent-purple)' }}>
                  <span>📊</span> 向量的每个维度代表什么？
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  每个维度是模型学习到的一个"特征"。比如，某个维度可能代表"积极/消极"，
                  另一个维度可能代表"具体/抽象"。模型通过训练自动学习这些有意义的表示。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 详细说明 */}
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
              <HighlightTerm termId="embedding">词嵌入</HighlightTerm>
              就像给每个词语一个"数字身份证"。意思相近的词，它们的"身份证号码"也比较接近。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-medium mb-2" style={{ color: 'var(--accent-cyan)' }}>🎯 核心思想</h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  用数字表示词语，让计算机能理解词语之间的关系。
                  比如"好"和"棒"的向量会很接近，而"好"和"坏"的向量会相距较远。
                </p>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-medium mb-2" style={{ color: 'var(--accent-purple)' }}>💡 实际应用</h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  搜索引擎：搜"手机"也能找到"智能手机"的结果
                  机器翻译：理解词语的相似性，帮助翻译
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p style={{ color: 'var(--text-primary)' }}>
              <HighlightTerm termId="embedding">Word Embedding</HighlightTerm>
              将离散的Token映射到连续的向量空间，是现代NLP的核心技术之一。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-medium mb-2" style={{ color: 'var(--accent-cyan)' }}>📐 数学表示</h4>
                <ul className="text-sm space-y-2" style={{ color: 'var(--text-secondary)' }}>
                  <li>• 每个Token对应一个{example.embeddings.dimensions}维向量</li>
                  <li>• 向量值通过训练学习得到</li>
                  <li>• 相似词语的向量余弦相似度高</li>
                </ul>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-medium mb-2" style={{ color: 'var(--accent-purple)' }}>⚙️ 实现细节</h4>
                <ul className="text-sm space-y-2" style={{ color: 'var(--text-secondary)' }}>
                  <li>• 查表操作：Token ID → 向量</li>
                  <li>• 参数量：词表大小 × {example.embeddings.dimensions}维</li>
                  <li>• 可学习：随训练不断优化</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                📚 著名的例子：vec("King") - vec("Man") + vec("Woman") ≈ vec("Queen")。
                这说明向量空间能够捕捉词语之间的语义关系。
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};