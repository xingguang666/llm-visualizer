# LLM 架构可视化

交互式可视化网站，展示中文语句在大语言模型（LLM）中的完整处理流水线，帮助普通大众和开发者理解深度学习模型的核心机制。

在线演示：[https://xingguang666.github.io/llm-visualizer](https://xingguang666.github.io/llm-visualizer)

## 功能特性

- **12步可视化流程**：从输入到输出的完整 LLM 处理流水线
  - 整体架构展示
  - 输入展示
  - 分词对比（字符级/BPE/字节级）
  - Embedding 词向量
  - 位置编码
  - Self-Attention 自注意力机制
  - 多头注意力
  - 残差连接与 LayerNorm
  - 前馈网络（FFN）
  - Decoder 掩码
  - 交叉注意力
  - 输出预测

- **双深度模式**
  - 简单模式：适合初学者，展示核心概念
  - 详细模式：展示技术细节和数学公式

- **交互特性**
  - 键盘导航（← → 切换步骤，空格播放/暂停）
  - 点击进度条跳转任意步骤
  - 自动播放模式
  - 交互式术语提示

- **预设示例场景**
  - 文本理解：情感分析演示
  - 文本生成：故事续写演示
  - 知识问答：事实性问题回答

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **TailwindCSS** - 样式框架
- **Framer Motion** - 动画库
- **Zustand** - 状态管理

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看效果。

### 生产构建

```bash
npm run build
```

构建产物位于 `dist/` 目录。

## 项目结构

```
llm-visualizer/
├── src/
│   ├── components/
│   │   ├── effects/        # 粒子动画效果
│   │   ├── layout/         # 布局组件（Header/ProgressBar/ControlPanel）
│   │   ├── ui/             # UI 组件（Tooltip/DepthToggle）
│   │   └── visualization/  # 12个可视化步骤组件
│   ├── data/               # 示例数据和术语库
│   ├── stores/             # Zustand 状态管理
│   └── types/              # TypeScript 类型定义
├── public/                 # 静态资源
└── index.html
```

## 操作指南

| 操作 | 说明 |
|------|------|
| ← → 键 | 切换上一步/下一步 |
| 空格键 | 播放/暂停自动演示 |
| 点击进度条 | 跳转到指定步骤 |
| 点击高亮术语 | 查看术语解释 |

## 预览截图

<!-- 可以添加截图 -->
项目采用赛博朋克风格设计，配合粒子动画背景，提供沉浸式的学习体验。

## 参考资源

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) - Transformer 原始论文
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) - 可视化教程
- [BertViz](https://github.com/jessevig/bertviz) - 注意力可视化工具

## License

MIT