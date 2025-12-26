import { Link } from "react-router-dom";
import { ArrowRight, Brain, BarChart3, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-slow delay-300" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 border border-primary/20 rounded-full animate-fade-in-up">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Deep Learning Research Project
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in-up delay-100">
              Identifying{" "}
              <span className="text-gradient">Sarcasm</span>
              <br />
              in Textual Data
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
              A BiLSTM-powered deep learning model that detects sarcasm in text 
              with 86.9% accuracy, enabling more accurate sentiment analysis.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8"
              >
                <Link to="/demo">
                  Try Sarcasm Detector
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/about">View Research Details</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Target}
              value="86.9%"
              label="Model Accuracy"
              variant="gradient"
            />
            <StatCard icon={Brain} value="BiLSTM" label="Architecture" />
            <StatCard icon={BarChart3} value="26,709" label="Training Samples" />
            <StatCard icon={Zap} value="Real-time" label="Detection Speed" />
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="The Challenge"
            title="Why Sarcasm Detection Matters"
            description="Traditional sentiment analysis fails to capture the true meaning behind sarcastic statements, leading to incorrect interpretations."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Brain}
              title="Context Dependency"
              description="Sarcasm relies heavily on context, making it challenging for traditional NLP models to interpret correctly."
            />
            <FeatureCard
              icon={Target}
              title="Sentiment Contradiction"
              description="Sarcastic text often expresses the opposite of its literal meaning, confusing standard sentiment classifiers."
            />
            <FeatureCard
              icon={Zap}
              title="Real-world Impact"
              description="Misinterpreting sarcasm in customer feedback or social media can lead to flawed business decisions."
            />
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                badge="Our Solution"
                title="Deep Learning Approach"
                description="We leverage Bidirectional LSTM networks to capture contextual relationships in both directions, enabling more accurate sarcasm detection."
                align="left"
                className="mb-8"
              />
              <ul className="space-y-4">
                {[
                  "Bidirectional context understanding",
                  "Pre-trained word embeddings",
                  "Attention mechanism for key phrase detection",
                  "Robust preprocessing pipeline",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 bg-gradient-primary">
                <Link to="/methodology">
                  Learn More About Methodology
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
              <div className="relative bg-card border border-border rounded-2xl p-8">
                <div className="space-y-4">
                  {/* Simplified BiLSTM Diagram */}
                  <div className="flex items-center justify-center gap-4 py-8">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-mono">Input</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Text</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-primary" />
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-accent/10 border border-accent/30 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-mono">Embed</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Word2Vec</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-primary" />
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-20 h-20 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <span className="text-xs font-mono text-white">BiLSTM</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Model</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-primary" />
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-success/10 border border-success/30 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-mono">Output</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Result</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Detect Sarcasm?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Try our live demo and see how our BiLSTM model analyzes text for sarcasm in real-time.
              </p>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/demo">
                  Launch Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
