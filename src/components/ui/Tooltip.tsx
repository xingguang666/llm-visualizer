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
            } left-1/2 -translate-x-1/2 w-72 p-4 rounded-xl shadow-xl`}
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
          >
            {/* 箭头 */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45`}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderLeft: position === 'top' ? 'none' : `1px solid var(--border-color)`,
                borderRight: position === 'top' ? 'none' : `1px solid var(--border-color)`,
                borderTop: position === 'top' ? 'none' : `1px solid var(--border-color)`,
                borderBottom: position === 'top' ? `1px solid var(--border-color)` : 'none',
                [position === 'top' ? 'bottom' : 'top']: '-6px',
              }}
            />

            {/* 标题 */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--accent-cyan)' }}>
                {term.name}
              </span>
            </div>

            {/* 解释 */}
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              {depthMode === 'simple' ? term.shortExplain : term.detailExplain}
            </p>

            {/* 类比（如果有） */}
            {term.analogy && depthMode === 'simple' && (
              <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
                💡 {term.analogy}
              </p>
            )}

            {/* 详细模式下的类比 */}
            {term.analogy && depthMode === 'detailed' && (
              <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--border-color)' }}>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--accent-purple)' }}>类比：</span>
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
      <span
        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors cursor-help"
        style={{
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          color: 'var(--accent-purple)'
        }}
      >
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
      <span
        className={`font-medium transition-colors ${className}`}
        style={{ color: 'var(--accent-cyan)' }}
      >
        {children}
      </span>
    </Tooltip>
  );
};