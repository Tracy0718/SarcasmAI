import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(p: string) {
  // Minimum 8 chars, at least one uppercase, one number, one special char
  const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return re.test(p);
}

type User = { email: string; password: string };

function getStoredUsers(): Record<string, User> {
  try {
    const raw = localStorage.getItem("sd_users");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function storeUser(user: User) {
  const users = getStoredUsers();
  users[user.email] = user;
  localStorage.setItem("sd_users", JSON.stringify(users));
}

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const switchMode = (m: "login" | "signup") => {
    setMode(m);
    setMessage(null);
    setSuccess(null);
    setEmail("");
    setPassword("");
    setConfirm("");
  };

  const handleSignup = (e?: React.FormEvent) => {
    e?.preventDefault();
    setMessage(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      setSuccess(false);
      return;
    }
    if (!validatePassword(password)) {
      setMessage(
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
      );
      setSuccess(false);
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      setSuccess(false);
      return;
    }

    const users = getStoredUsers();
    if (users[email]) {
      setMessage("An account with this email already exists. Please log in.");
      setSuccess(false);
      return;
    }

    storeUser({ email, password });
    setMessage("Account created successfully. You can now log in.");
    setSuccess(true);
    setMode("login");
    setPassword("");
    setConfirm("");
  };

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    setMessage(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      setSuccess(false);
      return;
    }

    const users = getStoredUsers();
    const user = users[email];
    if (!user) {
      setMessage("No account found with this email. Please sign up.");
      setSuccess(false);
      return;
    }
    if (user.password !== password) {
      setMessage("Invalid credentials.");
      setSuccess(false);
      return;
    }

    // Set a simple demo session flag in localStorage
    try {
      localStorage.setItem("sd_current_user", email);
    } catch {}

    setMessage("Logged in successfully. Redirecting...");
    setSuccess(true);

    // navigate to home after a short delay so user sees message
    setTimeout(() => navigate("/"), 600);
  };

  return (
    <>
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              badge="Account"
              title={mode === "login" ? "Sign In" : "Create Account"}
              description={mode === "login" ? "Existing users can sign in here." : "Create a simple account stored locally in your browser."}
              className="mb-8"
            />

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex gap-2 mb-6">
                <Button
                  variant={mode === "login" ? undefined : "ghost"}
                  onClick={() => switchMode("login")}
                >
                  Sign In
                </Button>
                <Button
                  variant={mode === "signup" ? undefined : "ghost"}
                  onClick={() => switchMode("signup")}
                >
                  Sign Up
                </Button>
              </div>

              <form
                onSubmit={(e) => (mode === "login" ? handleLogin(e) : handleSignup(e))}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    type="email"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Password</label>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    type="password"
                  />
                </div>

                {mode === "signup" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Confirm Password</label>
                    <Input
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Repeat password"
                      type="password"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Password rules: at least 8 characters, include uppercase,
                      a number and a special character.
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between gap-4">
                  <Button type="submit" className="bg-gradient-primary">
                    {mode === "login" ? "Sign In" : "Create Account"}
                  </Button>
                </div>
              </form>

              {message && (
                <div
                  className={cn(
                    "mt-4 p-3 rounded-lg flex items-center gap-3",
                    success ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"
                  )}
                >
                  {success ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                  <div className="text-sm">{message}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
