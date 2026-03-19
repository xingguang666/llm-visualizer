import { motion } from 'framer-motion';
import { useAppStore, STEPS } from '../../stores';
import { HighlightTerm } from '../ui/Tooltip';

export const CrossAttentionView: React.FC = () => {
  const { depthMode } = useAppStore();
  const step = STEPS[10];

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
          <HighlightTerm termId="cross-attention">交叉注意力</HighlightTerm>
          是解码器和编码器之间的桥梁。解码器通过它"回头看"编码器的输出，
          获取输入序列的信息。
        </p>
      </motion.div>

      {/* 可视化 */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div className="relative h-72">
            <svg viewBox="0 0 600 250" className="w-full h-full">
              {/* Encoder输出 */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <rect x="50" y="80" width="150" height="80" rx="10" fill="#1a1a3a" stroke="#667eea" strokeWidth="2" />
                <text x="125" y="115" textAnchor="middle" fill="#667eea" fontSize="14" fontWeight="bold">Encoder</text>
                <text x="125" y="135" textAnchor="middle" fill="#a0a0c0" fontSize="11">输出向量</text>

                {/* Key和Value */}
                <div className="flex justify-center gap-2 mt-2">
                  <text x="90" y="155" textAnchor="middle" fill="#f093fb" fontSize="10">K</text>
                  <text x="160" y="155" textAnchor="middle" fill="#ffd700" fontSize="10">V</text>
                </div>
              </motion.g>

              {/* Decoder */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <rect x="400" y="80" width="150" height="80" rx="10" fill="#1a1a3a" stroke="#f093fb" strokeWidth="2" />
                <text x="475" y="115" textAnchor="middle" fill="#f093fb" fontSize="14" fontWeight="bold">Decoder</text>
                <text x="475" y="135" textAnchor="middle" fill="#a0a0c0" fontSize="11">当前状态</text>

                {/* Query */}
                <text x="475" y="155" textAnchor="middle" fill="#4facfe" fontSize="10">Q</text>
              </motion.g>

              {/* Cross Attention */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <rect x="250" y="90" width="100" height="60" rx="8" fill="#1a1a3a" stroke="#ffd700" strokeWidth="2" />
                <text x="300" y="115" textAnchor="middle" fill="#ffd700" fontSize="12">Cross</text>
                <text x="300" y="135" textAnchor="middle" fill="#ffd700" fontSize="12">Attention</text>
              </motion.g>

              {/* 连接线 */}
              <motion.path
                d="M 200 120 L 250 120"
                stroke="#667eea" strokeWidth="2"
                markerEnd="url(#arrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8 }}
              />
              <motion.path
                d="M 350 120 L 400 120"
                stroke="#f093fb" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.9 }}
              />

              {/* 数据流动画 */}
              <motion.circle
                r="4" fill="#ffd700"
                initial={{ cx: 200, cy: 120 }}
                animate={{
                  cx: [200, 300, 400],
                  cy: [120, 120, 120]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </svg>
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
            <HighlightTerm termId="cross-attention">交叉注意力</HighlightTerm>让解码器能够"回头看"编码器的结果。
            就像翻译时，一边写译文一边参考原文。
          </p>
        ) : (
          <div className="space-y-3">
            <p style={{ color: 'var(--text-primary)' }}>
              <HighlightTerm termId="cross-attention">Cross-Attention</HighlightTerm>连接Encoder和Decoder。
            </p>
            <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
              <li>• <HighlightTerm termId="query">Query</HighlightTerm>来自Decoder当前状态</li>
              <li>• <HighlightTerm termId="key">Key</HighlightTerm>和<HighlightTerm termId="value">Value</HighlightTerm>来自Encoder输出</li>
              <li>• 让Decoder能够参考输入序列的信息</li>
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};