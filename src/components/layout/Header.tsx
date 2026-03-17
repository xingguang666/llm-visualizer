import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DepthToggle } from '../ui/DepthToggle';

export const Header: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-cyber-bg-primary/90 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-purple-cyan-br flex items-center justify-center shrink-0">
              <span className="text-lg">🧠</span>
            </div>
            <div className="leading-tight">
              <h1 className="text-base font-bold text-white">LLM 架构可视化</h1>
              <p className="text-xs text-gray-400 hidden sm:block">理解大语言模型的工作原理</p>
            </div>
          </div>

          {/* 控制区 */}
          <div className="flex items-center gap-4">
            <DepthToggle />
            <motion.button
              className="p-2 rounded-lg bg-cyber-bg-card hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowHelp(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </header>

      {/* 帮助弹窗 */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cyber-bg-secondary rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-white mb-4">使用帮助</h2>

              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-cyber-accent-cyan font-medium mb-2">交互方式</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 点击<strong>下一步</strong>按钮逐步查看处理流程</li>
                    <li>• 点击<strong>进度条</strong>跳转到任意步骤</li>
                    <li>• 使用<strong>键盘左右箭头</strong>快速切换</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-cyber-accent-cyan font-medium mb-2">模式切换</h3>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>简单模式</strong>：适合初学者，展示核心概念</li>
                    <li>• <strong>详细模式</strong>：展示技术细节和数学公式</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-cyber-accent-cyan font-medium mb-2">示例场景</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 📝 <strong>文本理解</strong>：分析句子情感倾向</li>
                    <li>• ✨ <strong>文本生成</strong>：故事续写演示</li>
                    <li>• 🧠 <strong>知识问答</strong>：回答事实性问题</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-cyber-accent-cyan font-medium mb-2">快捷键</h3>
                  <ul className="text-sm space-y-1">
                    <li>• <kbd className="px-2 py-1 bg-cyber-bg-card rounded">←</kbd> <kbd className="px-2 py-1 bg-cyber-bg-card rounded">→</kbd> 切换步骤</li>
                    <li>• <kbd className="px-2 py-1 bg-cyber-bg-card rounded">空格</kbd> 播放/暂停</li>
                    <li>• <kbd className="px-2 py-1 bg-cyber-bg-card rounded">M</kbd> 切换音效</li>
                  </ul>
                </div>
              </div>

              <motion.button
                className="w-full mt-6 py-3 rounded-lg gradient-purple-cyan text-white font-medium"
                onClick={() => setShowHelp(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                知道了
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};