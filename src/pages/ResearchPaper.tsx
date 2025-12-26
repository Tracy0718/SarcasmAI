import { Download, FileText, BookOpen, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

export default function ResearchPaper() {
  const handleDownload = async () => {
    try {
      const res = await fetch("/Research_Paper_NLP.pdf", { cache: "no-store" });
      if (!res.ok) throw new Error(`Download failed: ${res.status}`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Research_Paper_NLP.pdf";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (e) {
      // Fallback: open the PDF directly (works in most environments)
      window.open("/Research_Paper_NLP.pdf", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Research Paper"
            title="A Deep Learning–Based Model for Identifying Sarcasm in Textual Data"
            description="Full research paper with methodology, results, and analysis."
            className="mb-12"
          />

          <div className="max-w-4xl mx-auto flex justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90"
              onClick={handleDownload}
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Abstract</h2>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="text-muted-foreground leading-relaxed">
                Sarcasm detection is a challenging task in natural language processing 
                due to its subtle and context-dependent nature. Traditional sentiment 
                analysis systems often fail to correctly classify sarcastic statements, 
                leading to inaccurate sentiment interpretations. In this paper, we propose 
                a deep learning approach using Bidirectional Long Short-Term Memory (BiLSTM) 
                networks to identify sarcasm in textual data. Our model leverages pre-trained 
                word embeddings and captures contextual information from both directions of 
                the input sequence. Experiments on a dataset of 26,709 samples demonstrate 
                that our BiLSTM model achieves an accuracy of 86.9%, outperforming traditional 
                machine learning methods such as Naive Bayes (72.1%) and SVM (75.8%), as well 
                as unidirectional LSTM (83.2%). Our results indicate that bidirectional context 
                modeling is crucial for effective sarcasm detection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Contributions */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Key Contributions</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "BiLSTM Architecture for Sarcasm Detection",
                  description: "We propose a novel application of Bidirectional LSTM networks for sarcasm detection, demonstrating the importance of bidirectional context in understanding sarcastic expressions.",
                },
                {
                  title: "Comprehensive Model Comparison",
                  description: "We provide an extensive comparison between traditional ML methods (Naive Bayes, SVM) and deep learning approaches (LSTM, BiLSTM), quantifying the improvements.",
                },
                {
                  title: "Preprocessing Pipeline",
                  description: "We develop a robust text preprocessing pipeline specifically designed for handling the unique characteristics of sarcastic text.",
                },
                {
                  title: "Real-world Applicability",
                  description: "We demonstrate the practical applicability of our model through a live demo system capable of real-time sarcasm detection.",
                },
              ].map((contribution, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-6 bg-card border border-border rounded-xl"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{contribution.title}</h3>
                    <p className="text-muted-foreground">{contribution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Paper Sections */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Paper Structure</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { section: "1. Introduction", pages: "1-2" },
                { section: "2. Related Work", pages: "2-4" },
                { section: "3. Methodology", pages: "4-7" },
                { section: "4. Dataset", pages: "7-8" },
                { section: "5. Experiments", pages: "8-10" },
                { section: "6. Results", pages: "10-12" },
                { section: "7. Discussion", pages: "12-14" },
                { section: "8. Conclusion", pages: "14-15" },
                { section: "References", pages: "15-17" },
                { section: "Appendix", pages: "18-20" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 bg-card border border-border rounded-lg"
                >
                  <span className="font-medium">{item.section}</span>
                  <span className="text-sm text-muted-foreground">
                    Pages {item.pages}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 'Cite This Paper' section removed per request */}

      {/* Duplicate Download CTA removed per request */}
    </>
  );
}
