import { motion } from 'framer-motion';
import { usePipelineStore, STEPS } from '../../stores';

export const ProgressBar: React.FC = () => {
  const { currentStep, goToStep } = usePipelineStore();
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="w-full px-4 py-4 backdrop-blur-sm" style={{ backgroundColor: 'var(--glass-bg)' }}>
      {/* 进度条 */}
      <div className="relative h-2 rounded-full overflow-hidden mb-3" style={{ backgroundColor: 'var(--bg-card)' }}>
        <motion.div
          className="absolute h-full"
          style={{ background: 'linear-gradient(to right, var(--accent-purple), var(--accent-cyan), var(--accent-pink))' }}
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
            className="flex flex-col items-center cursor-pointer group"
            style={{ color: index === currentStep ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}
            onClick={() => goToStep(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="w-3 h-3 rounded-full mb-1 transition-all"
              style={{
                background: index <= currentStep
                  ? 'linear-gradient(to right, var(--accent-purple), var(--accent-cyan))'
                  : 'var(--text-secondary)'
              }}
            />
            <span className="text-xs hidden md:block transition-colors" style={{ color: 'var(--text-secondary)' }}>
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
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          步骤 {currentStep + 1} / {STEPS.length}：
        </span>
        <span className="text-sm font-medium ml-1" style={{ color: 'var(--text-primary)' }}>
          {STEPS[currentStep].name}
        </span>
      </motion.div>
    </div>
  );
};