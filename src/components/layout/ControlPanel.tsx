import { motion } from 'framer-motion';
import { usePipelineStore, useAppStore, STEPS } from '../../stores';
import { EXAMPLE_LIST } from '../../data';
import { useState } from 'react';

export const ControlPanel: React.FC = () => {
  const { currentStep, nextStep, prevStep, isPlaying, play, pause } = usePipelineStore();
  const { currentExample, setCurrentExample, soundEnabled, toggleSound, animationSpeed, setAnimationSpeed } = useAppStore();
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) pause();
    else play();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md px-4 py-3 z-50" style={{ backgroundColor: 'var(--glass-bg)', borderTop: '1px solid var(--border-color)' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* 示例选择 */}
        <div className="flex items-center gap-2">
          <span className="text-sm hidden sm:block" style={{ color: 'var(--text-secondary)' }}>示例：</span>
          <select
            value={currentExample}
            onChange={(e) => setCurrentExample(e.target.value)}
            className="text-sm rounded-lg px-3 py-2 focus:outline-none"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)'
            }}
          >
            {EXAMPLE_LIST.map((example) => (
              <option key={example.id} value={example.id}>
                {example.icon} {example.name}
              </option>
            ))}
          </select>
        </div>

        {/* 播放控制 */}
        <div className="flex items-center gap-2">
          <motion.button
            className="p-2 rounded-lg disabled:opacity-50"
            style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
            onClick={prevStep}
            disabled={currentStep === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            className="p-3 rounded-lg text-white"
            style={{ background: 'linear-gradient(to right, var(--accent-purple), var(--accent-cyan))' }}
            onClick={handlePlayPause}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>

          <motion.button
            className="p-2 rounded-lg disabled:opacity-50"
            style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
            onClick={nextStep}
            disabled={currentStep === STEPS.length - 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* 速度和音效控制 */}
        <div className="flex items-center gap-2">
          {/* 速度选择 */}
          <div className="relative">
            <motion.button
              className="p-2 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              whileHover={{ scale: 1.05 }}
            >
              {animationSpeed === 'slow' ? '慢' : animationSpeed === 'medium' ? '中' : '快'}
            </motion.button>
            {showSpeedMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full mb-2 left-0 rounded-lg shadow-lg overflow-hidden"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                {['slow', 'medium', 'fast'].map((speed) => (
                  <button
                    key={speed}
                    className="block w-full px-4 py-2 text-sm text-left"
                    style={{
                      color: animationSpeed === speed ? 'var(--accent-cyan)' : 'var(--text-primary)'
                    }}
                    onClick={() => {
                      setAnimationSpeed(speed as 'slow' | 'medium' | 'fast');
                      setShowSpeedMenu(false);
                    }}
                  >
                    {speed === 'slow' ? '慢速' : speed === 'medium' ? '中速' : '快速'}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* 音效开关 */}
          <motion.button
            className="p-2 rounded-lg"
            style={{
              backgroundColor: soundEnabled ? 'rgba(79, 172, 254, 0.2)' : 'var(--bg-card)',
              color: soundEnabled ? 'var(--accent-cyan)' : 'var(--text-secondary)'
            }}
            onClick={toggleSound}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {soundEnabled ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};