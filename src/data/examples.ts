import type { Example } from '../types';

export const EXAMPLES: Record<string, Example> = {
  'text-understanding': {
    id: 'text-understanding',
    name: '文本理解',
    description: '分析句子的情感倾向',
    icon: '📝',
    input: {
      text: '这家餐厅的服务非常好，食物也很美味！',
      type: 'sentiment-analysis',
    },
    tokenization: {
      character: ['这', '家', '餐', '厅', '的', '服', '务', '非', '常', '好', '，', '食', '物', '也', '很', '美', '味', '！'],
      bpe: ['这家', '餐厅', '的', '服务', '非常', '好', '，', '食物', '也', '很', '美味', '！'],
      byte: ['0xe8bf99', '0xe5aeb6', '0xe99c90', '0xe58e85', '0xe79a84'],
    },
    embeddings: {
      dimensions: 256,
      vectors: [
        { token: '这家', vector: { x: 0.23, y: 0.87 }, color: '#667eea' },
        { token: '餐厅', vector: { x: 0.45, y: 0.62 }, color: '#764ba2' },
        { token: '的', vector: { x: 0.12, y: 0.34 }, color: '#f093fb' },
        { token: '服务', vector: { x: 0.78, y: 0.45 }, color: '#4facfe' },
        { token: '非常', vector: { x: 0.56, y: 0.89 }, color: '#00f2fe' },
        { token: '好', vector: { x: 0.89, y: 0.23 }, color: '#43e97b' },
        { token: '食物', vector: { x: 0.34, y: 0.67 }, color: '#ffd700' },
        { token: '美味', vector: { x: 0.67, y: 0.78 }, color: '#ff6b35' },
      ],
    },
    attention: {
      heads: 8,
      weights: [
        [1.0, 0.8, 0.3, 0.2, 0.4, 0.6, 0.3, 0.5],
        [0.7, 1.0, 0.6, 0.4, 0.3, 0.5, 0.4, 0.6],
        [0.2, 0.5, 1.0, 0.3, 0.2, 0.4, 0.5, 0.3],
        [0.3, 0.4, 0.3, 1.0, 0.5, 0.7, 0.6, 0.4],
        [0.5, 0.3, 0.2, 0.6, 1.0, 0.4, 0.3, 0.5],
        [0.7, 0.5, 0.4, 0.8, 0.5, 1.0, 0.5, 0.7],
        [0.3, 0.4, 0.5, 0.7, 0.4, 0.5, 1.0, 0.8],
        [0.5, 0.6, 0.4, 0.5, 0.6, 0.8, 0.9, 1.0],
      ],
      highlights: [
        { from: '美味', to: '好', weight: 0.92 },
        { from: '服务', to: '好', weight: 0.88 },
        { from: '餐厅', to: '食物', weight: 0.75 },
      ],
    },
    output: {
      type: 'classification',
      predictions: [
        { label: '积极', probability: 0.89 },
        { label: '中性', probability: 0.08 },
        { label: '消极', probability: 0.03 },
      ],
    },
    simpleMode: {
      summary: '模型识别出这句话表达了积极的情感',
      keyPoints: [
        '分词将句子拆分成有意义的最小单元',
        '注意力机制发现"美味"和"好"关联最强',
        '最终判断为积极情感，置信度89%',
      ],
    },
  },

  'text-generation': {
    id: 'text-generation',
    name: '文本生成',
    description: '续写故事情节',
    icon: '✨',
    input: {
      text: '从前有一座山，山上有一座庙，',
      type: 'text-completion',
    },
    tokenization: {
      character: ['从', '前', '有', '一', '座', '山', '，', '山', '上', '有', '一', '座', '庙', '，'],
      bpe: ['从前', '有一座', '山', '，', '山上', '有一座', '庙', '，'],
      byte: ['0xe4bb8e', '0xe5898d', '0xe69c89'],
    },
    embeddings: {
      dimensions: 256,
      vectors: [
        { token: '从前', vector: { x: 0.12, y: 0.45 }, color: '#f093fb' },
        { token: '有一座', vector: { x: 0.67, y: 0.23 }, color: '#f5576c' },
        { token: '山', vector: { x: 0.34, y: 0.78 }, color: '#4facfe' },
        { token: '庙', vector: { x: 0.89, y: 0.56 }, color: '#43e97b' },
      ],
    },
    attention: {
      heads: 8,
      weights: [
        [1.0, 0.6, 0.4, 0.3],
        [0.5, 1.0, 0.7, 0.5],
        [0.4, 0.6, 1.0, 0.8],
        [0.3, 0.4, 0.7, 1.0],
      ],
      causalMask: true,
      highlights: [
        { from: '庙', to: '山', weight: 0.85 },
        { from: '庙', to: '从前', weight: 0.72 },
      ],
    },
    generation: {
      steps: [
        { token: '庙', prob: 0.45 },
        { token: '里', prob: 0.78 },
        { token: '住', prob: 0.67 },
        { token: '着', prob: 0.82 },
        { token: '一个', prob: 0.56 },
        { token: '老', prob: 0.91 },
        { token: '和尚', prob: 0.88 },
      ],
      finalText: '庙里住着一个老和尚',
    },
    output: {
      type: 'generation',
      generatedText: '庙里住着一个老和尚',
      topTokens: [
        { token: '庙', prob: 0.45 },
        { token: '里', prob: 0.25 },
        { token: '中', prob: 0.15 },
      ],
    },
    simpleMode: {
      summary: '模型根据上下文续写故事',
      keyPoints: [
        '模型理解了"山-庙"的空间关系',
        '根据常见故事模式预测下一个词',
        '逐步生成概率最高的词组合成句子',
      ],
    },
  },

  'knowledge-qa': {
    id: 'knowledge-qa',
    name: '知识问答',
    description: '回答事实性问题',
    icon: '🧠',
    input: {
      text: '问题：中国的首都是哪里？',
      type: 'question-answering',
    },
    tokenization: {
      character: ['问', '题', '：', '中', '国', '的', '首', '都', '是', '哪', '里', '？'],
      bpe: ['问题', '：', '中国', '的', '首都', '是', '哪里', '？'],
      byte: ['0xe997ae', '0xe9a298', '0xefbc9a'],
    },
    embeddings: {
      dimensions: 256,
      vectors: [
        { token: '问题', vector: { x: 0.89, y: 0.12 }, color: '#4facfe' },
        { token: '中国', vector: { x: 0.34, y: 0.78 }, color: '#00f2fe' },
        { token: '首都', vector: { x: 0.56, y: 0.45 }, color: '#43e97b' },
        { token: '哪里', vector: { x: 0.23, y: 0.67 }, color: '#ffd700' },
      ],
    },
    attention: {
      heads: 8,
      weights: [
        [1.0, 0.5, 0.8, 0.3],
        [0.4, 1.0, 0.9, 0.5],
        [0.7, 0.8, 1.0, 0.6],
        [0.3, 0.4, 0.5, 1.0],
      ],
      highlights: [
        { from: '首都', to: '中国', weight: 0.95 },
        { from: '哪里', to: '首都', weight: 0.88 },
      ],
    },
    output: {
      type: 'qa',
      answer: '北京',
      confidence: 0.97,
      relatedKnowledge: [
        { fact: '北京是中华人民共和国首都', source: '地理知识' },
        { fact: '北京位于华北平原北部', source: '地理知识' },
      ],
    },
    simpleMode: {
      summary: '模型从训练知识中检索答案',
      keyPoints: [
        '理解问题类型是"地点查询"',
        '注意"中国"和"首都"的关键关联',
        '从内部知识库检索出"北京"作为答案',
      ],
    },
  },
};

export const EXAMPLE_LIST = Object.values(EXAMPLES);