import { motion } from 'framer-motion';
import { useAppStore, STEPS } from '../../stores';
import { HighlightTerm } from '../ui/Tooltip';

export const ArchitectureView: React.FC = () => {
  const { depthMode } = useAppStore();
  const step = STEPS[0];

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
          <HighlightTerm termId="transformer">Transformer</HighlightTerm>
          是现代大语言模型的基石。它由<HighlightTerm termId="encoder">编码器</HighlightTerm>
          和<HighlightTerm termId="decoder">解码器</HighlightTerm>两部分组成，
          通过<HighlightTerm termId="attention">注意力机制</HighlightTerm>处理序列数据。
        </p>
      </motion.div>

      {/* 架构图 */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-4xl aspect-[16/9] bg-cyber-bg-card rounded-2xl border border-gray-800 overflow-hidden">
          {/* 网格背景 */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Transformer架构SVG */}
          <svg viewBox="0 0 800 500" className="w-full h-full">
            {/* Encoder */}
            <motion.g
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <rect x="100" y="50" width="250" height="400" rx="20" fill="#1a1a3a" stroke="#667eea" strokeWidth="2" />
              <text x="225" y="85" textAnchor="middle" fill="#667eea" fontSize="18" fontWeight="bold">Encoder</text>

              {/* Encoder内部层 */}
              <rect x="130" y="120" width="190" height="60" rx="10" fill="#12122a" stroke="#4facfe" strokeWidth="1.5" />
              <text x="225" y="155" textAnchor="middle" fill="#4facfe" fontSize="14">Multi-Head Attention</text>

              <rect x="130" y="200" width="190" height="40" rx="8" fill="#12122a" stroke="#f093fb" strokeWidth="1.5" />
              <text x="225" y="225" textAnchor="middle" fill="#f093fb" fontSize="12">Add & Norm</text>

              <rect x="130" y="260" width="190" height="60" rx="10" fill="#12122a" stroke="#43e97b" strokeWidth="1.5" />
              <text x="225" y="295" textAnchor="middle" fill="#43e97b" fontSize="14">Feed Forward</text>

              <rect x="130" y="340" width="190" height="40" rx="8" fill="#12122a" stroke="#f093fb" strokeWidth="1.5" />
              <text x="225" y="365" textAnchor="middle" fill="#f093fb" fontSize="12">Add & Norm</text>

              {/* Nx标记 */}
              {depthMode === 'detailed' && (
                <text x="120" y="430" fill="#a0a0c0" fontSize="12">× N 层</text>
              )}
            </motion.g>

            {/* Decoder */}
            <motion.g
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <rect x="450" y="50" width="250" height="400" rx="20" fill="#1a1a3a" stroke="#f093fb" strokeWidth="2" />
              <text x="575" y="85" textAnchor="middle" fill="#f093fb" fontSize="18" fontWeight="bold">Decoder</text>

              {/* Decoder内部层 */}
              <rect x="480" y="120" width="190" height="50" rx="10" fill="#12122a" stroke="#4facfe" strokeWidth="1.5" />
              <text x="575" y="150" textAnchor="middle" fill="#4facfe" fontSize="12">Masked Multi-Head Attention</text>

              <rect x="480" y="185" width="190" height="35" rx="8" fill="#12122a" stroke="#f093fb" strokeWidth="1.5" />
              <text x="575" y="208" textAnchor="middle" fill="#f093fb" fontSize="11">Add & Norm</text>

              <rect x="480" y="235" width="190" height="50" rx="10" fill="#12122a" stroke="#ffd700" strokeWidth="1.5" />
              <text x="575" y="265" textAnchor="middle" fill="#ffd700" fontSize="12">Cross Attention</text>

              <rect x="480" y="300" width="190" height="35" rx="8" fill="#12122a" stroke="#f093fb" strokeWidth="1.5" />
              <text x="575" y="323" textAnchor="middle" fill="#f093fb" fontSize="11">Add & Norm</text>

              <rect x="480" y="350" width="190" height="50" rx="10" fill="#12122a" stroke="#43e97b" strokeWidth="1.5" />
              <text x="575" y="380" textAnchor="middle" fill="#43e97b" fontSize="12">Feed Forward</text>

              {/* Nx标记 */}
              {depthMode === 'detailed' && (
                <text x="470" y="430" fill="#a0a0c0" fontSize="12">× N 层</text>
              )}
            </motion.g>

            {/* 连接线 */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              d="M 350 250 C 400 250 400 260 450 260"
              fill="none"
              stroke="#ffd700"
              strokeWidth="2"
              strokeDasharray="5,5"
            />

            {/* 输入输出 */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <rect x="50" y="400" width="80" height="30" rx="5" fill="#00f2fe" fillOpacity="0.2" stroke="#00f2fe" />
              <text x="90" y="420" textAnchor="middle" fill="#00f2fe" fontSize="12">输入</text>

              <rect x="670" y="400" width="80" height="30" rx="5" fill="#ff6b35" fillOpacity="0.2" stroke="#ff6b35" />
              <text x="710" y="420" textAnchor="middle" fill="#ff6b35" fontSize="12">输出</text>
            </motion.g>
          </svg>
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
          <div className="space-y-3">
            <p className="text-gray-300">
              Transformer是现代大语言模型的核心架构，由<HighlightTerm termId="encoder">Encoder（编码器）</HighlightTerm>和<HighlightTerm termId="decoder">Decoder（解码器）</HighlightTerm>两部分组成。
            </p>
            <p className="text-gray-400 text-sm">
              编码器负责理解输入内容，解码器负责生成输出结果。它们通过注意力机制连接，能够捕捉文本中的长距离依赖关系。
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-300">
              Transformer架构由Vaswani等人在2017年的论文《Attention Is All You Need》中提出，彻底改变了NLP领域。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="text-cyber-accent-purple font-medium">Encoder组件</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• <HighlightTerm termId="multi-head">Multi-Head Self-Attention</HighlightTerm></li>
                  <li>• <HighlightTerm termId="ffn">Position-wise Feed-Forward Network</HighlightTerm></li>
                  <li>• <HighlightTerm termId="layer-norm">Layer Normalization</HighlightTerm></li>
                  <li>• <HighlightTerm termId="residual">Residual Connections</HighlightTerm></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-cyber-accent-pink font-medium">Decoder组件</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• <HighlightTerm termId="masked-attention">Masked Multi-Head Attention</HighlightTerm></li>
                  <li>• <HighlightTerm termId="cross-attention">Cross-Attention</HighlightTerm></li>
                  <li>• <HighlightTerm termId="ffn">Position-wise Feed-Forward Network</HighlightTerm></li>
                  <li>• <HighlightTerm termId="linear">Linear</HighlightTerm> + <HighlightTerm termId="softmax">Softmax</HighlightTerm> 输出层</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};