import { useState } from "react";

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
      <nav className="navbar fixed-top">
        {["home", "budget", "history", "analytics", "export"].map((s) => (
          <button
            key={s}
            className="btn btn-outline-light btn-sm"
            onClick={() => setSection(s)}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </nav>

      {/* HOME */}
      {section === "home" && (
        <Section bg="/home.jpg">
          <div className="app">
            <h2>Expense Tracker</h2>
            <p>Managing money becomes easier when you track it properly.</p>
            <p>This app helps you record daily expenses with ease.</p>
            <p>You can set weekly budgets to control overspending.</p>
            <p>All records are stored for future reference.</p>
            <p>Analytics give clear insights into spending habits.</p>
            <p>Simple, clean, and practical for real-life use.</p>
          </div>
        </Section>
      )}

      {/* BUDGET */}
      {section === "budget" && (
        <Section bg="/budget.jpg">
          <div className="app mb-3">
            <h4>Set Weekly Budget</h4>
            <input
              className="form-control"
              type="number"
              placeholder="Enter weekly budget"
              value={weeklyBudget}
              onChange={(e) => setWeeklyBudget(e.target.value)}
            />
            <p className="safe mt-2">Current Budget: ₹{weeklyBudget}</p>
            {weeklyBudget && total > weeklyBudget && (
              <p className="warning">⚠ Budget exceeded</p>
            )}
          </div>

          <div className="app">
            <h4>Add Expenditure</h4>
            <form onSubmit={addExpense} className="d-grid gap-2">
              <input
                className="form-control"
                placeholder="Expense name"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <input
                className="form-control"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <input
                className="form-control"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button className="btn btn-primary">Add Expense</button>
            </form>
          </div>
        </Section>
      )}

      {/* HISTORY */}
      {section === "history" && (
        <Section bg="/history.jpg">
          <div className="app">
            <h3>History</h3>
            <ul>
              {expenses.map((e, i) => (
                <li key={i}>
                  <span classname ="desc">{e.desc}</span> – <span classname ="ammount">₹{e.amount}</span>
                  <span className="date">{e.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* ANALYTICS */}
      {section === "analytics" && (
        <Section bg="/analytics.jpg">
          <div className="app">
            <h3>Analytics</h3>
            <p>Total Spent: ₹{total}</p>
            <p>Total Items Purchased: {expenses.length}</p>
          </div>
        </Section>
      )}

      {/* EXPORT */}
      {section === "export" && (
        <Section bg="/export.jpg">
          <div className="app">
            <h3>Export Data</h3>
            <button className="btn btn-success w-100" onClick={exportData}>
              Download JSON
            </button>
          </div>
        </Section>
      )}
    </>
  );
}

/* SECTION COMPONENT */
function Section({ bg, children }) {
  return (
    <section
      className="section slide-in"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {children}
    </section>
  );
}
