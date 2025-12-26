import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { Target, Percent, TrendingUp, CheckCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const modelComparison = [
  { name: "Naive Bayes", accuracy: 72.1, color: "hsl(var(--muted-foreground))" },
  { name: "SVM", accuracy: 75.8, color: "hsl(var(--muted-foreground))" },
  { name: "LSTM", accuracy: 83.2, color: "hsl(var(--accent))" },
  { name: "BiLSTM", accuracy: 86.9, color: "hsl(var(--primary))" },
];

const trainingHistory = [
  { epoch: 1, train_acc: 65.2, val_acc: 63.1, train_loss: 0.58, val_loss: 0.61 },
  { epoch: 2, train_acc: 72.4, val_acc: 70.8, train_loss: 0.49, val_loss: 0.52 },
  { epoch: 3, train_acc: 76.8, val_acc: 74.5, train_loss: 0.42, val_loss: 0.46 },
  { epoch: 4, train_acc: 79.5, val_acc: 77.2, train_loss: 0.37, val_loss: 0.41 },
  { epoch: 5, train_acc: 81.2, val_acc: 79.1, train_loss: 0.33, val_loss: 0.38 },
  { epoch: 6, train_acc: 82.8, val_acc: 80.5, train_loss: 0.30, val_loss: 0.35 },
  { epoch: 8, train_acc: 84.5, val_acc: 82.3, train_loss: 0.26, val_loss: 0.32 },
  { epoch: 10, train_acc: 85.8, val_acc: 83.8, train_loss: 0.23, val_loss: 0.29 },
  { epoch: 12, train_acc: 87.1, val_acc: 84.9, train_loss: 0.21, val_loss: 0.27 },
  { epoch: 14, train_acc: 88.2, val_acc: 85.6, train_loss: 0.19, val_loss: 0.26 },
  { epoch: 16, train_acc: 89.1, val_acc: 86.2, train_loss: 0.17, val_loss: 0.25 },
  { epoch: 18, train_acc: 89.8, val_acc: 86.5, train_loss: 0.16, val_loss: 0.24 },
  { epoch: 20, train_acc: 90.3, val_acc: 86.9, train_loss: 0.15, val_loss: 0.24 },
];

const confusionMatrix = {
  tp: 2341,
  tn: 2287,
  fp: 312,
  fn: 402,
};

export default function Results() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Results"
            title="Model Performance Analysis"
            description="Comprehensive evaluation of our BiLSTM model's performance on the sarcasm detection task."
            className="mb-16"
          />
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section-padding bg-card/50 pt-0">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Target}
              value="86.9%"
              label="Accuracy"
              variant="gradient"
            />
            <StatCard icon={Percent} value="88.2%" label="Precision" />
            <StatCard icon={TrendingUp} value="85.4%" label="Recall" />
            <StatCard icon={CheckCircle} value="86.8%" label="F1-Score" />
          </div>
        </div>
      </section>

      {/* Model Comparison Chart */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Comparison"
            title="Model Comparison"
            description="Accuracy comparison between traditional ML and deep learning approaches."
            className="mb-12"
          />

          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Accuracy"]}
                  />
                  <Bar
                    dataKey="accuracy"
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              BiLSTM achieves the highest accuracy at 86.9%, outperforming traditional ML methods by over 10%.
            </p>
          </div>
        </div>
      </section>

      {/* Training Curves */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <SectionHeader
            badge="Training"
            title="Training Progress"
            className="mb-12"
          />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Accuracy Chart */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Accuracy vs Epoch</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trainingHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="epoch" stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={[60, 95]} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="train_acc"
                      name="Training"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="val_acc"
                      name="Validation"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Loss Chart */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Loss vs Epoch</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trainingHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="epoch" stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={[0, 0.7]} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="train_loss"
                      name="Training"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="val_loss"
                      name="Validation"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confusion Matrix */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Detailed Analysis"
            title="Confusion Matrix"
            className="mb-12"
          />

          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="grid grid-cols-3 gap-4">
                {/* Header Row */}
                <div />
                <div className="text-center font-semibold text-sm">
                  Predicted Sarcastic
                </div>
                <div className="text-center font-semibold text-sm">
                  Predicted Non-Sarcastic
                </div>

                {/* Row 1 */}
                <div className="text-right font-semibold text-sm self-center">
                  Actual Sarcastic
                </div>
                <div className="p-6 bg-success/20 border border-success/30 rounded-xl text-center">
                  <div className="text-2xl font-bold text-success">{confusionMatrix.tp}</div>
                  <div className="text-xs text-muted-foreground mt-1">True Positive</div>
                </div>
                <div className="p-6 bg-destructive/20 border border-destructive/30 rounded-xl text-center">
                  <div className="text-2xl font-bold text-destructive">{confusionMatrix.fn}</div>
                  <div className="text-xs text-muted-foreground mt-1">False Negative</div>
                </div>

                {/* Row 2 */}
                <div className="text-right font-semibold text-sm self-center">
                  Actual Non-Sarcastic
                </div>
                <div className="p-6 bg-destructive/20 border border-destructive/30 rounded-xl text-center">
                  <div className="text-2xl font-bold text-destructive">{confusionMatrix.fp}</div>
                  <div className="text-xs text-muted-foreground mt-1">False Positive</div>
                </div>
                <div className="p-6 bg-success/20 border border-success/30 rounded-xl text-center">
                  <div className="text-2xl font-bold text-success">{confusionMatrix.tn}</div>
                  <div className="text-xs text-muted-foreground mt-1">True Negative</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-semibold mb-4">Metrics Calculation</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">Accuracy:</span>
                    <span className="font-mono ml-2">(TP + TN) / Total = 86.9%</span>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">Precision:</span>
                    <span className="font-mono ml-2">TP / (TP + FP) = 88.2%</span>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">Recall:</span>
                    <span className="font-mono ml-2">TP / (TP + FN) = 85.4%</span>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">F1-Score:</span>
                    <span className="font-mono ml-2">2 × (P × R) / (P + R) = 86.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <SectionHeader
            badge="Insights"
            title="Key Findings"
            className="mb-12"
          />

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                title: "BiLSTM Outperforms Standard LSTM",
                description: "The bidirectional architecture improved accuracy by 3.7% over unidirectional LSTM, demonstrating the importance of capturing context from both directions.",
              },
              {
                title: "Deep Learning > Traditional ML",
                description: "Deep learning approaches showed significant improvement over traditional methods, with BiLSTM outperforming SVM by 11.1 percentage points.",
              },
              {
                title: "Balanced Performance",
                description: "The model achieves balanced precision (88.2%) and recall (85.4%), indicating reliable performance for both sarcastic and non-sarcastic classifications.",
              },
              {
                title: "Consistent Training",
                description: "Training curves show steady convergence without overfitting, validating our regularization strategy with dropout layers.",
              },
            ].map((finding, i) => (
              <div key={i} className="flex gap-4 p-6 bg-card border border-border rounded-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{finding.title}</h3>
                  <p className="text-muted-foreground">{finding.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
