

import { useState } from "react";
import "./App.css";

export default function App() {
  const [section, setSection] = useState("home");

  const [weeklyBudget, setWeeklyBudget] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [expenses, setExpenses] = useState([]);

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const addExpense = (e) => {
    e.preventDefault();
    if (!desc || !amount || !date) return;

    setExpenses([...expenses, { desc, amount: Number(amount), date }]);
    setDesc("");
    setAmount("");
    setDate("");
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(expenses)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "expenses.json";
    a.click();
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <button onClick={() => setSection("home")}>Home</button>
        <button onClick={() => setSection("budget")}>Budget</button>
        <button onClick={() => setSection("history")}>History</button>
        <button onClick={() => setSection("analytics")}>Analytics</button>
        <button onClick={() => setSection("export")}>Export</button>
      </nav>

      {/* HOME */}
      {section === "home" && (
        <Section bg="/home.jpg" className="section section-animate active">
          <div className="app">
            <h2>Expense Tracker</h2>
            <p>Managing money becomes easier when you track it properly.</p>
            <p>This expense tracker allows users to record daily expenses.</p>
            <p>A weekly budget can be set to control overspending.</p>
            <p>All transactions are stored safely for future reference.</p>
            <p>The analytics section provides spending insights.</p>
            <p>Simple design, practical use, and real-life application.</p>
          </div>
        </Section>
      )}

      {/* BUDGET */}
      {section === "budget" && (
        <Section bg="/budget.jpg" className="section section-animate active">
          <div className="app">
            <h3>Set Weekly Budget</h3>
            <input
              type="number"
              placeholder="Enter weekly budget"
              value={weeklyBudget}
              onChange={(e) => setWeeklyBudget(e.target.value)}
            />
            <p className="safe">Current Budget: ₹{weeklyBudget}</p>
            {weeklyBudget && total > weeklyBudget && (
              <p className="warning">⚠ Budget Exceeded</p>
            )}
          </div>

          <div className="app">
            <h3>Add Expenditure</h3>
            <form onSubmit={addExpense}>
              <input
                placeholder="Expense name"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button>Add Expense</button>
            </form>
          </div>
        </Section>
      )}

      {/* HISTORY */}
      {section === "history" && (
        <Section bg="/history.jpg" className="section section-animate active">
          <div className="app">
            <h2>History</h2>
            {expenses.length === 0 ? (
              <p>No purchases yet.</p>
            ) : (
              <ul>
                {expenses.map((e, i) => (
                  <li key={i}>
                    {e.desc} – ₹{e.amount} <span className="date">{e.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Section>
      )}

      {/* ANALYTICS */}
      {section === "analytics" && (
        <Section bg="/analytics.jpg" className="section section-animate active">
          <div className="app">
            <h2>Analytics</h2>
            <p>Total Spent: ₹{total}</p>
            <p>Total Items Purchased: {expenses.length}</p>
          </div>
        </Section>
      )}

      {/* EXPORT */}
      {section === "export" && (
        <Section bg="/export.jpg" className="section section-animate active">
          <div className="app">
            <h2>Export Data</h2>
            <button onClick={exportData}>Download JSON</button>
          </div>
        </Section>
      )}
    </>
  );
}

/* SECTION WRAPPER */
function Section({ bg, className = "", children }) {
  return (
    <section
      className={className}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </section>
  );
}
