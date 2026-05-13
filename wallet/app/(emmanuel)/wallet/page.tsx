"use client"
import { useState } from "react";

const transactions = [
  { id: 1, type: "funding", name: "Wallet Funding", date: "May 11, 2026 · 10:13 AM", amount: 20000 },
  { id: 2, type: "payment", name: "Store Payment", date: "May 9, 2026 · 7:18 PM", amount: -65000 },
  { id: 3, type: "funding", name: "Wallet Funding", date: "May 2, 2026 · 5:42 PM", amount: 5000 },
  { id: 4, type: "payment", name: "Store Payment", date: "April 21, 2026 · 10:42 PM", amount: -160000 },
  { id: 5, type: "funding", name: "Wallet Funding", date: "April 9, 2026 · 8:11 AM", amount: 450000 },
];

const paymentMethods = [
  { id: "bank", name: "Bank Transfer", desc: "Transfer from your bank account to fund wallet", time: "1–5 mins", icon: "🏦" },
  { id: "card", name: "Debit Card", desc: "Fund your wallet instantly using your debit card", time: "5–10 mins", icon: "💳" },
  { id: "usdt", name: "USDT", desc: "Fund your wallet using crypto", time: "1–5 mins", icon: "₿" },
];

const quickAmounts = [5000, 10000, 15000, 20000, 50000];

export default function WalletFundingPage() {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [balanceVisible, setBalanceVisible] = useState(true);

  const handleQuickAmount = (val) => {
    setAmount(val.toString());
  };

  const formatAmount = (val) => {
    return Math.abs(val).toLocaleString();
  };

  return (
    <div style={styles.page}>
      <p style={styles.greeting}>Welcome back!</p>

      <div style={styles.layout}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <h1 style={styles.pageTitle}>Fund Wallet</h1>
          <p style={styles.pageSub}>Seamless funding. Limitless shopping.</p>

          {/* Balance Card */}
          <div style={styles.balanceCard}>
            <div style={styles.balanceCardOverlay1} />
            <div style={styles.balanceCardOverlay2} />
            <p style={styles.balanceLabel}>Available Balance</p>
            <div style={styles.balanceRow}>
              <span style={styles.balanceAmount}>
                {balanceVisible ? "NGN 250,000.00" : "NGN ••••••••"}
              </span>
              <button
                style={styles.eyeBtn}
                onClick={() => setBalanceVisible(!balanceVisible)}
                aria-label="Toggle balance visibility"
              >
                {balanceVisible ? "👁" : "🙈"}
              </button>
            </div>
            <div style={styles.walletDeco}>💼</div>
          </div>

          {/* Step 1: Amount */}
          <div style={styles.section}>
            <div style={styles.stepTitle}>
              <span style={styles.stepBadge}>1</span>
              Enter Amount
            </div>
            <div style={styles.amountInputWrap}>
              <span style={styles.currencyPrefix}>₦</span>
              <input
                type="number"
                placeholder="Enter your funding amount.."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.amountInput}
              />
            </div>
            <div style={styles.quickAmounts}>
              {quickAmounts.map((val) => (
                <button
                  key={val}
                  onClick={() => handleQuickAmount(val)}
                  style={{
                    ...styles.quickBtn,
                    ...(amount === val.toString() ? styles.quickBtnActive : {}),
                  }}
                >
                  {val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div style={styles.section}>
            <div style={styles.stepTitle}>
              <span style={styles.stepBadge}>2</span>
              Select Payment Method
            </div>
            <div style={styles.paymentGrid}>
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  style={{
                    ...styles.paymentCard,
                    ...(selectedMethod === method.id ? styles.paymentCardSelected : {}),
                  }}
                >
                  <div style={styles.paymentIcon}>{method.icon}</div>
                  <div style={styles.paymentName}>{method.name}</div>
                  <div style={styles.paymentDesc}>{method.desc}</div>
                  <span style={styles.paymentTime}>{method.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button style={styles.ctaBtn}>
            Continue to Payment →
          </button>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          {/* Transactions */}
          <div style={styles.panelCard}>
            <div style={styles.panelTitle}>Recent Transactions</div>
            {transactions.map((tx) => (
              <div key={tx.id} style={styles.txItem}>
                <div
                  style={{
                    ...styles.txIcon,
                    ...(tx.type === "funding" ? styles.txIconFunding : styles.txIconPayment),
                  }}
                >
                  {tx.type === "funding" ? "↙" : "🛍"}
                </div>
                <div style={styles.txMeta}>
                  <div style={styles.txName}>{tx.name}</div>
                  <div style={styles.txDate}>{tx.date}</div>
                </div>
                <div
                  style={{
                    ...styles.txAmount,
                    ...(tx.amount > 0 ? styles.txCredit : styles.txDebit),
                  }}
                >
                  {tx.amount > 0 ? "+" : "-"} {formatAmount(tx.amount)}
                </div>
              </div>
            ))}
          </div>

          {/* Funding Tips */}
          <div style={styles.tipsCard}>
            <div style={styles.tipsTitle}>💡 Funding Tips</div>
            <div style={styles.tipItem}>↗ Use debit card for instant funding</div>
            <div style={styles.tipItem}>↗ Bank transfers may take 1–5 mins to reflect</div>
            <div style={styles.tipItem}>↗ Ensure you use an account in your name</div>
          </div>

          {/* Security */}
          <div style={styles.securityCard}>
            <div style={styles.securityIcon}>🛡</div>
            <div>
              <div style={styles.securityTitle}>Your Security is Our Top Priority</div>
              <div style={styles.securityDesc}>
                All transactions are secure and encrypted with 256-bit SSL.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "24px",
    maxWidth: "1100px",
    margin: "0 auto",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },
  greeting: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "8px",
    fontWeight: 500,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: "24px",
    alignItems: "start",
  },
  leftPanel: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "28px",
    border: "0.5px solid #e5e7eb",
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#111827",
    marginBottom: "4px",
  },
  pageSub: {
    fontSize: "13px",
    color: "#9ca3af",
    marginBottom: "20px",
  },
  balanceCard: {
    background: "#1a3a2a",
    borderRadius: "14px",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
    marginBottom: "24px",
    minHeight: "110px",
  },
  balanceCardOverlay1: {
    position: "absolute",
    right: "-20px",
    top: "-20px",
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.04)",
  },
  balanceCardOverlay2: {
    position: "absolute",
    right: "40px",
    bottom: "-30px",
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.03)",
  },
  balanceLabel: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.6)",
    marginBottom: "8px",
    letterSpacing: "0.5px",
  },
  balanceRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  balanceAmount: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#fff",
  },
  eyeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    padding: "2px",
    opacity: 0.7,
  },
  walletDeco: {
    position: "absolute",
    right: "24px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "72px",
    opacity: 0.12,
    pointerEvents: "none",
  },
  section: {
    marginBottom: "24px",
  },
  stepTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  stepBadge: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    border: "1.5px solid #111827",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 600,
    flexShrink: 0,
  },
  amountInputWrap: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "12px",
    backgroundColor: "#fff",
  },
  currencyPrefix: {
    padding: "0 14px",
    fontSize: "18px",
    fontWeight: 600,
    color: "#6b7280",
    borderRight: "1px solid #e5e7eb",
    height: "48px",
    display: "flex",
    alignItems: "center",
  },
  amountInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "0 14px",
    fontSize: "15px",
    height: "48px",
    color: "#111827",
    backgroundColor: "transparent",
  },
  quickAmounts: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  quickBtn: {
    padding: "7px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "20px",
    background: "#fff",
    fontSize: "13px",
    cursor: "pointer",
    color: "#374151",
    fontWeight: 500,
    transition: "all 0.15s",
  },
  quickBtnActive: {
    background: "#1a3a2a",
    color: "#fff",
    borderColor: "#1a3a2a",
  },
  paymentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },
  paymentCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "14px",
    cursor: "pointer",
    backgroundColor: "#fff",
    transition: "all 0.15s",
  },
  paymentCardSelected: {
    border: "1.5px solid #2d6a4f",
    backgroundColor: "#f0faf4",
  },
  paymentIcon: {
    fontSize: "22px",
    marginBottom: "10px",
  },
  paymentName: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#111827",
    marginBottom: "4px",
  },
  paymentDesc: {
    fontSize: "11px",
    color: "#6b7280",
    lineHeight: 1.4,
    marginBottom: "8px",
  },
  paymentTime: {
    display: "inline-block",
    fontSize: "10px",
    background: "#f3f4f6",
    borderRadius: "10px",
    padding: "2px 8px",
    color: "#6b7280",
  },
  ctaBtn: {
    width: "100%",
    padding: "16px",
    background: "#1a3a2a",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.3px",
  },
  rightPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  panelCard: {
    background: "#fff",
    border: "0.5px solid #e5e7eb",
    borderRadius: "16px",
    padding: "16px 18px",
  },
  panelTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
    marginBottom: "14px",
  },
  txItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 0",
    borderBottom: "0.5px solid #f3f4f6",
  },
  txIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    flexShrink: 0,
  },
  txIconFunding: {
    background: "#e8f5ee",
    color: "#2d6a4f",
  },
  txIconPayment: {
    background: "#f0edfb",
    color: "#6b54c7",
  },
  txMeta: {
    flex: 1,
  },
  txName: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#111827",
  },
  txDate: {
    fontSize: "11px",
    color: "#9ca3af",
    marginTop: "2px",
  },
  txAmount: {
    fontSize: "14px",
    fontWeight: 700,
  },
  txCredit: {
    color: "#2d6a4f",
  },
  txDebit: {
    color: "#c94040",
  },
  tipsCard: {
    background: "#f7f9fb",
    border: "0.5px solid #e5e7eb",
    borderRadius: "16px",
    padding: "16px 18px",
  },
  tipsTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
    marginBottom: "10px",
  },
  tipItem: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "7px",
    lineHeight: 1.4,
  },
  securityCard: {
    background: "#fff",
    border: "0.5px solid #e5e7eb",
    borderRadius: "16px",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  securityIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#e8f1fb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  },
  securityTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#111827",
    marginBottom: "3px",
  },
  securityDesc: {
    fontSize: "11px",
    color: "#6b7280",
    lineHeight: 1.4,
  },
};
