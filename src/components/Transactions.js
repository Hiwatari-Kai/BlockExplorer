import { useEffect, useState } from "react";
import alchemy from "../config";
import { utils } from "ethers";
import { Table } from "react-bootstrap";

const Transactions = ({ blockNumber, setTransactionHash }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getTransactions() {
      const res = await alchemy.core.getBlockWithTransactions(blockNumber);
      setTransactions(res?.transactions);
      setTransactionHash(res?.transactions[0]?.hash);
    }

    getTransactions();
  }, [blockNumber]);
  return (
    <div className="card">
      <p className="primary-heading">Current Block Transactions</p>

      <div className="transactions-table">
        <Table striped hover>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Value (in ETH)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                onClick={() => setTransactionHash(transaction.hash)}
                key={transaction.hash}
                className="table-row"
              >
                <td>{transaction.from?.slice(0, 15)}...</td>
                <td>{transaction.to?.slice(0, 15)}...</td>
                <td>
                  <p className="amount">
                    {utils.formatEther(transaction.value._hex)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Transactions;
