import { Link } from "react-router-dom";
import { Brain, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-lg text-gradient">SarcasmAI</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              A Deep Learning–Based Model for Identifying Sarcasm in Textual Data. 
              Using BiLSTM architecture to detect sarcasm with 86.9% accuracy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Project
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="hover:text-primary transition-colors">
                  Methodology
                </Link>
              </li>
              {/* 'Try Demo' link removed per request */}
              <li>
                <Link to="/paper" className="hover:text-primary transition-colors">
                  Research Paper
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/Tracy0718"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/yugbhatnagar18/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:yugbhatnagar291@gmail.com"
                className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sarcasm Detection Research Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
