import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTerm } from '../../data/terms';
import { useAppStore } from '../../stores';

interface TooltipProps {
  termId: string;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ termId, children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { depthMode } = useAppStore();

  const term = getTerm(termId);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipHeight = tooltipRef.current.offsetHeight;

      if (triggerRect.top < tooltipHeight + 10) {
        setPosition('bottom');
      } else {
        setPosition('top');
      }
    }
  }, [isVisible]);

  if (!term) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {/* 触发元素 */}
      <span className="border-b border-dashed border-cyber-accent-cyan/50 cursor-help">
        {children}
      </span>

      {/* 提示框 */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: position === 'top' ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === 'top' ? 10 : -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 ${
              position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
            } left-1/2 -translate-x-1/2 w-72 p-4 rounded-xl bg-cyber-bg-card border border-gray-700 shadow-xl`}
          >
            {/* 箭头 */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-cyber-bg-card border-${
                position === 'top' ? 'bottom' : 'top'
              } border-gray-700`}
              style={{
                [position === 'top' ? 'bottom' : 'top']: '-6px',
                [position === 'top' ? 'border-b' : 'border-t']: 'none',
                [position === 'top' ? 'border-r' : 'border-l']: 'none',
                [position === 'top' ? 'border-l' : 'border-r']: 'none',
              }}
            />

            {/* 标题 */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-cyber-accent-cyan">
                {term.name}
              </span>
            </div>

            {/* 解释 */}
            <p className="text-sm text-gray-300 mb-2">
              {depthMode === 'simple' ? term.shortExplain : term.detailExplain}
            </p>

            {/* 类比（如果有） */}
            {term.analogy && depthMode === 'simple' && (
              <p className="text-xs text-gray-500 italic">
                💡 {term.analogy}
              </p>
            )}

            {/* 详细模式下的类比 */}
            {term.analogy && depthMode === 'detailed' && (
              <div className="mt-2 pt-2 border-t border-gray-700">
                <p className="text-xs text-gray-400">
                  <span className="text-cyber-accent-purple">类比：</span>
                  {term.analogy}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

// 可点击的术语标签组件
interface TermBadgeProps {
  termId: string;
  showIcon?: boolean;
}

export const TermBadge: React.FC<TermBadgeProps> = ({ termId, showIcon = true }) => {
  const term = getTerm(termId);

  if (!term) return null;

  return (
    <Tooltip termId={termId}>
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-cyber-accent-purple/10 text-cyber-accent-purple text-xs font-medium hover:bg-cyber-accent-purple/20 transition-colors cursor-help">
        {showIcon && <span>📚</span>}
        {term.name.split(' ')[0]}
      </span>
    </Tooltip>
  );
};

// 高亮术语组件
interface HighlightTermProps {
  termId: string;
  children: React.ReactNode;
  className?: string;
}

export const HighlightTerm: React.FC<HighlightTermProps> = ({ termId, children, className = '' }) => {
  return (
    <Tooltip termId={termId}>
      <span className={`text-cyber-accent-cyan font-medium hover:text-cyber-accent-purple transition-colors ${className}`}>
        {children}
      </span>
    </Tooltip>
  );
};