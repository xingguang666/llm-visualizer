import { motion } from 'framer-motion';
import { useAppStore } from '../../stores';

export const DepthToggle: React.FC = () => {
  const { depthMode, setDepthMode } = useAppStore();

  return (
    <div className="flex items-center gap-2 bg-cyber-bg-secondary rounded-lg p-1">
      <motion.button
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          depthMode === 'simple'
            ? 'gradient-purple-cyan text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setDepthMode('simple')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        简单模式
      </motion.button>

      <motion.button
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          depthMode === 'detailed'
            ? 'gradient-purple-cyan text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setDepthMode('detailed')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        详细模式
      </motion.button>
    </div>
  );
};