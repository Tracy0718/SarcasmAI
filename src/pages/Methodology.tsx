import { Database, Filter, Layers, Brain, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const steps = [
  {
    icon: Database,
    title: "Data Collection",
    description: "We collected a dataset of 26,709 samples from multiple sources including Twitter, Reddit, and news headlines. The dataset is balanced with sarcastic and non-sarcastic examples.",
    details: [
      "Twitter sarcasm dataset",
      "Reddit comments",
      "News headlines",
      "Balanced class distribution",
    ],
  },
  {
    icon: Filter,
    title: "Text Preprocessing",
    description: "Raw text undergoes extensive preprocessing to remove noise and standardize the input format for optimal model performance.",
    details: [
      "Lowercasing and tokenization",
      "Special character removal",
      "Stop word handling",
      "Sequence padding",
    ],
  },
  {
    icon: Layers,
    title: "Word Embeddings",
    description: "We use pre-trained Word2Vec embeddings to convert text into dense vector representations that capture semantic meaning.",
    details: [
      "300-dimensional vectors",
      "Pre-trained on large corpus",
      "Semantic relationship capture",
      "Out-of-vocabulary handling",
    ],
  },
  {
    icon: Brain,
    title: "BiLSTM Architecture",
    description: "The Bidirectional LSTM processes sequences in both forward and backward directions, capturing context from both sides of each word.",
    details: [
      "128 LSTM units per direction",
      "Bidirectional context",
      "Dropout regularization",
      "Dense classification layer",
    ],
  },
  {
    icon: CheckCircle2,
    title: "Classification",
    description: "The final dense layer with sigmoid activation outputs a probability score indicating whether the text is sarcastic.",
    details: [
      "Binary classification",
      "Sigmoid activation",
      "Threshold optimization",
      "Confidence scoring",
    ],
  },
];

export default function Methodology() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Methodology"
            title="How Our Model Works"
            description="A comprehensive overview of our sarcasm detection pipeline, from data collection to final classification."
            className="mb-16"
          />
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step Number Circle */}
                  <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground -translate-x-1/2 z-10 hidden md:flex">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 md:pr-16">
                    <div
                      className={`bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors ${
                        index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="md:hidden w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-6">{step.description}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Architecture"
            title="System Architecture Flowchart"
            description="Visual representation of our complete sarcasm detection pipeline."
            className="mb-12"
          />

          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8">
              {/* Flowchart */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
                {[
                  { label: "Raw Text Input", color: "bg-secondary" },
                  { label: "Preprocessing", color: "bg-secondary" },
                  { label: "Word Embeddings", color: "bg-accent/20" },
                  { label: "BiLSTM Layer", color: "bg-gradient-primary" },
                  { label: "Dense Layer", color: "bg-secondary" },
                  { label: "Output", color: "bg-success/20" },
                ].map((block, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-4">
                    <div
                      className={`px-4 py-3 ${block.color} rounded-lg text-center min-w-[120px]`}
                    >
                      <span className="text-sm font-medium">{block.label}</span>
                    </div>
                    {i < 5 && (
                      <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="text-sm font-semibold mb-4">Layer Details</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">Input:</span> Sequence of tokens (max 100)
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Embedding:</span> 300-dim Word2Vec
                  </div>
                  <div>
                    <span className="font-medium text-foreground">BiLSTM:</span> 128 units × 2 directions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Preprocessing Pipeline</h3>
              <div className="space-y-4 font-mono text-sm">
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <span className="text-muted-foreground">1.</span> text.lower()
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <span className="text-muted-foreground">2.</span> remove_special_chars(text)
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <span className="text-muted-foreground">3.</span> tokenize(text)
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <span className="text-muted-foreground">4.</span> pad_sequences(tokens, maxlen=100)
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Hyperparameters</h3>
              <div className="space-y-3">
                {[
                  { param: "Batch Size", value: "64" },
                  { param: "Learning Rate", value: "0.001" },
                  { param: "Epochs", value: "20" },
                  { param: "Dropout Rate", value: "0.3" },
                  { param: "Optimizer", value: "Adam" },
                  { param: "Loss Function", value: "Binary Cross-Entropy" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between p-3 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">{item.param}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
