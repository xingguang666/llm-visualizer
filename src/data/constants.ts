// 术语解释库
export const TERMS: Record<string, { name: string; english: string; explanation: string; simpleExplanation: string }> = {
  tokenization: {
    name: '分词',
    english: 'Tokenization',
    explanation: '将文本分割成最小处理单元（Token），是NLP的第一步',
    simpleExplanation: '把句子切成小块，让计算机能处理',
  },
  embedding: {
    name: '词嵌入',
    english: 'Word Embedding',
    explanation: '将词转换为稠密向量表示，语义相近的词向量距离更近',
    simpleExplanation: '把词语变成数字，意思相近的数字也相近',
  },
  positionalEncoding: {
    name: '位置编码',
    english: 'Positional Encoding',
    explanation: '为序列注入位置信息，使模型能区分不同位置的词',
    simpleExplanation: '告诉模型每个词在句子中的位置',
  },
  query: {
    name: '查询向量',
    english: 'Query (Q)',
    explanation: '当前位置的"询问"表示，用于与其他位置计算关联',
    simpleExplanation: '当前词发出的"问题"',
  },
  key: {
    name: '键向量',
    english: 'Key (K)',
    explanation: '所有位置的"索引"表示，用于响应查询',
    simpleExplanation: '其他词的"标签"',
  },
  value: {
    name: '值向量',
    english: 'Value (V)',
    explanation: '实际携带信息的向量，通过注意力权重加权求和',
    simpleExplanation: '词的实际"内容"',
  },
  selfAttention: {
    name: '自注意力',
    english: 'Self-Attention',
    explanation: '序列内部元素间的关联计算，每个词关注所有词',
    simpleExplanation: '每个词看其他词，找关联',
  },
  multiHeadAttention: {
    name: '多头注意力',
    english: 'Multi-Head Attention',
    explanation: '并行多个注意力计算，捕获不同类型的关联',
    simpleExplanation: '用多个角度同时看，找不同关系',
  },
  residualConnection: {
    name: '残差连接',
    english: 'Residual Connection',
    explanation: '跳跃连接，将输入直接加到输出上，缓解梯度消失',
    simpleExplanation: '给信息一条"快车道"，防止丢失',
  },
  layerNorm: {
    name: '层归一化',
    english: 'Layer Normalization',
    explanation: '对每个样本的特征进行归一化，稳定训练',
    simpleExplanation: '把数字调到合适范围，让学习更稳定',
  },
  ffn: {
    name: '前馈网络',
    english: 'Feed Forward Network',
    explanation: '两层全连接网络，对每个位置独立进行非线性变换',
    simpleExplanation: '对每个词做进一步的"思考"',
  },
  maskedAttention: {
    name: '掩码注意力',
    english: 'Masked Attention',
    explanation: '在解码器中阻止看到未来信息，保证自回归生成',
    simpleExplanation: '只看已经出现的内容，不能"偷看"后面',
  },
  crossAttention: {
    name: '交叉注意力',
    english: 'Cross Attention',
    explanation: 'Encoder与Decoder之间的注意力，让解码器参考编码信息',
    simpleExplanation: '解码时回头看编码的内容',
  },
  softmax: {
    name: 'Softmax',
    english: 'Softmax',
    explanation: '将数值转换为概率分布，所有值之和为1',
    simpleExplanation: '把数字变成概率（百分比）',
  },
};

// 动画配置
export const ANIMATION_CONFIG = {
  speed: {
    slow: { duration: 1.5, stagger: 0.2 },
    medium: { duration: 1.0, stagger: 0.1 },
    fast: { duration: 0.5, stagger: 0.05 },
  },
  particle: {
    count: 50,
    size: { min: 2, max: 6 },
    opacity: { min: 0.3, max: 0.8 },
    glowIntensity: 0.6,
  },
  attention: {
    lineWidth: 2,
    glowBlur: 10,
    pulseDuration: 0.8,
  },
  easings: {
    smooth: 'power2.inOut',
    bounce: 'back.out(1.7)',
    flow: 'sine.inOut',
  },
};

// 深度模式配置
export const DEPTH_CONFIG = {
  simple: {
    showDimensions: false,
    showMathFormulas: false,
    showAttentionMatrix: false,
    showEmbeddingVectors: false,
    animationDetail: 'low',
    maxTokens: 8,
    showTechnicalTerms: false,
    explanatoryText: true,
    summaryOnly: true,
  },
  detailed: {
    showDimensions: true,
    showMathFormulas: true,
    showAttentionMatrix: true,
    showEmbeddingVectors: true,
    animationDetail: 'high',
    maxTokens: 20,
    showTechnicalTerms: true,
    explanatoryText: true,
    summaryOnly: false,
  },
} as const;

// 断点配置
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;