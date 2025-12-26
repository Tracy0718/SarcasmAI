import { ArrowRight, ArrowLeft, Brain, Layers, Zap } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

export default function ModelArchitecture() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Model Architecture"
            title="BiLSTM Neural Network"
            description="Understanding the Bidirectional Long Short-Term Memory architecture that powers our sarcasm detection model."
            className="mb-16"
          />
        </div>
      </section>

      {/* LSTM Explanation */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">What is LSTM?</h2>
              <p className="text-muted-foreground mb-6">
                Long Short-Term Memory (LSTM) is a type of recurrent neural network (RNN) 
                architecture designed to learn long-term dependencies in sequential data. 
                Unlike standard RNNs, LSTMs can remember information for extended periods, 
                making them ideal for processing text.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Memory Cell</h4>
                    <p className="text-sm text-muted-foreground">
                      The core component that stores information over time steps.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Layers className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Gates</h4>
                    <p className="text-sm text-muted-foreground">
                      Forget, input, and output gates control information flow.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Gradient Flow</h4>
                    <p className="text-sm text-muted-foreground">
                      Prevents vanishing gradient problem during training.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* LSTM Cell Diagram */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-6 text-center">LSTM Cell Structure</h3>
              <div className="relative bg-secondary/30 rounded-xl p-6">
                <div className="flex flex-col gap-4">
                  {/* Input */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="px-4 py-2 bg-accent/20 border border-accent/30 rounded-lg text-sm">
                      x<sub>t</sub> (Input)
                    </div>
                    <div className="px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg text-sm">
                      h<sub>t-1</sub> (Hidden)
                    </div>
                  </div>

                  {/* Gates */}
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-destructive/20 border border-destructive/30 rounded-lg text-center">
                      <div className="text-xs font-semibold mb-1">Forget Gate</div>
                      <div className="text-xs text-muted-foreground">f<sub>t</sub></div>
                    </div>
                    <div className="p-3 bg-success/20 border border-success/30 rounded-lg text-center">
                      <div className="text-xs font-semibold mb-1">Input Gate</div>
                      <div className="text-xs text-muted-foreground">i<sub>t</sub></div>
                    </div>
                    <div className="p-3 bg-warning/20 border border-warning/30 rounded-lg text-center">
                      <div className="text-xs font-semibold mb-1">Output Gate</div>
                      <div className="text-xs text-muted-foreground">o<sub>t</sub></div>
                    </div>
                  </div>

                  {/* Cell State */}
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                  </div>

                  <div className="flex justify-center">
                    <div className="px-6 py-3 bg-gradient-primary rounded-lg text-white text-sm font-medium">
                      Cell State C<sub>t</sub>
                    </div>
                  </div>

                  {/* Output */}
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                  </div>

                  <div className="flex justify-center">
                    <div className="px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg text-sm">
                      h<sub>t</sub> (Output)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why BiLSTM */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Bidirectional"
            title="Why BiLSTM?"
            description="Understanding why bidirectional processing is crucial for sarcasm detection."
            className="mb-12"
          />

          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="text-muted-foreground mb-8 text-center">
                Bidirectional LSTM processes the input sequence in both directions, 
                allowing the model to capture context from both past and future tokens.
              </p>

              {/* BiLSTM Visualization */}
              <div className="space-y-6">
                {/* Forward LSTM */}
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-right">Forward →</div>
                  <div className="flex-1 flex items-center gap-2">
                    {["Oh", "great", "another", "Monday"].map((word, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="px-3 py-2 bg-primary/20 border border-primary/30 rounded-lg text-sm">
                          {word}
                        </div>
                        {i < 3 && <ArrowRight className="w-4 h-4 text-primary" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Backward LSTM */}
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-right">← Backward</div>
                  <div className="flex-1 flex items-center gap-2">
                    {["Oh", "great", "another", "Monday"].map((word, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="px-3 py-2 bg-accent/20 border border-accent/30 rounded-lg text-sm">
                          {word}
                        </div>
                        {i < 3 && <ArrowLeft className="w-4 h-4 text-accent" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Combined Output */}
                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium text-right">Combined</div>
                    <div className="flex-1 flex items-center gap-2">
                      {["Oh", "great", "another", "Monday"].map((word, i) => (
                        <div key={i} className="px-3 py-2 bg-gradient-primary rounded-lg text-white text-sm">
                          {word}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-center mt-6">
                By processing "Oh great" in context of "another Monday", the model 
                understands the sarcastic intent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Model Layers */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <SectionHeader
            badge="Layers"
            title="Model Architecture Details"
            className="mb-12"
          />

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { name: "Input Layer", config: "Shape: (None, 100)", desc: "Accepts padded sequences of 100 tokens" },
              { name: "Embedding Layer", config: "Output: (None, 100, 300)", desc: "Word2Vec embeddings, 300 dimensions" },
              { name: "Bidirectional LSTM", config: "Output: (None, 256)", desc: "128 units × 2 directions = 256" },
              { name: "Dropout", config: "Rate: 0.3", desc: "Regularization to prevent overfitting" },
              { name: "Dense Layer", config: "Units: 64, ReLU", desc: "Feature extraction and transformation" },
              { name: "Output Layer", config: "Units: 1, Sigmoid", desc: "Binary classification (sarcastic/not)" },
            ].map((layer, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{layer.name}</span>
                    <code className="text-xs bg-secondary px-2 py-1 rounded">{layer.config}</code>
                  </div>
                  <p className="text-sm text-muted-foreground">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Model Summary */}
          <div className="max-w-3xl mx-auto mt-12 bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Model Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">~500K</div>
                <div className="text-sm text-muted-foreground">Total Parameters</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">6</div>
                <div className="text-sm text-muted-foreground">Layers</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">~50ms</div>
                <div className="text-sm text-muted-foreground">Inference Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mathematical Formulation */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Equations"
            title="Mathematical Formulation"
            className="mb-12"
          />

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Forget Gate</h3>
              <div className="p-4 bg-secondary/50 rounded-lg font-mono text-sm text-center">
                f<sub>t</sub> = σ(W<sub>f</sub> · [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>f</sub>)
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Decides what information to discard from the cell state.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Input Gate</h3>
              <div className="p-4 bg-secondary/50 rounded-lg font-mono text-sm text-center">
                i<sub>t</sub> = σ(W<sub>i</sub> · [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>i</sub>)
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Determines which values will be updated.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Cell State Update</h3>
              <div className="p-4 bg-secondary/50 rounded-lg font-mono text-sm text-center">
                C<sub>t</sub> = f<sub>t</sub> * C<sub>t-1</sub> + i<sub>t</sub> * C̃<sub>t</sub>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Updates the cell state with new information.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Output Gate</h3>
              <div className="p-4 bg-secondary/50 rounded-lg font-mono text-sm text-center">
                o<sub>t</sub> = σ(W<sub>o</sub> · [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>o</sub>)
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Controls the output based on cell state.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
