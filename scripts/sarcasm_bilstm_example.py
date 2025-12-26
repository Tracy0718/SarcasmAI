
import random
import re
from typing import List, Tuple

import numpy as np
import torch
import torch.nn as nn
from sklearn.metrics import accuracy_score


SEED = 42
random.seed(SEED)
np.random.seed(SEED)
torch.manual_seed(SEED)


def simple_tokenize(text: str) -> List[str]:
    
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", "", text)
    return text.split()


def build_vocab(texts: List[str], min_freq: int = 1) -> dict:
    
    freq = {}
    for t in texts:
        for tok in simple_tokenize(t):
            freq[tok] = freq.get(tok, 0) + 1

    # reserved: 0 -> <PAD>, 1 -> <UNK>
    vocab = {"<PAD>": 0, "<UNK>": 1}
    idx = 2
    for token, count in sorted(freq.items(), key=lambda x: (-x[1], x[0])):
        if count >= min_freq:
            vocab[token] = idx
            idx += 1

    return vocab


def encode(texts: List[str], vocab: dict, max_len: int) -> np.ndarray:
    
    sequences = []
    for t in texts:
        tokens = simple_tokenize(t)
        seq = [vocab.get(tok, vocab["<UNK>"]) for tok in tokens]
        if len(seq) >= max_len:
            seq = seq[:max_len]
        else:
            seq = seq + [vocab["<PAD>"]] * (max_len - len(seq))
        sequences.append(seq)
    return np.array(sequences, dtype=np.int64)


class SarcasmDataset(torch.utils.data.Dataset):
    def __init__(self, X: np.ndarray, y: np.ndarray):
        self.X = torch.from_numpy(X)
        self.y = torch.from_numpy(y).long()

    def __len__(self):
        return len(self.y)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]


class BiLSTMSarcasm(nn.Module):
    def __init__(self, vocab_size: int, embed_dim: int = 64, hidden: int = 64, num_layers: int = 1):
        super().__init__()
        # Embedding layer: maps token ids to vectors
        self.embedding = nn.Embedding(vocab_size, embed_dim, padding_idx=0)
        # Bidirectional LSTM
        self.lstm = nn.LSTM(
            input_size=embed_dim,
            hidden_size=hidden,
            num_layers=num_layers,
            batch_first=True,
            bidirectional=True,
        )
        # Classifier head
        self.fc = nn.Sequential(
            nn.Linear(hidden * 2, hidden),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(hidden, 2),
        )

    def forward(self, x):
        # x: (batch, seq_len)
        emb = self.embedding(x)  # (batch, seq_len, embed_dim)
        out, _ = self.lstm(emb)  # (batch, seq_len, hidden*2)
        # use the final timestep's representation (could also pool)
        last = out[:, -1, :]
        return self.fc(last)


def train_epoch(model, opt, loss_fn, loader, device):
    model.train()
    total_loss = 0.0
    for Xb, yb in loader:
        Xb = Xb.to(device)
        yb = yb.to(device)
        logits = model(Xb)
        loss = loss_fn(logits, yb)
        opt.zero_grad()
        loss.backward()
        opt.step()
        total_loss += loss.item() * Xb.size(0)
    return total_loss / len(loader.dataset)


def evaluate(model, loader, device):
    model.eval()
    preds = []
    trues = []
    with torch.no_grad():
        for Xb, yb in loader:
            Xb = Xb.to(device)
            logits = model(Xb)
            pred = logits.argmax(dim=1).cpu().numpy()
            preds.extend(pred.tolist())
            trues.extend(yb.numpy().tolist())
    return accuracy_score(trues, preds)


def main():
    # Tiny synthetic dataset for demonstration — in a real project you'd load a CSV
    texts = [
        "Oh great, another Monday morning. Just what I needed.",
        "I absolutely love when my code works on the first try.",
        "What a beautiful day to be stuck in traffic!",
        "Thanks for letting me know at the last minute!",
        "I had a great time at the party last night.",
        "This is exactly what I wanted, not.",
        "Wow, that meeting was so productive... not.",
        "I'll be there at 6 pm, see you then.",
    ]

    # Labels: 1 -> sarcastic, 0 -> not sarcastic (for demo)
    labels = np.array([1, 0, 1, 1, 0, 1, 1, 0], dtype=np.int64)

    # Build vocab and encode
    vocab = build_vocab(texts, min_freq=1)
    max_len = 12
    X = encode(texts, vocab, max_len)

    # Split to train / val (simple split)
    idx = list(range(len(X)))
    random.shuffle(idx)
    train_idx = idx[:6]
    val_idx = idx[6:]

    X_train, y_train = X[train_idx], labels[train_idx]
    X_val, y_val = X[val_idx], labels[val_idx]

    batch_size = 4
    train_loader = torch.utils.data.DataLoader(SarcasmDataset(X_train, y_train), batch_size=batch_size, shuffle=True)
    val_loader = torch.utils.data.DataLoader(SarcasmDataset(X_val, y_val), batch_size=batch_size)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = BiLSTMSarcasm(vocab_size=len(vocab), embed_dim=64, hidden=64).to(device)

    opt = torch.optim.Adam(model.parameters(), lr=0.01)
    loss_fn = nn.CrossEntropyLoss()

    # Train for a few epochs and print validation accuracy
    for epoch in range(1, 11):
        loss = train_epoch(model, opt, loss_fn, train_loader, device)
        acc = evaluate(model, val_loader, device)
        print(f"Epoch {epoch:02d} — loss: {loss:.4f} — val_acc: {acc:.3f}")

    # Example of running the model on new text
    test_sent = "Oh perfect, my phone died right before the call."
    seq = encode([test_sent], vocab, max_len)
    model.eval()
    with torch.no_grad():
        logits = model(torch.from_numpy(seq).to(device))
        pred = int(logits.argmax(dim=1).cpu().numpy()[0])
        print("\nTest sentence:", test_sent)
        print("Predicted label (1=sarcastic,0=not):", pred)


if __name__ == "__main__":
    main()
