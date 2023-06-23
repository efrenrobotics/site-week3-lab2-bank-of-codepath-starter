import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatAmount, formatDate } from "../../utils/format";
import "./TransactionDetail.css";

export default function TransactionDetail() {
  const [hasFetched, setHasFetched] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const { transactionId } = useParams("/transactions/:transactionId");

  useEffect(() => {
    const fetchTransactionId = async () => {
      setIsLoading(true);
      setHasFetched(false);
      try {
        const res = await axios.get(`/transactions/${transactionId}`);
        // console.log("this is the res " + res);
        setTransaction(res.data);
        setError(null);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
        setHasFetched(true);
      }
    };
    // console.log(first);
    // console.log("THIS IS THE TRANSACTION " + transaction);
    fetchTransactionId();
  }, [transactionId]);

  return (
    <div className="transaction-detail">
      <TransactionCard
        key={transactionId}
        hasFetched={hasFetched}
        transaction={transaction}
        transactionId={transactionId}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export function TransactionCard({
  transaction,
  // amount,
  // postedAt,
  transactionId,
  hasFetched,
  isLoading,
  error,
}) {
  return (
    <div className="transaction-card card">
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        <p className="category"></p>
      </div>

      <div className="card-content">
        <p className="description"></p>
      </div>

      <div className="card-footer">
        <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>
          {formatAmount(transaction.amount)}
        </p>
        <p className="date">{formatDate(transaction.postedAt)}</p>
      </div>
    </div>
  );
}
