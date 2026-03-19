import { motion } from 'framer-motion';
import { useAppStore, STEPS } from '../../stores';
import { EXAMPLES } from '../../data';
import { HighlightTerm } from '../ui/Tooltip';

export const OutputView: React.FC = () => {
  const { currentExample, depthMode } = useAppStore();
  const step = STEPS[11];
  const example = EXAMPLES[currentExample];

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
          经过所有层的处理后，模型输出每个词的<HighlightTerm termId="probability">概率分布</HighlightTerm>。
          概率最高的词就是模型的预测结果。
        </p>
      </motion.div>

      {/* 输出可视化 */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          {example.output.type === 'classification' && (
            /* 分类输出 */
            <div className="space-y-6">
              <div className="flex justify-center gap-4">
                {example.output.predictions?.map((pred, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="relative w-32 h-32 mb-2">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle
                          cx="50" cy="50" r="40"
                          fill="none"
                          stroke="#1a1a3a"
                          strokeWidth="10"
                        />
                        <motion.circle
                          cx="50" cy="50" r="40"
                          fill="none"
                          stroke={i === 0 ? '#4facfe' : i === 1 ? '#667eea' : '#f093fb'}
                          strokeWidth="10"
                          strokeDasharray={`${pred.probability * 251.2} 251.2`}
                          initial={{ strokeDasharray: '0 251.2' }}
                          animate={{ strokeDasharray: `${pred.probability * 251.2} 251.2` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                          {(pred.probability * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <span style={{ color: 'var(--text-primary)' }}>{pred.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {example.output.type === 'generation' && (
            /* 生成输出 */
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>生成结果</p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl rounded-lg p-4 inline-block"
                  style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >
                  {example.input.text}
                  <span className="text-cyber-accent-cyan">{example.output.generatedText}</span>
                </motion.div>
              </div>

              {depthMode === 'detailed' && example.generation && (
                <div className="mt-6">
                  <p className="text-sm mb-3 text-center" style={{ color: 'var(--text-secondary)' }}>逐词生成过程</p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {example.generation.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex flex-col items-center"
                      >
                        <span className="token text-sm mb-1">{step.token}</span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{(step.prob * 100).toFixed(0)}%</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {example.output.type === 'qa' && (
            /* 问答输出 */
            <div className="space-y-6 text-center">
              <div>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>问题</p>
                <p className="text-lg" style={{ color: 'var(--text-primary)' }}>{example.input.text}</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>答案</p>
                <p className="text-3xl font-bold text-cyber-accent-cyan">{example.output.answer}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>置信度: {(example.output.confidence! * 100).toFixed(0)}%</p>
              </motion.div>

              {depthMode === 'detailed' && example.output.relatedKnowledge && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 text-left"
                >
                  <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>相关知识</p>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--text-primary)' }}>
                    {example.output.relatedKnowledge.map((k, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-cyber-accent-purple">•</span>
                        {k.fact}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 总结 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl p-6"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
      >
        {depthMode === 'simple' ? (
          <div className="space-y-3">
            <p style={{ color: 'var(--text-primary)' }}>{example.simpleMode.summary}</p>
            <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
              {example.simpleMode.keyPoints.map((point, i) => (
                <li key={i}>• {point}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-3">
            <p style={{ color: 'var(--text-primary)' }}>
              最终输出经过<HighlightTerm termId="linear">Linear层</HighlightTerm>映射到词表大小，
              然后通过<HighlightTerm termId="softmax">Softmax</HighlightTerm>转换为概率分布。
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              模型选择概率最高的词作为输出，或者使用采样策略生成更多样化的结果。
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};