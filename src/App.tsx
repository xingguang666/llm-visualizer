import { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { ProgressBar } from './components/layout/ProgressBar';
import { ControlPanel } from './components/layout/ControlPanel';
import { PipelineContainer } from './components/visualization/PipelineContainer';
import { ParticleSystem } from './components/effects/ParticleSystem';
import { usePipelineStore } from './stores';

function App() {
  const { isPlaying, nextStep, currentStep, totalSteps } = usePipelineStore();

  // 自动播放
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        if (currentStep < totalSteps - 1) {
          nextStep();
        }
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, currentStep, totalSteps, nextStep]);

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { prevStep, nextStep, play, pause, isPlaying } = usePipelineStore.getState();

      switch (e.key) {
        case 'ArrowLeft':
          prevStep();
          break;
        case 'ArrowRight':
          nextStep();
          break;
        case ' ':
          e.preventDefault();
          if (isPlaying) pause();
          else play();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-bg-primary text-white overflow-x-hidden flex flex-col">
      {/* 粒子背景 */}
      <ParticleSystem />

      {/* 头部 */}
      <Header />

      {/* 进度条 */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <ProgressBar />
      </div>

      {/* 主内容 - pt-52 留出足够空间给Header(64px) + ProgressBar(约140px) */}
      <main className="flex-1 pt-52 pb-24 px-4 overflow-y-auto">
        <PipelineContainer />
      </main>

      {/* 底部控制栏 */}
      <ControlPanel />
    </div>
  );
}

export default App;