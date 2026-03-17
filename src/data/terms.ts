// 技术术语解释数据
export interface Term {
  id: string;
  name: string;
  shortExplain: string;  // 简单模式解释
  detailExplain: string; // 详细模式解释
  analogy?: string;      // 类比解释
}

export const TERMS: Record<string, Term> = {
  // 分词相关
  'tokenization': {
    id: 'tokenization',
    name: '分词 (Tokenization)',
    shortExplain: '把句子切成有意义的小块',
    detailExplain: '将连续文本转换为离散的Token序列，是NLP的第一步。Token可以是字符、子词或词。',
    analogy: '就像把一句话切成积木块，每块都有自己的编号。'
  },
  'token': {
    id: 'token',
    name: 'Token',
    shortExplain: '文本的最小处理单位',
    detailExplain: 'Token是模型处理文本的基本单元，通常是一个子词或词。模型通过Token ID来识别和处理。',
    analogy: '就像句子里的"词语积木"。'
  },
  'bpe': {
    id: 'bpe',
    name: 'BPE (字节对编码)',
    shortExplain: '常用子词切分算法',
    detailExplain: 'Byte Pair Encoding，通过迭代合并最常见的字节对来构建词表，平衡词表大小和序列长度。',
    analogy: '就像把"餐厅"合并成一个词，因为它们经常一起出现。'
  },

  // Embedding相关
  'embedding': {
    id: 'embedding',
    name: '词嵌入 (Embedding)',
    shortExplain: '把词语变成数字向量',
    detailExplain: '将离散的Token映射到连续的高维向量空间，使语义相近的词在向量空间中距离较近。',
    analogy: '就像给每个词一个"身份证号码"，但这个号码是一串数字组成的坐标。'
  },
  'vector': {
    id: 'vector',
    name: '向量 (Vector)',
    shortExplain: '一串数字，表示词语的特征',
    detailExplain: '高维空间中的点，每个维度代表一个特征。词向量可以捕捉语义关系。',
    analogy: '就像一个词语的"指纹"，相似词语的指纹也相似。'
  },

  // 位置编码相关
  'positional-encoding': {
    id: 'positional-encoding',
    name: '位置编码',
    shortExplain: '告诉模型词语在句子中的位置',
    detailExplain: '使用正弦和余弦函数生成位置向量，让模型能够区分不同位置的相同词语。',
    analogy: '就像给每个词语发一个"座位号"，让模型知道它们在哪里。'
  },

  // Attention相关
  'attention': {
    id: 'attention',
    name: '注意力机制 (Attention)',
    shortExplain: '让模型知道哪些词更重要',
    detailExplain: '通过计算Query和Key的相似度来确定每个Token对其他Token的关注程度。',
    analogy: '就像读书时用荧光笔标重点，告诉模型哪些词要重点看。'
  },
  'self-attention': {
    id: 'self-attention',
    name: '自注意力 (Self-Attention)',
    shortExplain: '每个词都看其他所有词',
    detailExplain: '在同一个序列内计算注意力，每个Token都能与序列中的其他Token交互。',
    analogy: '就像开会时每个人都听其他所有人的发言，然后决定关注谁。'
  },
  'query': {
    id: 'query',
    name: 'Query (查询向量)',
    shortExplain: '"我想找什么"',
    detailExplain: 'Query向量代表当前Token想要查询的信息，用于与Key计算相似度。',
    analogy: '就像你在图书馆找书时的"搜索关键词"。'
  },
  'key': {
    id: 'key',
    name: 'Key (键向量)',
    shortExplain: '"我是什么"',
    detailExplain: 'Key向量代表每个Token可以被查询到的特征，用于与Query匹配。',
    analogy: '就像书上贴的"标签"，让人能找到它。'
  },
  'value': {
    id: 'value',
    name: 'Value (值向量)',
    shortExplain: '"我携带的信息"',
    detailExplain: 'Value向量包含Token的实际内容信息，最终输出是根据注意力权重对Value的加权求和。',
    analogy: '就像书里的"内容"，你找到了书就能读到内容。'
  },
  'softmax': {
    id: 'softmax',
    name: 'Softmax',
    shortExplain: '把分数变成概率',
    detailExplain: '将任意实数转换为概率分布，所有输出值在0-1之间且和为1。',
    analogy: '就像把一堆分数按比例转换成百分比。'
  },

  // 多头注意力相关
  'multi-head': {
    id: 'multi-head',
    name: '多头注意力',
    shortExplain: '从多个角度看问题',
    detailExplain: '并行运行多个独立的注意力头，每个头学习不同的注意力模式，最后合并结果。',
    analogy: '就像用多个放大镜同时观察，有的看颜色，有的看形状，有的看大小。'
  },

  // 残差连接相关
  'residual': {
    id: 'residual',
    name: '残差连接 (Residual)',
    shortExplain: '保留原始信息，加上新学到的',
    detailExplain: '将层的输入直接加到输出上，帮助梯度流动，允许模型学习恒等映射。',
    analogy: '就像做菜时保留原料的味道，再加点调料。'
  },
  'layer-norm': {
    id: 'layer-norm',
    name: '层归一化 (Layer Norm)',
    shortExplain: '让数据更稳定',
    detailExplain: '对每个样本的所有特征进行归一化，使模型训练更稳定。',
    analogy: '就像把音量调到一个合适的水平，不会太大也不会太小。'
  },

  // FFN相关
  'ffn': {
    id: 'ffn',
    name: '前馈网络 (FFN)',
    shortExplain: '两层神经网络，增加表达能力',
    detailExplain: 'Feed-Forward Network，对每个Token独立应用的两层全连接网络，通常先扩展维度再压缩回来。',
    analogy: '就像一个"信息加工厂"，把输入放大处理后再压缩输出。'
  },
  'activation': {
    id: 'activation',
    name: '激活函数',
    shortExplain: '让网络能学习复杂模式',
    detailExplain: '引入非线性，使神经网络能够学习复杂的非线性关系。常用的有ReLU、GELU等。',
    analogy: '就像一个开关，决定信息是否通过。'
  },
  'relu': {
    id: 'relu',
    name: 'ReLU',
    shortExplain: '最常用的激活函数',
    detailExplain: 'Rectified Linear Unit，输入为正时输出等于输入，为负时输出0。简单高效。',
    analogy: '就像一个只让正数通过的"过滤器"。'
  },
  'gelu': {
    id: 'gelu',
    name: 'GELU',
    shortExplain: '更平滑的激活函数',
    detailExplain: 'Gaussian Error Linear Unit，比ReLU更平滑，在Transformer中更常用。',
    analogy: '就像一个"软开关"，不是完全关闭，而是逐渐过渡。'
  },

  // Decoder相关
  'decoder': {
    id: 'decoder',
    name: '解码器 (Decoder)',
    shortExplain: '生成输出的部分',
    detailExplain: 'Transformer的解码部分，接收Encoder的输出，自回归地生成目标序列。',
    analogy: '就像翻译官，看懂原文后一句句翻译出来。'
  },
  'causal-mask': {
    id: 'causal-mask',
    name: '因果掩码',
    shortExplain: '只看过去，不看未来',
    detailExplain: '在自注意力中屏蔽未来位置的Token，保证模型只能看到当前位置之前的信息。',
    analogy: '就像考试时不能偷看后面的答案。'
  },

  // 交叉注意力相关
  'cross-attention': {
    id: 'cross-attention',
    name: '交叉注意力',
    shortExplain: '解码器看向编码器',
    detailExplain: 'Decoder中的注意力机制，Query来自Decoder，Key和Value来自Encoder。',
    analogy: '就像翻译时一边看原文，一边写出译文。'
  },

  // 输出相关
  'logits': {
    id: 'logits',
    name: 'Logits',
    shortExplain: '未归一化的预测分数',
    detailExplain: '模型输出的原始分数向量，经过Softmax后变成概率分布。',
    analogy: '就像投票前的"票数"，还没转换成百分比。'
  },
  'probability': {
    id: 'probability',
    name: '概率分布',
    shortExplain: '每个选项的可能性',
    detailExplain: '所有可能输出Token的概率，和为1。模型选择概率最高的Token作为预测。',
    analogy: '就像天气预报说"明天80%可能下雨"。'
  },
  'top-k': {
    id: 'top-k',
    name: 'Top-K采样',
    shortExplain: '从概率最高的K个中选',
    detailExplain: '只考虑概率最高的K个Token进行采样，平衡多样性和质量。',
    analogy: '就像考试时只从最好的几个答案中选一个。'
  },
  'temperature': {
    id: 'temperature',
    name: '温度 (Temperature)',
    shortExplain: '控制输出的随机性',
    detailExplain: '调节概率分布的平滑程度。高温使分布更均匀，低温使分布更尖锐。',
    analogy: '就像调节"创意旋钮"，高温更有创意，低温更保守。'
  },
};

// 获取术语解释
export const getTerm = (id: string): Term | undefined => TERMS[id];

// 获取简单模式解释
export const getShortExplain = (id: string): string => TERMS[id]?.shortExplain || id;

// 获取详细模式解释
export const getDetailExplain = (id: string): string => TERMS[id]?.detailExplain || id;