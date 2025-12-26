import { useState } from "react";
import { Send, Loader2, CheckCircle, XCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const exampleTexts = [
  "Oh great, another Monday morning. Just what I needed.",
  "What a beautiful day to be stuck in traffic!",
  "I absolutely love when my code works on the first try.",
  "Wow, that meeting was so productive... not.",
  "Thanks for letting me know at the last minute!",
  "Oh perfect, my phone died right before the call.",
  "I just love waiting in long lines.",
  "Sure, I'd love to work overtime again.",
  "Fantastic — another unexpected bill.",
  "Best. Day. Ever.",
  "I can't wait to do this for the hundredth time.",
  "Thank you so much for your help.",
  "I had a great time at the party last night.",
  "I'll be there at 6 pm, see you then.",
  "That was really helpful, thanks!",
  "Oh good, another surprise deadline.",
  "I just love being on hold for hours.",
  "Sure, take your time — it's not urgent at all.",
  "I finished the task early, as always.",
  "I want to take a nap.",
  "Oh wow, my phone battery died again. Best day ever.",
  "Yeah, waking up at 5 AM is my favorite hobby.",
  "The weather is pleasant today.",
  "The internet connection is stable today.",
  "Amazing how you replied instantly… after three days.",
  "I am here for",
  "How beautiful"
];


interface PredictionResult {
  is_sarcastic: boolean;
  confidence: number;
  text: string;
}

type ClassifiedResult = PredictionResult & {
  category: "clearly-sarcastic" | "non-sarcastic" | "ambiguous";
  explanation: string;
};

function generateSarcasmExplanation(text: string) {
  const lower = text.toLowerCase();
  if (/oh great|just what i needed/.test(lower)) {
    return "This expresses frustration; the speaker likely means the opposite (they are unhappy).";
  }
  if (/what a .* to be/.test(lower) || /stuck in traffic/.test(lower)) {
    return "This is ironic — they are frustrated about the situation (e.g. traffic), not praising it.";
  }
  if (/love when/.test(lower) || /i absolutely love/.test(lower)) {
    return "This is sarcastic praise; the speaker actually dislikes the described event.";
  }
  if (/so productive.*not/.test(lower) || /not\.?$/.test(lower)) {
    return "The trailing 'not' or contrast indicates the speaker means the opposite of the literal sentence.";
  }
  return "High-confidence sarcasm: the speaker most likely intends the opposite or an ironic meaning to the literal words.";
}

function classify(result: PredictionResult): ClassifiedResult {
  const conf = result.confidence;
  if (conf >= 0.7) {
    return {
      ...result,
      category: "clearly-sarcastic",
      explanation: generateSarcasmExplanation(result.text),
    };
  }

  if (conf >= 0.4) {
    return {
      ...result,
      category: "non-sarcastic",
      explanation: "Confidence indicates this text is likely genuine (not sarcastic).",
    };
  }

  // ambiguous: low confidence
  let reasons: string[] = [];
  if (result.text.trim().length < 10) reasons.push("very short text");
  if (!/[.?!]$/.test(result.text.trim())) reasons.push("no clear sentence boundary");
  if (reasons.length === 0) reasons.push("model uncertainty or mixed signals in the text");

  return {
    ...result,
    category: "ambiguous",
    explanation: `Ambiguous input: ${reasons.join(", ")}. The sentence may be incomplete or lacks clear sarcastic cues.`,
  };
}

export default function Demo() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  // Configuration for your Python backend
  const API_ENDPOINT = import.meta.env.VITE_SARCASM_API_URL || "";

  const handlePredict = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      if (API_ENDPOINT) {
        // Real API call to your Python backend
        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: inputText }),
        });
        const data = await response.json();
        setResult(data);
      } else {
        // Simulated (deterministic) prediction for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 700));

        // Predefined fixed results for common examples (stable confidences)
        const fixedResults: Record<string, { confidence: number; explanation?: string }> = {
          "Oh great, another Monday morning. Just what I needed.": { confidence: 0.88 },
          "What a beautiful day to be stuck in traffic!": { confidence: 0.82 },
          "I absolutely love when my code works on the first try.": { confidence: 0.55 },
          "Wow, that meeting was so productive... not.": { confidence: 0.90 },
          "Thanks for letting me know at the last minute!": { confidence: 0.80 },
          "Oh perfect, my phone died right before the call.": { confidence: 0.84 },
          "I just love waiting in long lines.": { confidence: 0.95 },
          "Sure, I'd love to work overtime again.": { confidence: 0.86 },
          "Fantastic — another unexpected bill.": { confidence: 0.72 },
          "Best. Day. Ever.": { confidence: 0.60 },
          "I can't wait to do this for the hundredth time.": { confidence: 0.77 },
          "Thank you so much for your help.": { confidence: 0.45 },
          "I had a great time at the party last night.": { confidence: 0.67 },
          "I'll be there at 6 pm, see you then.": { confidence: 0.61 },
          "That was really helpful, thanks!": { confidence: 0.49 },
          "Oh good, another surprise deadline.": { confidence: 0.85 },
          "I just love being on hold for hours.": { confidence: 0.79 },
          "Sure, take your time — it's not urgent at all.": { confidence: 0.56 },
          "I finished the task early, as always.": { confidence: 0.33 },
          "I want to take a nap.": { confidence: 0.58},
          "Oh wow, my phone battery died again. Best day ever.": { confidence: 0.81},
          "Yeah, waking up at 5 AM is my favorite hobby.": { confidence: 0.83},
          "The weather is pleasant today.": { confidence: 0.46},
          "The internet connection is stable today.": { confidence: 0.58},
          "Amazing how you replied instantly… after three days.": { confidence: 0.97},
          "I am here for": { confidence: 0.34},
          "How beautiful": { confidence: 0.29},
        };

        const key = inputText.trim();
        if (fixedResults[key]) {
          const c = fixedResults[key].confidence;
          setResult({ is_sarcastic: c >= 0.7, confidence: c, text: inputText });
        } else {
          // Deterministic hash to [0,1)
          function hashTo01(s: string) {
            let h = 5381;
            for (let i = 0; i < s.length; i++) {
              // djb2
              h = (h * 33) ^ s.charCodeAt(i);
            }
            // convert to positive and scale
            return (h >>> 0) / 4294967295;
          }

          const det = hashTo01(inputText);
          // Use det as confidence directly (stable).
          const confidence = Math.round(det * 1000) / 1000; // keep 3 decimals
          setResult({ is_sarcastic: confidence >= 0.7, confidence, text: inputText });
        }
      }
    } catch (error) {
      console.error("Prediction error:", error);
      // Fallback to simulation on error
      setResult({
        is_sarcastic: false,
        confidence: 0.5,
        text: inputText,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (text: string) => {
    setInputText(text);
    setResult(null);
  };

  return (
    <>
      {/* Hero */}
      <section className="section-padding pb-8">
        <div className="container-custom">
          <SectionHeader
            badge="Live Demo"
            title="Sarcasm Detection"
            description="Enter any text below and our BiLSTM model will analyze it for sarcasm. Try it yourself!"
            className="mb-12"
          />
        </div>
      </section>

      {/* Demo Interface */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Input Card */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8">
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                  Enter text to analyze:
                </label>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type or paste your text here..."
                  className="min-h-[120px] resize-none bg-secondary/50 border-border"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  {inputText.length} characters
                </p>
                <Button
                  onClick={handlePredict}
                  disabled={!inputText.trim() || isLoading}
                  className="w-full sm:w-auto bg-gradient-primary hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Detect Sarcasm
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Result Card */}
            {result && (() => {
              const classified = classify(result);
              const isSarcastic = classified.category === "clearly-sarcastic";
              const isNon = classified.category === "non-sarcastic";
              const isAmb = classified.category === "ambiguous";

              return (
                <div
                  className={cn(
                    "rounded-2xl p-6 md:p-8 mb-8 animate-scale-in",
                    isSarcastic
                      ? "bg-primary/10 border-2 border-primary/30"
                      : isNon
                      ? "bg-success/10 border-2 border-success/30"
                      : "bg-warning/10 border-2 border-warning/30"
                  )}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {isSarcastic ? (
                        <>
                          <div className="p-2 bg-primary/20 rounded-lg">
                            <Sparkles className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-primary">Clearly Sarcastic</h3>
                            <p className="text-sm text-muted-foreground">
                              Confidence {(classified.confidence * 100).toFixed(1)}% — the model is confident this is sarcastic.
                            </p>
                          </div>
                        </>
                      ) : isNon ? (
                        <>
                          <div className="p-2 bg-success/20 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-success" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-success">Non-Sarcastic</h3>
                            <p className="text-sm text-muted-foreground">
                              Confidence {(classified.confidence * 100).toFixed(1)}% — this appears genuine.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-2 bg-warning/20 rounded-lg">
                            <XCircle className="w-6 h-6 text-warning" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-warning">Ambiguous</h3>
                            <p className="text-sm text-muted-foreground">
                              Confidence {(classified.confidence * 100).toFixed(1)}% — the model is uncertain about this text.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Confidence Score</span>
                      <span className="text-sm font-bold">
                        {(classified.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          isSarcastic ? "bg-gradient-primary" : isNon ? "bg-success" : "bg-warning"
                        )}
                        style={{ width: `${classified.confidence * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="mb-6 p-4 bg-card/50 rounded-lg">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Interpretation
                    </span>
                    <p className="mt-2">{classified.explanation}</p>
                  </div>

                  {/* Analyzed Text */}
                  <div className="p-4 bg-card/50 rounded-lg">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Analyzed Text
                    </span>
                    <p className="mt-2 italic">"{classified.text}"</p>
                  </div>
                </div>
              );
            })()}

            {/* Example Texts */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Try Example Texts
              </h3>
              <div className="space-y-3">
                {exampleTexts.map((text, i) => (
                  <button
                    key={i}
                    onClick={() => handleExampleClick(text)}
                    className="w-full text-left p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors text-sm"
                  >
                    "{text}"
                  </button>
                ))}
              </div>
            </div>

            {/* API Notice removed per request */}
          </div>
        </div>
      </section>

      {/* Integration section removed per request */}
    </>
  );
}
