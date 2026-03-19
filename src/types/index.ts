// 流水线步骤类型
export type StepId =
  | 'architecture'
  | 'input'
  | 'tokenization'
  | 'embedding'
  | 'positional'
  | 'attention'
  | 'multihead'
  | 'residual'
  | 'ffn'
  | 'decoder-mask'
  | 'cross-attention'
  | 'output';

export interface Step {
  id: StepId;
  name: string;
  description: string;
  simpleDescription: string;
}

// Token类型
export interface Token {
  text: string;
  id: number;
  color: string;
}

// 向量类型
export interface Vector2D {
  x: number;
  y: number;
}

export interface TokenVector {
  token: string;
  vector: Vector2D;
  color: string;
}

// 注意力类型
export interface AttentionHighlight {
  from: string;
  to: string;
  weight: number;
}

export interface AttentionData {
  heads: number;
  weights: number[][];
  causalMask?: boolean;
  highlights: AttentionHighlight[];
}

// 输出类型
export type OutputType = 'classification' | 'generation' | 'qa';

export interface Prediction {
  label: string;
  probability: number;
}

export interface TokenProbability {
  token: string;
  prob: number;
}

export interface KnowledgeFact {
  fact: string;
  source: string;
}

// 示例数据类型
export interface Example {
  id: string;
  name: string;
  description: string;
  icon: string;
  input: {
    text: string;
    type: string;
  };
  tokenization: {
    character: string[];
    bpe: string[];
    byte: string[];
  };
  embeddings: {
    dimensions: number;
    vectors: TokenVector[];
  };
  attention: AttentionData;
  ffn?: {
    inputDim: number;
    hiddenDim: number;
    outputDim: number;
    activation: string;
  };
  generation?: {
    steps: TokenProbability[];
    finalText: string;
  };
  output: {
    type: OutputType;
    predictions?: Prediction[];
    generatedText?: string;
    topTokens?: TokenProbability[];
    answer?: string;
    confidence?: number;
    relatedKnowledge?: KnowledgeFact[];
  };
  simpleMode: {
    summary: string;
    keyPoints: string[];
  };
}

// 深度模式
export type DepthMode = 'simple' | 'detailed';

// 动画速度
export type AnimationSpeed = 'slow' | 'medium' | 'fast';

// 主题模式
export type Theme = 'dark' | 'light';

// 设备类型
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'wide';