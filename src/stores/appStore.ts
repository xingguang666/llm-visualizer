import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DepthMode, AnimationSpeed } from '../types';

interface AppState {
  // 模式
  depthMode: DepthMode;
  setDepthMode: (mode: DepthMode) => void;

  // 当前示例
  currentExample: string;
  setCurrentExample: (id: string) => void;

  // 音效
  soundEnabled: boolean;
  toggleSound: () => void;

  // 速度
  animationSpeed: AnimationSpeed;
  setAnimationSpeed: (speed: AnimationSpeed) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      depthMode: 'simple',
      setDepthMode: (mode) => set({ depthMode: mode }),

      currentExample: 'text-understanding',
      setCurrentExample: (id) => set({ currentExample: id }),

      soundEnabled: true,
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      animationSpeed: 'medium',
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
    }),
    { name: 'llm-visualizer-settings' }
  )
);