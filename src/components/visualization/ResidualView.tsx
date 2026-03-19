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
          <HighlightTerm termId="residual">残差连接</HighlightTerm>
          给信息开了一条"快车道"，让原始输入可以直接跳到后面。
          配合<HighlightTerm termId="layer-norm">层归一化</HighlightTerm>，
          让深层网络的训练更稳定。
        </p>
      </motion.div>

      {/* 可视化 - SVG技术架构图 */}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <svg viewBox="0 -20 1200 640" className="w-full h-auto">
            {/* 箭头标记定义 */}
            <defs>
              <marker id="residual-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" style={{ fill: 'var(--flow-yellow)' }} />
              </marker>
              <marker id="flow-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" style={{ fill: 'var(--text-secondary)' }} />
              </marker>
              <marker id="add-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" style={{ fill: 'var(--flow-green)' }} />
              </marker>
            </defs>

            {/* ========== 残差旁路（黄色虚线）- 绕过所有模块 ========== */}
            {/* 从输入模块上方出发，沿顶部绕到加法模块 */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              d="M 160 160
                 L 160 35
                 Q 160 15, 180 15
                 L 680 15
                 Q 700 15, 700 35
                 L 700 150"
              fill="none"
              style={{ stroke: 'var(--flow-yellow)' }}
              strokeWidth="3"
              strokeDasharray="12 6"
              strokeLinecap="round"
              markerEnd="url(#residual-arrow)"
            />

            {/* 残差旁路标签 */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <rect x="300" y="-5" width="240" height="28" rx="14" style={{ fill: 'var(--bg-secondary)' }} />
              <text x="420" y="15" textAnchor="middle" style={{ fill: 'var(--flow-yellow)' }} fontSize="14" fontWeight="500">
                残差连接（直连旁路）
              </text>
            </motion.g>

            {/* ========== 主流程层 ========== */}

            {/* 1. 输入模块 (浅蓝色矩形) */}
            <motion.g
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <rect x="80" y="160" width="160" height="80" rx="8" style={{ fill: 'rgba(79, 172, 254, 0.15)', stroke: 'var(--accent-cyan)', strokeWidth: 2 }} />
              <text x="160" y="195" textAnchor="middle" style={{ fill: 'var(--accent-cyan)' }} fontSize="18" fontWeight="600">输入 x</text>
              <text x="160" y="220" textAnchor="middle" style={{ fill: 'var(--text-secondary)' }} fontSize="12">Input Tensor</text>
            </motion.g>

            {/* 箭头: 输入 → 计算层 */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              d="M 240 200 L 330 200"
              style={{ stroke: 'var(--text-secondary)' }}
              strokeWidth="2"
              markerEnd="url(#flow-arrow)"
            />

            {/* 2. 中间计算层 (橙色圆角矩形) */}
            <motion.g
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <rect x="340" y="130" width="200" height="140" rx="16" style={{ fill: 'rgba(255, 107, 53, 0.12)', stroke: 'var(--accent-orange)', strokeWidth: 2 }} />
              <text x="440" y="175" textAnchor="middle" style={{ fill: 'var(--accent-orange)' }} fontSize="16" fontWeight="600">多头注意力层 / MHA</text>
              <text x="440" y="200" textAnchor="middle" style={{ fill: 'var(--text-secondary)' }} fontSize="13">或 前馈网络 / FFN</text>
              <line x1="360" y1="215" x2="520" y2="215" style={{ stroke: 'var(--border-color)' }} strokeWidth="1" />
              <text x="440" y="245" textAnchor="middle" style={{ fill: 'var(--text-primary)' }} fontSize="14" fontFamily="monospace">Sublayer(x)</text>
            </motion.g>

            {/* 箭头: 计算层 → 加法模块 */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              d="M 540 200 L 620 200"
              style={{ stroke: 'var(--text-secondary)' }}
              strokeWidth="2"
              markerEnd="url(#add-arrow)"
            />

            {/* 3. 加法模块 (绿色圆形) */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            >
              <circle cx="700" cy="200" r="50" style={{ fill: 'rgba(67, 233, 123, 0.15)', stroke: 'var(--flow-green)', strokeWidth: 2 }} />
              <text x="700" y="195" textAnchor="middle" style={{ fill: 'var(--flow-green)' }} fontSize="16" fontWeight="bold">+</text>
              <text x="700" y="215" textAnchor="middle" style={{ fill: 'var(--text-secondary)' }} fontSize="11">Add</text>
            </motion.g>

            {/* 加法公式标签 */}
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <rect x="630" y="280" width="140" height="32" rx="6" style={{ fill: 'var(--bg-secondary)' }} />
              <text x="700" y="302" textAnchor="middle" style={{ fill: 'var(--text-primary)' }} fontSize="13" fontFamily="monospace">x + Sublayer(x)</text>
            </motion.g>

            {/* 箭头: 加法 → 归一化 */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              d="M 750 200 L 820 200"
              style={{ stroke: 'var(--text-secondary)' }}
              strokeWidth="2"
              markerEnd="url(#flow-arrow)"
            />

            {/* 4. 归一化模块 (紫色矩形) */}
            <motion.g
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <rect x="830" y="140" width="160" height="120" rx="12" style={{ fill: 'rgba(102, 126, 234, 0.12)', stroke: 'var(--accent-purple)', strokeWidth: 2 }} />
              <text x="910" y="180" textAnchor="middle" style={{ fill: 'var(--accent-purple)' }} fontSize="16" fontWeight="600">LayerNorm 层</text>
              <line x1="850" y1="195" x2="1070" y2="195" style={{ stroke: 'var(--border-color)' }} strokeWidth="1" />
              <text x="910" y="225" textAnchor="middle" style={{ fill: 'var(--text-primary)' }} fontSize="13" fontFamily="monospace">LayerNorm(</text>
              <text x="910" y="245" textAnchor="middle" style={{ fill: 'var(--text-primary)' }} fontSize="13" fontFamily="monospace">  x + Sublayer(x))</text>
            </motion.g>

            {/* 箭头: 归一化 → 输出 */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              d="M 990 200 L 1050 200"
              style={{ stroke: 'var(--text-secondary)' }}
              strokeWidth="2"
              markerEnd="url(#flow-arrow)"
            />

            {/* 5. 输出模块 (深蓝色矩形) */}
            <motion.g
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <rect x="1060" y="160" width="100" height="80" rx="8" style={{ fill: 'rgba(0, 242, 254, 0.15)', stroke: 'var(--flow-blue)', strokeWidth: 2 }} />
              <text x="1110" y="205" textAnchor="middle" style={{ fill: 'var(--flow-blue)' }} fontSize="18" fontWeight="600">输出</text>
            </motion.g>

            {/* ========== 底部核心公式 ========== */}
            {depthMode === 'detailed' && (
              <motion.g
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <rect x="350" y="420" width="500" height="60" rx="12" style={{ fill: 'var(--bg-secondary)' }} />
                <text x="600" y="455" textAnchor="middle" style={{ fill: 'var(--text-primary)' }} fontSize="16" fontFamily="monospace">
                  <tspan style={{ fill: 'var(--accent-cyan)' }}>output</tspan>
                  <tspan style={{ fill: 'var(--text-secondary)' }}> = </tspan>
                  <tspan style={{ fill: 'var(--accent-purple)' }}>LayerNorm</tspan>
                  <tspan style={{ fill: 'var(--text-primary)' }}>(</tspan>
                  <tspan style={{ fill: 'var(--accent-cyan)' }}>x</tspan>
                  <tspan style={{ fill: 'var(--text-primary)' }}> + </tspan>
                  <tspan style={{ fill: 'var(--accent-orange)' }}>Sublayer</tspan>
                  <tspan style={{ fill: 'var(--text-primary)' }}>(</tspan>
                  <tspan style={{ fill: 'var(--accent-cyan)' }}>x</tspan>
                  <tspan style={{ fill: 'var(--text-primary)' }}>))</tspan>
                </text>
              </motion.g>
            )}

            {/* ========== 图例 ========== */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              transform="translate(80, 520)"
            >
              <text x="0" y="0" style={{ fill: 'var(--text-secondary)' }} fontSize="12" fontWeight="500">图例：</text>

              {/* 残差连接 */}
              <line x1="60" y1="-5" x2="110" y2="-5" style={{ stroke: 'var(--flow-yellow)' }} strokeWidth="2" strokeDasharray="6 3" />
              <text x="120" y="0" style={{ fill: 'var(--text-secondary)' }} fontSize="11">残差连接</text>

              {/* 数据流 */}
              <line x1="220" y1="-5" x2="270" y2="-5" style={{ stroke: 'var(--text-secondary)' }} strokeWidth="2" markerEnd="url(#flow-arrow)" />
              <text x="280" y="0" style={{ fill: 'var(--text-secondary)' }} fontSize="11">数据流向</text>
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
              <HighlightTerm termId="residual">残差连接</HighlightTerm>就像给信息开了一条"快车道"，
              让原始输入可以直接传到后面的层，防止信息在深层网络中丢失。
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              <HighlightTerm termId="layer-norm">层归一化</HighlightTerm>则把数值调整到合适范围，让训练更稳定。
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p style={{ color: 'var(--text-primary)' }}>
              <HighlightTerm termId="residual">残差连接</HighlightTerm>：output = LayerNorm(x + Sublayer(x))
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              残差连接缓解了深层网络的梯度消失问题，让梯度能够更容易地反向传播。
              层归一化则对每个样本的特征进行归一化，加速收敛并提高稳定性。
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};