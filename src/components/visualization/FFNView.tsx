import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, STEPS } from '../../stores';
import { EXAMPLES } from '../../data';
import { Tooltip, HighlightTerm } from '../ui/Tooltip';

type AnimationPhase = 'input' | 'expand' | 'activate' | 'output';

export const FFNView: React.FC = () => {
  const { currentExample, depthMode } = useAppStore();
  const step = STEPS[8];
  const example = EXAMPLES[currentExample];
  const ffn = example.ffn || { inputDim: 256, hiddenDim: 1024, outputDim: 256, activation: 'ReLU' };
  const tokens = example.tokenization.bpe.slice(0, 4);

  const [activePhase, setActivePhase] = useState<AnimationPhase>('input');
  const [selectedToken, setSelectedToken] = useState(0);

  const phases: { id: AnimationPhase; label: string; description: string }[] = [
    { id: 'input', label: '输入向量', description: '每个Token的256维向量' },
    { id: 'expand', label: '维度扩展', description: `线性层放大到${ffn.hiddenDim}维` },
    { id: 'activate', label: '激活函数', description: `${ffn.activation}引入非线性` },
    { id: 'output', label: '输出向量', description: '线性层压缩回256维' },
  ];

  const currentPhaseIndex = phases.findIndex(p => p.id === activePhase);

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

      {/* 可视化主体 */}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl bg-cyber-bg-card rounded-2xl border border-gray-800 p-6">
          {/* Token选择器 */}
          <div className="flex justify-center gap-2 mb-6">
            {tokens.map((token, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedToken(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedToken === i
                    ? 'gradient-purple-cyan text-white'
                    : 'bg-cyber-bg-secondary text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {token}
              </motion.button>
            ))}
          </div>

          {depthMode === 'simple' ? (
            /* ===== 简单模式：扩展-激活-压缩流程 ===== */
            <div className="space-y-6">
              {/* 动画流程图 */}
              <div className="flex items-center justify-center gap-4 py-8">
                {/* 输入 */}
                <motion.div
                  className="flex flex-col items-center"
                  animate={{
                    scale: activePhase === 'input' ? 1.1 : 1,
                    opacity: currentPhaseIndex >= 0 ? 1 : 0.5
                  }}
                >
                  <div className="w-20 h-20 rounded-xl bg-cyber-accent-cyan/20 border-2 border-cyber-accent-cyan flex items-center justify-center mb-2">
                    <span className="text-cyber-accent-cyan text-2xl font-bold">256</span>
                  </div>
                  <span className="text-sm text-gray-400">输入维度</span>
                </motion.div>

                {/* 箭头1 */}
                <motion.div
                  animate={{ opacity: currentPhaseIndex >= 1 ? 1 : 0.3 }}
                  className="flex flex-col items-center"
                >
                  <svg width="60" height="24" className="text-cyber-accent-purple">
                    <motion.path
                      d="M 0 12 L 50 12 M 45 6 L 55 12 L 45 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: currentPhaseIndex >= 1 ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  <span className="text-xs text-cyber-accent-purple mt-1">×4扩展</span>
                </motion.div>

                {/* 隐藏层 */}
                <motion.div
                  className="flex flex-col items-center"
                  animate={{
                    scale: activePhase === 'expand' || activePhase === 'activate' ? 1.1 : 1,
                    opacity: currentPhaseIndex >= 1 ? 1 : 0.5
                  }}
                >
                  <div className="w-28 h-20 rounded-xl bg-cyber-accent-purple/20 border-2 border-cyber-accent-purple flex flex-col items-center justify-center mb-2">
                    <span className="text-cyber-accent-purple text-2xl font-bold">1024</span>
                    <span className="text-xs text-cyber-accent-purple/60">扩展后</span>
                  </div>
                  <span className="text-sm text-gray-400">隐藏层</span>
                </motion.div>

                {/* 激活函数 */}
                <motion.div
                  animate={{ opacity: currentPhaseIndex >= 2 ? 1 : 0.3 }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                    activePhase === 'activate' ? 'bg-cyber-accent-pink/30' : 'bg-cyber-accent-pink/10'
                  }`}>
                    <span className="text-cyber-accent-pink font-bold text-sm">{ffn.activation}</span>
                  </div>
                  <span className="text-xs text-gray-400">激活</span>
                </motion.div>

                {/* 箭头2 */}
                <motion.div
                  animate={{ opacity: currentPhaseIndex >= 3 ? 1 : 0.3 }}
                  className="flex flex-col items-center"
                >
                  <svg width="60" height="24" className="text-cyber-flow-green">
                    <motion.path
                      d="M 0 12 L 50 12 M 45 6 L 55 12 L 45 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: currentPhaseIndex >= 3 ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  <span className="text-xs text-cyber-flow-green mt-1">÷4压缩</span>
                </motion.div>

                {/* 输出 */}
                <motion.div
                  className="flex flex-col items-center"
                  animate={{
                    scale: activePhase === 'output' ? 1.1 : 1,
                    opacity: currentPhaseIndex >= 3 ? 1 : 0.5
                  }}
                >
                  <div className="w-20 h-20 rounded-xl bg-cyber-flow-green/20 border-2 border-cyber-flow-green flex items-center justify-center mb-2">
                    <span className="text-cyber-flow-green text-2xl font-bold">256</span>
                  </div>
                  <span className="text-sm text-gray-400">输出维度</span>
                </motion.div>
              </div>

              {/* 阶段控制 */}
              <div className="flex justify-center gap-2">
                {phases.map((phase) => (
                  <motion.button
                    key={phase.id}
                    onClick={() => setActivePhase(phase.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      activePhase === phase.id
                        ? 'gradient-purple-cyan text-white'
                        : 'bg-cyber-bg-secondary text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {phase.label}
                  </motion.button>
                ))}
              </div>

              {/* 阶段说明 */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-4"
                >
                  <p className="text-gray-300">
                    {activePhase === 'input' && (
                      <>
                        每个<HighlightTerm termId="token">Token</HighlightTerm>都有一个
                        <HighlightTerm termId="vector">256维向量</HighlightTerm>作为输入。
                        这些向量包含了词的语义信息。
                      </>
                    )}
                    {activePhase === 'expand' && (
                      <>
                        通过第一个线性层，维度从256扩展到1024。
                        这让网络有更多"空间"来学习和表达复杂特征。
                      </>
                    )}
                    {activePhase === 'activate' && (
                      <>
                        <HighlightTerm termId="activation">激活函数</HighlightTerm>
                        {ffn.activation === 'ReLU' ? (
                          <Tooltip termId="relu">ReLU</Tooltip>
                        ) : (
                          <Tooltip termId="gelu">GELU</Tooltip>
                        )}
                        为网络引入非线性，使其能学习更复杂的模式。
                      </>
                    )}
                    {activePhase === 'output' && (
                      <>
                        最后，维度从1024压缩回256，保持与输入相同的维度。
                        这样才能与<HighlightTerm termId="residual">残差连接</HighlightTerm>相加。
                      </>
                    )}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            /* ===== 详细模式：完整的神经网络可视化 ===== */
            <div className="space-y-6">
              {/* 网络结构SVG */}
              <div className="relative h-72 bg-cyber-bg-secondary rounded-xl border border-gray-700 overflow-hidden">
                <svg viewBox="0 0 700 250" className="w-full h-full">
                  {/* 背景网格 */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(102,126,234,0.1)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* 输入层神经元 */}
                  <motion.g>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.circle
                        key={`input-${i}`}
                        cx="80" cy={60 + i * 25}
                        r="8"
                        fill="#4facfe"
                        stroke="#4facfe"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: currentPhaseIndex >= 0 ? 1 : 0.3 }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                    <text x="80" y="230" textAnchor="middle" fill="#4facfe" fontSize="11" fontWeight="500">
                      输入层 ({ffn.inputDim}维)
                    </text>
                  </motion.g>

                  {/* 输入→隐藏层连线 */}
                  {currentPhaseIndex >= 1 && Array.from({ length: 6 }).map((_, i) =>
                    Array.from({ length: 10 }).map((_, j) => (
                      <motion.line
                        key={`line1-${i}-${j}`}
                        x1="88" y1={60 + i * 25}
                        x2="220" y2={30 + j * 20}
                        stroke="#667eea"
                        strokeWidth="0.5"
                        opacity="0.2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5 + (i * 10 + j) * 0.01, duration: 0.3 }}
                      />
                    ))
                  )}

                  {/* 隐藏层神经元 */}
                  <motion.g>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <motion.circle
                        key={`hidden-${i}`}
                        cx="230" cy={30 + i * 20}
                        r="6"
                        fill="#667eea"
                        stroke="#667eea"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: currentPhaseIndex >= 1 ? 1 : 0.3 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                      />
                    ))}
                    <text x="230" y="240" textAnchor="middle" fill="#667eea" fontSize="11" fontWeight="500">
                      隐藏层 ({ffn.hiddenDim}维)
                    </text>
                  </motion.g>

                  {/* 激活函数框 */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: currentPhaseIndex >= 2 ? 1 : 0.3 }}
                  >
                    <rect x="310" y="90" width="80" height="50" rx="10" fill="rgba(240,147,251,0.2)" stroke="#f093fb" strokeWidth="2"/>
                    <text x="350" y="120" textAnchor="middle" fill="#f093fb" fontSize="12" fontWeight="600">
                      {ffn.activation}
                    </text>
                    <text x="350" y="155" textAnchor="middle" fill="#f093fb" fontSize="10" opacity="0.7">
                      激活函数
                    </text>
                  </motion.g>

                  {/* 箭头：隐藏层→激活 */}
                  <motion.path
                    d="M 260 120 L 305 115"
                    stroke="#a0a0c0"
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: currentPhaseIndex >= 2 ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* 隐藏层→输出连线 */}
                  {currentPhaseIndex >= 3 && Array.from({ length: 10 }).map((_, i) =>
                    Array.from({ length: 6 }).map((_, j) => (
                      <motion.line
                        key={`line2-${i}-${j}`}
                        x1="400" y1={115}
                        x2="550" y2={60 + j * 25}
                        stroke="#43e97b"
                        strokeWidth="0.5"
                        opacity="0.2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5 + (i * 6 + j) * 0.01, duration: 0.3 }}
                      />
                    ))
                  )}

                  {/* 输出层神经元 */}
                  <motion.g>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.circle
                        key={`output-${i}`}
                        cx="560" cy={60 + i * 25}
                        r="8"
                        fill="#43e97b"
                        stroke="#43e97b"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: currentPhaseIndex >= 3 ? 1 : 0.3 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      />
                    ))}
                    <text x="560" y="230" textAnchor="middle" fill="#43e97b" fontSize="11" fontWeight="500">
                      输出层 ({ffn.outputDim}维)
                    </text>
                  </motion.g>

                  {/* 箭头标记 */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#a0a0c0" />
                    </marker>
                  </defs>

                  {/* 维度标注 */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <text x="155" y="140" textAnchor="middle" fill="#a0a0c0" fontSize="10">
                      W₁: {ffn.inputDim}×{ffn.hiddenDim}
                    </text>
                    <text x="480" y="140" textAnchor="middle" fill="#a0a0c0" fontSize="10">
                      W₂: {ffn.hiddenDim}×{ffn.outputDim}
                    </text>
                  </motion.g>
                </svg>

                {/* 当前Token指示器 */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-cyber-accent-cyan/20 text-cyber-accent-cyan text-sm font-medium">
                  处理: {tokens[selectedToken]}
                </div>
              </div>

              {/* 阶段控制 */}
              <div className="flex justify-center gap-2">
                {phases.map((phase) => (
                  <motion.button
                    key={phase.id}
                    onClick={() => setActivePhase(phase.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      activePhase === phase.id
                        ? 'gradient-purple-cyan text-white'
                        : 'bg-cyber-bg-secondary text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {phase.label}
                  </motion.button>
                ))}
              </div>

              {/* 数学公式 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-cyber-bg-secondary rounded-lg p-4 text-center"
              >
                <p className="text-sm text-gray-400 mb-2">
                  <HighlightTerm termId="ffn">FFN</HighlightTerm> 计算公式：
                </p>
                <p className="font-mono text-cyber-accent-cyan">
                  FFN(x) = <Tooltip termId="activation">{ffn.activation}</Tooltip>(xW₁ + b₁)W₂ + b₂
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  维度变化: {ffn.inputDim} → {ffn.hiddenDim} → {ffn.outputDim}
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* 详细说明 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-cyber-bg-card rounded-xl p-6 border border-gray-800"
      >
        {depthMode === 'simple' ? (
          <div className="space-y-4">
            <p className="text-gray-300 text-lg leading-relaxed">
              <HighlightTerm termId="ffn">前馈网络</HighlightTerm>就像一个"信息加工厂"，
              把每个<HighlightTerm termId="token">Token</HighlightTerm>单独处理。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-cyber-bg-secondary rounded-lg p-4">
                <div className="text-2xl mb-2">📥</div>
                <h4 className="text-cyber-accent-cyan font-medium mb-1">第一步：接收输入</h4>
                <p className="text-gray-400 text-sm">每个Token的256维向量作为输入</p>
              </div>
              <div className="bg-cyber-bg-secondary rounded-lg p-4">
                <div className="text-2xl mb-2">🔬</div>
                <h4 className="text-cyber-accent-purple font-medium mb-1">第二步：扩展处理</h4>
                <p className="text-gray-400 text-sm">维度放大4倍，增加表达能力</p>
              </div>
              <div className="bg-cyber-bg-secondary rounded-lg p-4">
                <div className="text-2xl mb-2">📤</div>
                <h4 className="text-cyber-flow-green font-medium mb-1">第三步：压缩输出</h4>
                <p className="text-gray-400 text-sm">压缩回256维，准备下一步</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-300">
              <HighlightTerm termId="ffn">Feed-Forward Network</HighlightTerm>是Transformer中
              每个<HighlightTerm termId="token">Token</HighlightTerm>独立经过的两层全连接网络。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-cyber-bg-secondary rounded-lg p-4">
                <h4 className="text-cyber-accent-purple font-medium mb-2 flex items-center gap-2">
                  <span>📐</span> 维度变化的意义
                </h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• 扩展维度：增加模型容量，学习更多特征组合</li>
                  <li>• 激活函数：引入非线性，突破线性变换的限制</li>
                  <li>• 压缩维度：保持输出与输入维度一致，便于残差连接</li>
                </ul>
              </div>
              <div className="bg-cyber-bg-secondary rounded-lg p-4">
                <h4 className="text-cyber-accent-cyan font-medium mb-2 flex items-center gap-2">
                  <span>⚡</span> 关键特点
                </h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• 每个Token独立处理（无Token间交互）</li>
                  <li>• 参数量：2×d×4d = 8d²（约占总参数的2/3）</li>
                  <li>• 常用激活：<Tooltip termId="gelu">GELU</Tooltip> 比 <Tooltip termId="relu">ReLU</Tooltip> 更平滑</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};