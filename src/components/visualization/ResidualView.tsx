import { motion } from 'framer-motion';
import { useAppStore, STEPS } from '../../stores';
import { HighlightTerm } from '../ui/Tooltip';

export const ResidualView: React.FC = () => {
  const { depthMode } = useAppStore();
  const step = STEPS[7];

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
          <HighlightTerm termId="residual">残差连接</HighlightTerm>
          给信息开了一条"快车道"，让原始输入可以直接跳到后面。
          配合<HighlightTerm termId="layer-norm">层归一化</HighlightTerm>，
          让深层网络的训练更稳定。
        </p>
      </motion.div>

      {/* 可视化 */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl bg-cyber-bg-card rounded-2xl border border-gray-800 p-6">
          <div className="relative h-80">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* 输入 */}
              <motion.rect
                x="160" y="20" width="80" height="40" rx="8"
                fill="#1a1a3a" stroke="#4facfe" strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <text x="200" y="45" textAnchor="middle" fill="#4facfe" fontSize="14">输入 x</text>

              {/* 主路径：层处理 */}
              <motion.path
                d="M 200 60 L 200 100"
                stroke="#a0a0c0" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3 }}
              />

              {/* 层处理 */}
              <motion.rect
                x="150" y="100" width="100" height="60" rx="8"
                fill="#1a1a3a" stroke="#667eea" strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
              <text x="200" y="125" textAnchor="middle" fill="#667eea" fontSize="12">Sublayer</text>
              <text x="200" y="145" textAnchor="middle" fill="#a0a0c0" fontSize="10">(Attention/FFN)</text>

              {/* 残差连接 */}
              <motion.path
                d="M 160 40 L 60 40 L 60 200 L 160 200"
                stroke="#ffd700" strokeWidth="2" fill="none"
                strokeDasharray="5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5 }}
              />
              <text x="70" y="120" fill="#ffd700" fontSize="10">残差连接</text>

              {/* Add */}
              <motion.circle
                cx="200" cy="180" r="15"
                fill="#f093fb" stroke="#f093fb"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
              />
              <text x="200" y="185" textAnchor="middle" fill="#0a0a1a" fontSize="14" fontWeight="bold">+</text>

              {/* 层归一化 */}
              <motion.rect
                x="160" y="220" width="80" height="40" rx="8"
                fill="#1a1a3a" stroke="#43e97b" strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              />
              <text x="200" y="245" textAnchor="middle" fill="#43e97b" fontSize="12">LayerNorm</text>

              {/* 连接线 */}
              <motion.path
                d="M 200 160 L 200 165"
                stroke="#a0a0c0" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6 }}
              />
              <motion.path
                d="M 200 195 L 200 220"
                stroke="#a0a0c0" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8 }}
              />

              {/* 输出 */}
              <motion.path
                d="M 200 260 L 200 290"
                stroke="#a0a0c0" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.9 }}
              />
              <motion.text
                x="200" y="295" textAnchor="middle" fill="#ff6b35" fontSize="14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                输出
              </motion.text>
            </svg>
          </div>
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
              <HighlightTerm termId="residual">残差连接</HighlightTerm>就像给信息开了一条"快车道"，
              让原始输入可以直接传到后面的层，防止信息在深层网络中丢失。
            </p>
            <p className="text-gray-400 text-sm">
              <HighlightTerm termId="layer-norm">层归一化</HighlightTerm>则把数值调整到合适范围，让训练更稳定。
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-300">
              <HighlightTerm termId="residual">残差连接</HighlightTerm>：output = LayerNorm(x + Sublayer(x))
            </p>
            <p className="text-gray-400 text-sm">
              残差连接缓解了深层网络的梯度消失问题，让梯度能够更容易地反向传播。
              层归一化则对每个样本的特征进行归一化，加速收敛并提高稳定性。
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};