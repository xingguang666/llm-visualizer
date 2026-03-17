import { motion } from 'framer-motion';
import { useAppStore, STEPS } from '../../stores';
import { EXAMPLES } from '../../data';
import { HighlightTerm } from '../ui/Tooltip';

export const InputView: React.FC = () => {
  const { currentExample, depthMode } = useAppStore();
  const step = STEPS[1];
  const example = EXAMPLES[currentExample];

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
          一切从这里开始。用户输入的<HighlightTerm termId="token">文本</HighlightTerm>，
          将经过一系列转换，最终变成模型能理解的数字表示。
        </p>
      </motion.div>

      {/* 输入展示 */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative w-full max-w-2xl"
        >
          {/* 输入框 */}
          <div className="bg-cyber-bg-card rounded-2xl border border-gray-800 p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{example.icon}</span>
              <span className="text-gray-400">{example.description}</span>
            </div>

            {/* 原始文本 */}
            <div className="bg-cyber-bg-secondary rounded-xl p-6 border border-gray-700">
              <p className="text-xl text-white leading-relaxed">
                {example.input.text}
              </p>
            </div>

            {/* 任务类型 */}
            {depthMode === 'detailed' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex items-center gap-2 text-sm text-gray-400"
              >
                <span className="px-2 py-1 bg-cyber-accent-purple/20 text-cyber-accent-purple rounded">
                  {example.input.type}
                </span>
              </motion.div>
            )}
          </div>

          {/* 装饰性箭头 */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-cyber-accent-cyan"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
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
            这是模型的<HighlightTerm termId="input">原始输入</HighlightTerm>。在处理之前，模型需要先将这段文字转换成它能理解的格式。
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-300">
              输入文本是<HighlightTerm termId="input">自然语言形式</HighlightTerm>，需要经过以下预处理步骤：
            </p>
            <ol className="text-gray-400 text-sm space-y-2 list-decimal list-inside">
              <li>标准化处理</li>
              <li><HighlightTerm termId="tokenization">分词</HighlightTerm></li>
              <li>转换为<HighlightTerm termId="token-id">Token ID</HighlightTerm></li>
              <li>生成<HighlightTerm termId="embedding">Embedding向量</HighlightTerm></li>
            </ol>
          </div>
        )}
      </motion.div>
    </div>
  );
};