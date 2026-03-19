import { motion } from 'framer-motion';
import { useAppStore, STEPS } from '../../stores';
import { HighlightTerm } from '../ui/Tooltip';

export const DecoderMaskView: React.FC = () => {
  const { depthMode } = useAppStore();
  const step = STEPS[9];

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
          <HighlightTerm termId="causal-mask">因果掩码</HighlightTerm>
          确保模型在生成时不能"偷看"后面的内容。
          就像考试时不能提前看答案，必须一步步推理。
        </p>
      </motion.div>

      {/* 可视化 */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div className="flex justify-center gap-8">
            {/* 因果掩码矩阵 */}
            <div className="text-center">
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>因果掩码</p>
              <div className="inline-grid gap-1" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
                {Array.from({ length: 6 }).map((_, i) =>
                  Array.from({ length: 6 }).map((_, j) => (
                    <motion.div
                      key={`${i}-${j}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + (i * 6 + j) * 0.02 }}
                      className={`w-10 h-10 rounded ${
                        j <= i ? 'bg-cyber-accent-cyan/30 border border-cyber-accent-cyan' : 'bg-gray-800'
                      }`}
                      title={j <= i ? '可见' : '掩码'}
                    >
                      {j <= i && <span className="text-xs text-cyber-accent-cyan">✓</span>}
                    </motion.div>
                  ))
                )}
              </div>
              <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>每个位置只能看到自己和之前的内容</p>
            </div>

            {depthMode === 'detailed' && (
              /* 时间方向示意 */
              <div className="text-center">
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>生成过程</p>
                <div className="flex flex-col gap-2">
                  {['今', '天', '天', '气', '很', '好'].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-xs w-8" style={{ color: 'var(--text-muted)' }}>t={i + 1}</span>
                      <div className="flex">
                        {Array.from({ length: i + 1 }).map((_, j) => (
                          <span key={j} className="token text-xs">{['今', '天', '天', '气', '很', '好'][j]}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
            在生成文字时，模型<HighlightTerm termId="causal-mask">不能"偷看"后面的内容</HighlightTerm>。
            掩码就像一个眼罩，确保模型只能根据已经生成的内容来预测下一个词。
          </p>
        ) : (
          <div className="space-y-3">
            <p style={{ color: 'var(--text-primary)' }}>
              <HighlightTerm termId="causal-mask">因果掩码</HighlightTerm>确保解码器在生成时无法看到未来的Token。
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              这是自回归生成的关键约束：在预测第t个位置时，只能依赖位置1到t-1的信息。
              掩码通过将未来位置的注意力分数设为负无穷来实现。
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};