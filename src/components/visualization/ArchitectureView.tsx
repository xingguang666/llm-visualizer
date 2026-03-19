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
          <HighlightTerm termId="transformer">Transformer</HighlightTerm>
          是现代大语言模型的基石。它由<HighlightTerm termId="encoder">编码器</HighlightTerm>
          和<HighlightTerm termId="decoder">解码器</HighlightTerm>两部分组成，
          通过<HighlightTerm termId="attention">注意力机制</HighlightTerm>处理序列数据。
        </p>
      </motion.div>

      {/* 架构图 */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          {/* 网格背景 */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Transformer架构SVG */}
          <svg viewBox="0 0 800 550" className="w-full h-full">
            {/* 箭头标记定义 */}
            <defs>
              <marker id="arrow-cyan" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" style={{ fill: 'var(--flow-blue)' }} />
              </marker>
              <marker id="arrow-yellow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" style={{ fill: 'var(--flow-yellow)' }} />
              </marker>
              <marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" style={{ fill: 'var(--accent-orange)' }} />
              </marker>
            </defs>

            {/* 输入标签 - 放在最上方 */}
            <motion.g
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <rect x="175" y="10" width="100" height="28" rx="14" style={{ fill: 'rgba(79, 172, 254, 0.15)', stroke: 'var(--flow-blue)' }} strokeWidth="1.5" />
              <text x="225" y="29" textAnchor="middle" style={{ fill: 'var(--flow-blue)' }} fontSize="13" fontWeight="500">输入 Embedding</text>
              {/* 箭头向下 */}
              <path d="M 225 42 L 225 70" style={{ stroke: 'var(--flow-blue)' }} strokeWidth="1.5" markerEnd="url(#arrow-cyan)" />
            </motion.g>

            {/* Encoder */}
            <motion.g
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <rect x="100" y="80" width="250" height="380" rx="20" style={{ fill: 'var(--bg-secondary)', stroke: 'var(--accent-purple)' }} strokeWidth="2" />
              <text x="225" y="115" textAnchor="middle" style={{ fill: 'var(--accent-purple)' }} fontSize="18" fontWeight="bold">Encoder</text>

              {/* Encoder内部层 */}
              <rect x="130" y="145" width="190" height="60" rx="10" style={{ fill: 'var(--bg-card)', stroke: 'var(--accent-cyan)' }} strokeWidth="1.5" />
              <text x="225" y="180" textAnchor="middle" style={{ fill: 'var(--accent-cyan)' }} fontSize="14">Multi-Head Attention</text>

              <rect x="130" y="220" width="190" height="40" rx="8" style={{ fill: 'var(--bg-card)', stroke: 'var(--accent-pink)' }} strokeWidth="1.5" />
              <text x="225" y="245" textAnchor="middle" style={{ fill: 'var(--accent-pink)' }} fontSize="12">Add & Norm</text>

              <rect x="130" y="280" width="190" height="60" rx="10" style={{ fill: 'var(--bg-card)', stroke: 'var(--flow-green)' }} strokeWidth="1.5" />
              <text x="225" y="315" textAnchor="middle" style={{ fill: 'var(--flow-green)' }} fontSize="14">Feed Forward</text>

              <rect x="130" y="360" width="190" height="40" rx="8" style={{ fill: 'var(--bg-card)', stroke: 'var(--accent-pink)' }} strokeWidth="1.5" />
              <text x="225" y="385" textAnchor="middle" style={{ fill: 'var(--accent-pink)' }} fontSize="12">Add & Norm</text>

              {/* Nx标记 */}
              {depthMode === 'detailed' && (
                <text x="120" y="440" style={{ fill: 'var(--text-secondary)' }} fontSize="12">× N 层</text>
              )}
            </motion.g>

            {/* Decoder */}
            <motion.g
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <rect x="450" y="80" width="250" height="380" rx="20" style={{ fill: 'var(--bg-secondary)', stroke: 'var(--accent-pink)' }} strokeWidth="2" />
              <text x="575" y="115" textAnchor="middle" style={{ fill: 'var(--accent-pink)' }} fontSize="18" fontWeight="bold">Decoder</text>

              {/* Decoder内部层 */}
              <rect x="480" y="145" width="190" height="50" rx="10" style={{ fill: 'var(--bg-card)', stroke: 'var(--accent-cyan)' }} strokeWidth="1.5" />
              <text x="575" y="175" textAnchor="middle" style={{ fill: 'var(--accent-cyan)' }} fontSize="12">Masked Multi-Head Attention</text>

              <rect x="480" y="210" width="190" height="35" rx="8" style={{ fill: 'var(--bg-card)', stroke: 'var(--accent-pink)' }} strokeWidth="1.5" />
              <text x="575" y="233" textAnchor="middle" style={{ fill: 'var(--accent-pink)' }} fontSize="11">Add & Norm</text>

              <rect x="480" y="260" width="190" height="50" rx="10" style={{ fill: 'var(--bg-card)', stroke: 'var(--flow-yellow)' }} strokeWidth="1.5" />
              <text x="575" y="290" textAnchor="middle" style={{ fill: 'var(--flow-yellow)' }} fontSize="12">Cross Attention</text>

              <rect x="480" y="325" width="190" height="35" rx="8" style={{ fill: 'var(--bg-card)', stroke: 'var(--accent-pink)' }} strokeWidth="1.5" />
              <text x="575" y="348" textAnchor="middle" style={{ fill: 'var(--accent-pink)' }} fontSize="11">Add & Norm</text>

              <rect x="480" y="375" width="190" height="50" rx="10" style={{ fill: 'var(--bg-card)', stroke: 'var(--flow-green)' }} strokeWidth="1.5" />
              <text x="575" y="405" textAnchor="middle" style={{ fill: 'var(--flow-green)' }} fontSize="12">Feed Forward</text>

              {/* Nx标记 */}
              {depthMode === 'detailed' && (
                <text x="470" y="440" style={{ fill: 'var(--text-secondary)' }} fontSize="12">× N 层</text>
              )}
            </motion.g>

            {/* 连接线 - Encoder到Decoder */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              d="M 350 285 C 400 285 400 285 480 285"
              fill="none"
              style={{ stroke: 'var(--flow-yellow)' }}
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd="url(#arrow-yellow)"
            />

            {/* 输出标签 - 放在右侧 */}
            <motion.g
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <rect x="710" y="265" width="80" height="40" rx="20" style={{ fill: 'rgba(255, 107, 53, 0.15)', stroke: 'var(--accent-orange)' }} strokeWidth="1.5" />
              <text x="750" y="290" textAnchor="middle" style={{ fill: 'var(--accent-orange)' }} fontSize="13" fontWeight="500">输出</text>
              {/* 箭头从Decoder到输出 */}
              <path d="M 700 285 L 708 285" style={{ stroke: 'var(--accent-orange)' }} strokeWidth="1.5" markerEnd="url(#arrow-orange)" />
            </motion.g>

            {/* 输出层说明 */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <rect x="515" y="460" width="120" height="35" rx="8" style={{ fill: 'var(--bg-card)', stroke: 'var(--accent-orange)' }} strokeWidth="1.5" />
              <text x="575" y="482" textAnchor="middle" style={{ fill: 'var(--accent-orange)' }} fontSize="12">Linear + Softmax</text>
              {/* 箭头向上 */}
              <path d="M 575 430 L 575 458" style={{ stroke: 'var(--accent-orange)' }} strokeWidth="1.5" markerEnd="url(#arrow-orange)" />
            </motion.g>
          </svg>
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
          <div className="space-y-3">
            <p style={{ color: 'var(--text-primary)' }}>
              Transformer是现代大语言模型的核心架构，由<HighlightTerm termId="encoder">Encoder（编码器）</HighlightTerm>和<HighlightTerm termId="decoder">Decoder（解码器）</HighlightTerm>两部分组成。
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              编码器负责理解输入内容，解码器负责生成输出结果。它们通过注意力机制连接，能够捕捉文本中的长距离依赖关系。
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p style={{ color: 'var(--text-primary)' }}>
              Transformer架构由Vaswani等人在2017年的论文《Attention Is All You Need》中提出，彻底改变了NLP领域。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium" style={{ color: 'var(--accent-purple)' }}>Encoder组件</h4>
                <ul className="space-y-1" style={{ color: 'var(--text-secondary)' }}>
                  <li>• <HighlightTerm termId="multi-head">Multi-Head Self-Attention</HighlightTerm></li>
                  <li>• <HighlightTerm termId="ffn">Position-wise Feed-Forward Network</HighlightTerm></li>
                  <li>• <HighlightTerm termId="layer-norm">Layer Normalization</HighlightTerm></li>
                  <li>• <HighlightTerm termId="residual">Residual Connections</HighlightTerm></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium" style={{ color: 'var(--accent-pink)' }}>Decoder组件</h4>
                <ul className="space-y-1" style={{ color: 'var(--text-secondary)' }}>
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