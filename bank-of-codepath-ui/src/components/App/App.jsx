import * as React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import TransactionalDetail from "../TransactionDetail/TransactionDetail";
import "./App.css";

export default function App() {
  /* useState variables */
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [error, setError] = useState(null);
  const [filterInputValue, setFilterInputValue] = useState("");

  // const handleFilterValue = () => {
  //   setFilterInputValue(filterInputVaue);
  // };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          filterInputValue={filterInputValue}
          setFilterInputValue={setFilterInputValue}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  transactions={transactions}
                  setTransactions={setTransactions}
                  transfers={transfers}
                  setTransfers={setTransfers}
                  error={error}
                  setError={setError}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  filterInputValue={filterInputValue}
                />
              }
            />
            <Route
              path="/transactions/:transactionId"
              element={<TransactionalDetail />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
