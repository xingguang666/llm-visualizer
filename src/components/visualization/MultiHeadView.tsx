import { motion } from 'framer-motion';
import { useAppStore, STEPS } from '../../stores';
import { EXAMPLES } from '../../data';
import { HighlightTerm } from '../ui/Tooltip';

export const MultiHeadView: React.FC = () => {
  const { currentExample, depthMode } = useAppStore();
  const step = STEPS[6];
  const example = EXAMPLES[currentExample];
  const headCount = example.attention.heads;

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-2"
        >
          {step.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400"
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
        <p className="text-gray-300">
          <HighlightTerm termId="multi-head">多头注意力</HighlightTerm>
          就像用多双眼睛同时看一句话。每个"头"关注不同的关系，
          最后把所有信息合并起来，得到更全面的理解。
        </p>
      </motion.div>

      {/* 多头注意力可视化 */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl bg-cyber-bg-card rounded-2xl border border-gray-800 p-6">
          {/* 多头示意 */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {Array.from({ length: headCount }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-square bg-cyber-bg-secondary rounded-xl border border-gray-700 overflow-hidden"
              >
                {/* 模拟注意力模式 */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {Array.from({ length: 16 }).map((_, j) => (
                    <motion.circle
                      key={j}
                      cx={20 + (j % 4) * 20}
                      cy={20 + Math.floor(j / 4) * 20}
                      r={5 + Math.random() * 5}
                      fill={`hsl(${(i * 45 + j * 15) % 360}, 70%, 50%)`}
                      initial={{ r: 0 }}
                      animate={{ r: 5 + Math.random() * 5 }}
                      transition={{ delay: i * 0.1 + j * 0.02 }}
                    />
                  ))}
                </svg>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                  Head {i + 1}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 说明 */}
          {depthMode === 'detailed' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-sm text-gray-400"
            >
              每个注意力头关注不同的语义关系
            </motion.div>
          )}
        </div>
      </div>

      {/* 说明 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-cyber-bg-card rounded-xl p-6 border border-gray-800"
      >
        {depthMode === 'simple' ? (
          <p className="text-gray-300">
            <HighlightTerm termId="multi-head">多头注意力</HighlightTerm>就像用多双眼睛同时看，
            每个头可以关注不同的关系。比如一个头关注语法，另一个头关注语义。
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-300">
              <HighlightTerm termId="multi-head">Multi-Head Attention</HighlightTerm>并行运行多个注意力计算。
            </p>
            <p className="text-gray-400 text-sm">
              模型有{headCount}个注意力头，每个头可以学习捕捉不同类型的依赖关系。
              最后将所有头的输出拼接并投影到最终维度。
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};