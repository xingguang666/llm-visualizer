import { create } from 'zustand';
import type { StepId } from '../types';

export const STEPS = [
  { id: 'architecture', name: '整体架构', description: 'Transformer架构全景图' },
  { id: 'input', name: '输入展示', description: '原始中文句子' },
  { id: 'tokenization', name: '分词对比', description: '三种分词方式对比' },
  { id: 'embedding', name: '词嵌入', description: '词向量生成过程' },
  { id: 'positional', name: '位置编码', description: '位置信息注入' },
  { id: 'attention', name: '自注意力', description: 'Q/K/V计算与注意力权重' },
  { id: 'multihead', name: '多头注意力', description: '多头并行概念图' },
  { id: 'residual', name: '残差连接', description: '残差连接与归一化' },
  { id: 'ffn', name: '前馈网络', description: 'FFN维度变化' },
  { id: 'decoder-mask', name: 'Decoder掩码', description: 'Masked Self-Attention' },
  { id: 'cross-attention', name: '交叉注意力', description: 'Encoder-Decoder交互' },
  { id: 'output', name: '输出预测', description: '概率分布与最终结果' },
] as const;

interface PipelineState {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;

  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  play: () => void;
  pause: () => void;
  getCurrentStepId: () => StepId;
}

export const usePipelineStore = create<PipelineState>((set, get) => ({
  currentStep: 0,
  totalSteps: STEPS.length,
  isPlaying: false,

  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1)
  })),

  prevStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0)
  })),

  goToStep: (step) => set({
    currentStep: Math.max(0, Math.min(step, get().totalSteps - 1))
  }),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  getCurrentStepId: () => STEPS[get().currentStep].id as StepId,
}));