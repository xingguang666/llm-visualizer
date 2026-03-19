import { motion } from 'framer-motion';
import { useAppStore, STEPS } from '../../stores';
import { EXAMPLES } from '../../data';
import { HighlightTerm } from '../ui/Tooltip';

export const PositionalView: React.FC = () => {
  const { currentExample, depthMode } = useAppStore();
  const step = STEPS[4];
  const example = EXAMPLES[currentExample];
  const tokens = example.tokenization.bpe.slice(0, 8);

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
          <HighlightTerm termId="positional-encoding">位置编码</HighlightTerm>
          给每个Token加上位置信息，让模型知道词语在句子中的先后顺序。
          这就像给每个词语贴上"第几个"的标签。
        </p>
      </motion.div>

      {/* 可视化 */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          {depthMode === 'simple' ? (
            /* 简单模式：位置信息示意 */
            <div className="space-y-6">
              {/* Token序列带位置 */}
              <div className="flex justify-center items-center gap-4">
                {tokens.map((token, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-xs mb-1" style={{ color: 'var(--accent-cyan)' }}>位置 {i}</span>
                    <span className="token">{token}</span>
                  </motion.div>
                ))}
              </div>

              {/* 加法示意 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center items-center gap-6 text-sm"
              >
                <div className="text-center">
                  <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>词向量</p>
                  <div className="w-20 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(102, 126, 234, 0.2)', color: 'var(--accent-purple)' }}>
                    [+]
                  </div>
                </div>
                <span className="text-2xl" style={{ color: 'var(--text-muted)' }}>+</span>
                <div className="text-center">
                  <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>位置向量</p>
                  <div className="w-20 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(79, 172, 254, 0.2)', color: 'var(--accent-cyan)' }}>
                    [pos]
                  </div>
                </div>
                <span className="text-2xl" style={{ color: 'var(--text-muted)' }}>=</span>
                <div className="text-center">
                  <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>最终向量</p>
                  <div className="w-20 h-12 rounded-lg flex items-center justify-center text-white" style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.3), rgba(79, 172, 254, 0.3))' }}>
                    [input]
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* 详细模式：正弦波可视化 */
            <div className="space-y-6">
              {/* 正弦波示意 */}
              <div className="relative h-48 rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <svg viewBox="0 0 800 180" className="w-full h-full">
                  {/* 多条正弦曲线表示不同维度 */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.path
                      key={i}
                      d={`M 0 ${90 + i * 5} ${Array.from({ length: 100 }).map((_, j) => {
                        const x = j * 8;
                        const y = 90 + i * 5 + Math.sin((j * 0.1 + i * 0.5)) * (20 + i * 2);
                        return `L ${x} ${y}`;
                      }).join(' ')}`}
                      fill="none"
                      stroke={`hsl(${(i * 45) % 360}, 70%, 60%)`}
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                    />
                  ))}

                  {/* 位置标记 */}
                  {tokens.map((_, i) => (
                    <motion.line
                      key={i}
                      x1={50 + i * 90}
                      y1={0}
                      x2={50 + i * 90}
                      y2={180}
                      stroke="#4facfe"
                      strokeWidth="1"
                      strokeDasharray="4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    />
                  ))}
                </svg>

                {/* Token标签 */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-around px-8 pb-2">
                  {tokens.map((token, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="text-xs"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {token}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* 公式 */}
              <div className="text-center text-sm font-mono rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                <p>PE(pos, 2i) = sin(pos / 10000^(2i/d))</p>
                <p>PE(pos, 2i+1) = cos(pos / 10000^(2i/d))</p>
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
          <p style={{ color: 'var(--text-primary)' }}>
            因为Transformer不像RNN那样逐个处理，所以需要用<HighlightTerm termId="positional-encoding">位置编码</HighlightTerm>告诉模型每个词在句子中的位置。
            位置信息会加到词向量上，一起送入模型处理。
          </p>
        ) : (
          <div className="space-y-3">
            <p style={{ color: 'var(--text-primary)' }}>
              <HighlightTerm termId="positional-encoding">位置编码</HighlightTerm>使用正弦和余弦函数为每个位置生成唯一的位置向量。
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              这种设计让模型能够学习相对位置关系，并且可以泛化到训练时未见过的序列长度。
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};