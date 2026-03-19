import { motion } from 'framer-motion';
import { useAppStore } from '../../stores';

export const DepthToggle: React.FC = () => {
  const { depthMode, setDepthMode } = useAppStore();

  return (
    <div className="flex items-center gap-2 rounded-lg p-1" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <motion.button
        className="px-4 py-2 rounded-md text-sm font-medium transition-all"
        style={{
          background: depthMode === 'simple' ? 'linear-gradient(to right, var(--accent-purple), var(--accent-cyan))' : 'transparent',
          color: depthMode === 'simple' ? '#ffffff' : 'var(--text-secondary)'
        }}
        onClick={() => setDepthMode('simple')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        简单模式
      </motion.button>

      <motion.button
        className="px-4 py-2 rounded-md text-sm font-medium transition-all"
        style={{
          background: depthMode === 'detailed' ? 'linear-gradient(to right, var(--accent-purple), var(--accent-cyan))' : 'transparent',
          color: depthMode === 'detailed' ? '#ffffff' : 'var(--text-secondary)'
        }}
        onClick={() => setDepthMode('detailed')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        详细模式
      </motion.button>
    </div>
  );
};