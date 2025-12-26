import { AlertTriangle, Brain, MessageSquare, TrendingUp, Target, Lightbulb } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="About the Project"
            title="Understanding Sarcasm Detection"
            description="Sarcasm poses a unique challenge for sentiment analysis systems. Our research addresses this by developing a deep learning model that can identify sarcastic expressions in text."
            className="mb-16"
          />
        </div>
      </section>

      {/* Problem Statement */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Problem</h2>
              <p className="text-muted-foreground mb-6">
                Traditional sentiment analysis tools struggle with sarcasm because the expressed 
                sentiment is often the opposite of the intended meaning. When someone says 
                "Oh great, another Monday," the literal analysis might interpret it as positive, 
                missing the sarcastic undertone entirely.
              </p>
              <p className="text-muted-foreground">
                This limitation has significant implications for businesses relying on automated 
                sentiment analysis for customer feedback, social media monitoring, and market research.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-semibold mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Common Misinterpretations
              </h3>
              <div className="space-y-4">
                {[
                  { text: '"I just love waiting in traffic for hours"', actual: "Negative", interpreted: "Positive" },
                  { text: '"Wow, what a surprise... not"', actual: "Negative", interpreted: "Positive" },
                  { text: '"Thanks for nothing!"', actual: "Negative", interpreted: "Positive" },
                ].map((example, i) => (
                  <div key={i} className="p-4 bg-secondary/50 rounded-lg">
                    <p className="text-sm mb-2 italic">{example.text}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-success">Actual: {example.actual}</span>
                      <span className="text-destructive">Interpreted: {example.interpreted}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Key Challenges"
            title="Why is Sarcasm Hard to Detect?"
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MessageSquare}
              title="Context Dependency"
              description="Understanding sarcasm requires contextual knowledge that goes beyond the literal text, including cultural references and situational awareness."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Irony & Exaggeration"
              description="Sarcastic statements often employ irony and exaggeration, using positive words to convey negative sentiments and vice versa."
            />
            <FeatureCard
              icon={Target}
              title="Sentiment Contradiction"
              description="The expressed sentiment contradicts the intended meaning, making it difficult for traditional models to classify correctly."
            />
          </div>
        </div>
      </section>

      {/* Why Deep Learning */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="font-semibold mb-6">Model Comparison</h3>
                <div className="space-y-4">
                  {[
                    { model: "Naive Bayes", accuracy: "72.1%", type: "Traditional ML" },
                    { model: "SVM", accuracy: "75.8%", type: "Traditional ML" },
                    { model: "LSTM", accuracy: "83.2%", type: "Deep Learning" },
                    { model: "BiLSTM (Ours)", accuracy: "86.9%", type: "Deep Learning" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div>
                        <span className="font-medium">{item.model}</span>
                        <span className="text-xs text-muted-foreground ml-2">({item.type})</span>
                      </div>
                      <span className={item.model === "BiLSTM (Ours)" ? "text-primary font-bold" : "text-muted-foreground"}>
                        {item.accuracy}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeader
                badge="Our Approach"
                title="Why Deep Learning?"
                align="left"
                className="mb-6"
              />
              <p className="text-muted-foreground mb-6">
                Traditional machine learning approaches like Naive Bayes and SVM rely on 
                handcrafted features and struggle to capture the complex patterns in sarcastic text.
              </p>
              <p className="text-muted-foreground mb-6">
                Deep learning, specifically our BiLSTM architecture, automatically learns 
                these patterns from data. The bidirectional nature allows the model to understand 
                context from both preceding and following words, crucial for detecting sarcasm.
              </p>
              <div className="flex items-start gap-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Key Insight</h4>
                  <p className="text-sm text-muted-foreground">
                    Our BiLSTM model achieves 86.9% accuracy, significantly outperforming 
                    traditional ML approaches by capturing sequential dependencies in text.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Objectives */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Goals"
            title="Research Objectives"
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Brain,
                title: "Develop Accurate Model",
                description: "Create a deep learning model capable of identifying sarcasm in textual data with high accuracy.",
              },
              {
                icon: TrendingUp,
                title: "Improve Sentiment Analysis",
                description: "Enhance existing sentiment analysis systems by incorporating sarcasm detection.",
              },
              {
                icon: MessageSquare,
                title: "Handle Diverse Text",
                description: "Build a robust model that works across different types of text, from social media to reviews.",
              },
              {
                icon: Target,
                title: "Real-world Applicability",
                description: "Ensure the model can be deployed in real-world applications with reasonable inference time.",
              },
            ].map((objective, i) => (
              <FeatureCard key={i} {...objective} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
