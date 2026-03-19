import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, STEPS } from '../../stores';
import { EXAMPLES } from '../../data';
import { Tooltip, HighlightTerm } from '../ui/Tooltip';

type TokenMethod = 'character' | 'bpe' | 'byte';

export const TokenizerView: React.FC = () => {
  const { currentExample, depthMode } = useAppStore();
  const step = STEPS[2];
  const example = EXAMPLES[currentExample];
  const [activeMethod, setActiveMethod] = useState<TokenMethod>('bpe');
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);

  const methods: { id: TokenMethod; name: string; description: string; detail: string; pros: string; cons: string }[] = [
    {
      id: 'character',
      name: '字符级',
      description: '按单个字符切分',
      detail: '每个字符作为一个Token，词表大小等于字符集大小',
      pros: '词表小，无未知词',
      cons: '序列很长，语义理解难'
    },
    {
      id: 'bpe',
      name: 'BPE',
      description: '字节对编码，常用子词算法',
      detail: '基于统计频率合并子词，平衡词表大小和序列长度',
      pros: '词表适中，能处理新词',
      cons: '需要训练词表'
    },
    {
      id: 'byte',
      name: '字节级',
      description: '转换为字节表示',
      detail: '将字符转换为字节序列，支持所有Unicode字符',
      pros: '支持所有语言，无未知词',
      cons: '序列最长，计算量大'
    },
  ];

  const tokens = example.tokenization[activeMethod];
  const displayTokens = tokens.slice(0, depthMode === 'simple' ? 10 : tokens.length);

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
          <HighlightTerm termId="tokenization">分词</HighlightTerm>
          是把句子切成有意义的小块（<HighlightTerm termId="token">Token</HighlightTerm>）的过程。
          每个Token会被分配一个唯一的ID，模型通过这些ID来理解和处理文本。
        </p>
      </motion.div>

      {/* 方法选择 */}
      <div className="flex justify-center gap-4">
        {methods.map((method) => (
          <motion.button
            key={method.id}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              activeMethod === method.id
                ? 'gradient-purple-cyan text-white'
                : ''
            }`}
            style={activeMethod !== method.id ? {
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)'
            } : {}}
            onClick={() => setActiveMethod(method.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Tooltip termId={method.id === 'character' ? 'tokenization' : method.id === 'bpe' ? 'bpe' : 'token'}>
              <span>{method.name}</span>
            </Tooltip>
          </motion.button>
        ))}
      </div>

      {/* 分词结果 */}
      <div className="flex justify-center">
        <motion.div
          key={activeMethod}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl rounded-2xl p-6"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
        >
          {/* 方法说明 */}
          <div className="mb-4 text-center">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {methods.find(m => m.id === activeMethod)?.description}
            </span>
          </div>

          {/* Tokens展示 */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <AnimatePresence mode="popLayout">
              {displayTokens.map((token, index) => (
                <motion.div
                  key={`${token}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.03 }}
                  className="relative"
                  onMouseEnter={() => setHoveredToken(index)}
                  onMouseLeave={() => setHoveredToken(null)}
                >
                  <motion.div
                    className="token"
                    animate={{ scale: hoveredToken === index ? 1.1 : 1 }}
                    style={{
                      background: `linear-gradient(135deg,
                        hsl(${(index * 30) % 360}, 70%, 50%),
                        hsl(${(index * 30 + 60) % 360}, 70%, 50%))`
                    }}
                  >
                    {token}
                  </motion.div>

                  {/* Token ID 提示 */}
                  <AnimatePresence>
                    {hoveredToken === index && depthMode === 'detailed' && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap"
                        style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent-cyan)' }}
                      >
                        ID: {1000 + index}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
            {tokens.length > displayTokens.length && (
              <span className="text-sm py-2" style={{ color: 'var(--text-secondary)' }}>... +{tokens.length - displayTokens.length} 个</span>
            )}
          </div>

          {/* 统计信息 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full gradient-purple-cyan"></div>
              <span style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent-cyan)' }} className="font-medium">{tokens.length}</span> 个Token
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent-pink)' }}></div>
              <span style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent-purple)' }} className="font-medium">{example.input.text.length}</span> 个字符
              </span>
            </div>
            {depthMode === 'detailed' && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--flow-green)' }}></div>
                <span style={{ color: 'var(--text-secondary)' }}>
                  压缩率: <span style={{ color: 'var(--flow-green)' }} className="font-medium">
                    {((1 - tokens.length / example.input.text.length) * 100).toFixed(1)}%
                  </span>
                </span>
              </div>
            )}
          </motion.div>

          {/* 方法优缺点（详细模式） */}
          {depthMode === 'detailed' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 pt-4"
              style={{ borderTop: '1px solid var(--border-color)' }}
            >
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(67, 233, 123, 0.1)' }}>
                  <span style={{ color: 'var(--flow-green)' }} className="font-medium">✓ 优点</span>
                  <p style={{ color: 'var(--text-secondary)' }} className="mt-1">{methods.find(m => m.id === activeMethod)?.pros}</p>
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)' }}>
                  <span style={{ color: 'var(--accent-orange)' }} className="font-medium">✗ 缺点</span>
                  <p style={{ color: 'var(--text-secondary)' }} className="mt-1">{methods.find(m => m.id === activeMethod)?.cons}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
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
          <div className="space-y-4">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              <HighlightTerm termId="bpe">BPE</HighlightTerm>
              是最常用的分词方法，它能把经常一起出现的字组合成一个Token。
              比如"餐厅"经常一起出现，就被合并成一个Token，这样模型能更好地理解词的语义。
            </p>
            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                💡 想一想：为什么"美味"在BPE中是一个Token，而不是"美"和"味"两个？
                因为它们经常一起表达"好吃"的意思，合并后模型更容易理解这个概念。
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p style={{ color: 'var(--text-primary)' }}>
              <HighlightTerm termId="tokenization">分词</HighlightTerm>
              是NLP的第一步，将连续文本转换为离散的Token序列。
              不同的分词策略会显著影响模型的性能和效率。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-medium mb-2 flex items-center gap-2" style={{ color: 'var(--accent-orange)' }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-orange)' }}></span>
                  字符级分词
                </h4>
                <p style={{ color: 'var(--text-secondary)' }}>词表小但序列长，适合处理未知词多的场景</p>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-medium mb-2 flex items-center gap-2" style={{ color: 'var(--accent-purple)' }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-purple)' }}></span>
                  BPE分词
                </h4>
                <p style={{ color: 'var(--text-secondary)' }}>基于频率合并子词，平衡词表大小和序列长度</p>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-medium mb-2 flex items-center gap-2" style={{ color: 'var(--accent-cyan)' }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-cyan)' }}></span>
                  字节级分词
                </h4>
                <p style={{ color: 'var(--text-secondary)' }}>支持所有Unicode字符，适合多语言场景</p>
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              📊 Token数量直接影响模型的计算量：注意力机制的计算复杂度是 O(n²)，
              所以Token越少，计算效率越高。
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};