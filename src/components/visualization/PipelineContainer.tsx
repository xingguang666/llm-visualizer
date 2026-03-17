import { motion } from 'framer-motion';
import { usePipelineStore } from '../../stores';
import { ArchitectureView } from './ArchitectureView';
import { InputView } from './InputView';
import { TokenizerView } from './TokenizerView';
import { EmbeddingView } from './EmbeddingView';
import { PositionalView } from './PositionalView';
import { AttentionView } from './AttentionView';
import { MultiHeadView } from './MultiHeadView';
import { ResidualView } from './ResidualView';
import { FFNView } from './FFNView';
import { DecoderMaskView } from './DecoderMaskView';
import { CrossAttentionView } from './CrossAttentionView';
import { OutputView } from './OutputView';

export const PipelineContainer: React.FC = () => {
  const { currentStep } = usePipelineStore();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ArchitectureView />;
      case 1:
        return <InputView />;
      case 2:
        return <TokenizerView />;
      case 3:
        return <EmbeddingView />;
      case 4:
        return <PositionalView />;
      case 5:
        return <AttentionView />;
      case 6:
        return <MultiHeadView />;
      case 7:
        return <ResidualView />;
      case 8:
        return <FFNView />;
      case 9:
        return <DecoderMaskView />;
      case 10:
        return <CrossAttentionView />;
      case 11:
        return <OutputView />;
      default:
        return <ArchitectureView />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {renderStep()}
      </motion.div>
    </div>
  );
};