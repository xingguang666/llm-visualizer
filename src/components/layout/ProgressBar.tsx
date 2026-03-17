import { motion } from 'framer-motion';
import { usePipelineStore, STEPS } from '../../stores';

export const ProgressBar: React.FC = () => {
  const { currentStep, goToStep } = usePipelineStore();
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="w-full px-4 py-4 bg-cyber-bg-secondary/50 backdrop-blur-sm">
      {/* 进度条 */}
      <div className="relative h-2 bg-cyber-bg-card rounded-full overflow-hidden mb-3">
        <motion.div
          className="absolute h-full gradient-purple-cyan-pink"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* 步骤指示器 */}
      <div className="flex justify-between items-center">
        {STEPS.map((step, index) => (
          <motion.button
            key={step.id}
            className={`flex flex-col items-center cursor-pointer group ${
              index === currentStep ? 'text-cyber-accent-cyan' : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => goToStep(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`w-3 h-3 rounded-full mb-1 transition-all ${
                index <= currentStep
                  ? 'gradient-purple-cyan'
                  : 'bg-gray-600'
              }`}
            />
            <span className="text-xs hidden md:block group-hover:text-cyber-accent-cyan transition-colors">
              {step.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* 当前步骤名称 */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mt-3 pb-2"
      >
        <span className="text-sm text-gray-400">
          步骤 {currentStep + 1} / {STEPS.length}：
        </span>
        <span className="text-sm text-white font-medium ml-1">
          {STEPS[currentStep].name}
        </span>
      </motion.div>
    </div>
  );
};