import * as React from "react";
import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";
import axios from "axios";

export default function Home({
  transactions,
  setTransactions,
  transfers,
  setTransfers,
  error,
  setError,
  isLoading,
  setIsLoading,
  filterInputValue,
}) {
  React.useEffect(() => {
    fetchTransactionData("http://localhost:3001/bank/transactions");
    fetchTransferData("http://localhost:3001/bank/transfers");
  }, []);

  const fetchTransactionData = async (apiEndpoint) => {
    setIsLoading(true);
    try {
      const res = await axios.get(apiEndpoint);
      setTransactions(res.data.transactions);
    } catch (e) {
      console.log(`Error fetching transaction data ${e}`);
      setError(e);
    }
    setIsLoading(false);
  };

  const fetchTransferData = async (apiEndpoint) => {
    setIsLoading(true);
    try {
      const res = await axios.get(apiEndpoint);
      setTransfers(res.data.transfers);
    } catch (e) {
      console.log(`Error fetching transaction data ${e}`);
      setError(e);
    }
    setIsLoading(false);
  };

  const transactionsToShow = filterInputValue
    ? transactions.filter((trans) =>
        trans.description.toLowerCase().includes(filterInputValue.toLowerCase())
      )
    : transactions;

  console.log("This is transactions", JSON.stringify(transactionsToShow));
  return (
    <div className="home">
      {error ? <h2 className="error">Error</h2> : null}
      <AddTransaction />
      {isLoading ? (
        <h1>Loading... </h1>
      ) : (
        <BankActivity
          transactions={transactionsToShow}
          filterInputValue={transactionsToShow}
          transfers={transactionsToShow}
        />
      )}
    </div>
  );
}
