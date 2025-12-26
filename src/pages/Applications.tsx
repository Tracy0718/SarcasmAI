import { MessageSquare, Users, TrendingUp, Brain, BarChart3, Shield } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";

const applications = [
  {
    icon: MessageSquare,
    title: "Social Media Monitoring",
    description: "Analyze tweets, posts, and comments to accurately gauge public sentiment by detecting sarcasm that would otherwise mislead analysis.",
    examples: [
      "Brand reputation monitoring",
      "Trend analysis",
      "Public opinion research",
    ],
  },
  {
    icon: Users,
    title: "Customer Feedback Analysis",
    description: "Improve customer service by correctly interpreting sarcastic feedback in reviews, surveys, and support tickets.",
    examples: [
      "Product review analysis",
      "Support ticket prioritization",
      "Customer satisfaction scoring",
    ],
  },
  {
    icon: TrendingUp,
    title: "Opinion Mining",
    description: "Extract genuine opinions from text data by filtering out sarcastic statements that could skew results.",
    examples: [
      "Market research",
      "Political sentiment analysis",
      "Consumer behavior studies",
    ],
  },
  {
    icon: Brain,
    title: "Sentiment Analysis Systems",
    description: "Enhance existing NLP pipelines with sarcasm detection for more accurate sentiment classification.",
    examples: [
      "Chatbot improvement",
      "Automated moderation",
      "Content recommendation",
    ],
  },
];

const useCases = [
  {
    icon: BarChart3,
    title: "Business Intelligence",
    description: "Make data-driven decisions with accurate sentiment insights that account for sarcastic expressions in market data.",
  },
  {
    icon: Shield,
    title: "Content Moderation",
    description: "Better identify potentially harmful or misleading content by understanding the true intent behind sarcastic statements.",
  },
];

export default function Applications() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Applications"
            title="Real-World Use Cases"
            description="Discover how sarcasm detection can enhance various applications across industries."
            className="mb-16"
          />
        </div>
      </section>

      {/* Main Applications */}
      <section className="section-padding bg-card/50 pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <app.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{app.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{app.description}</p>
                <div className="space-y-2">
                  <span className="text-sm font-medium">Example Use Cases:</span>
                  <ul className="space-y-1">
                    {app.examples.map((example, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Use Cases */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="More Applications"
            title="Beyond Sentiment Analysis"
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {useCases.map((useCase, i) => (
              <FeatureCard key={i} {...useCase} />
            ))}
          </div>
        </div>
      </section>

      {/* Industry Impact */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge="Impact"
              title="Industry Impact"
              className="mb-12"
            />

            <div className="space-y-6">
              {[
                {
                  industry: "E-commerce",
                  impact: "Accurately classify product reviews to surface genuine customer concerns and improve product development.",
                  metric: "30% improvement in review sentiment accuracy",
                },
                {
                  industry: "Healthcare",
                  impact: "Better understand patient feedback and social media discussions about health-related topics.",
                  metric: "Enhanced patient sentiment tracking",
                },
                {
                  industry: "Finance",
                  impact: "Analyze market sentiment more accurately by filtering sarcastic comments from financial discussions.",
                  metric: "Improved market prediction models",
                },
                {
                  industry: "Media & Entertainment",
                  impact: "Gauge audience reactions to content more accurately across social platforms.",
                  metric: "Better content recommendation systems",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-6 p-6 bg-card border border-border rounded-xl"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.industry}</h3>
                    <p className="text-muted-foreground mb-2">{item.impact}</p>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {item.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Potential */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              badge="Future"
              title="Future Potential"
              description="As natural language understanding continues to evolve, sarcasm detection will become an essential component of any comprehensive NLP system."
              className="mb-8"
            />
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { value: "Multi-modal", label: "Audio + Text Analysis" },
                { value: "Cross-lingual", label: "Multiple Languages" },
                { value: "Context-aware", label: "Conversation History" },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-card border border-border rounded-xl">
                  <div className="text-xl font-bold text-primary mb-1">
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
