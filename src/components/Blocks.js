import { useEffect, useState } from "react";
import alchemy from "../config";
import { Table } from "react-bootstrap";

const Blocks = ({ blockNumber, setBlockNumber }) => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function getBlocks() {
      const arr = [];
      for (let i = 0; i < 12; i++) {
        console.log(blockNumber - i);
        const res = await alchemy.core.getBlock(blockNumber - i);
        arr.push(res);
      }

      setBlocks(arr);
    }
    getBlocks();
  }, [blockNumber]);

  return (
    <div className="card">
      <p className="primary-heading">Latest Blocks</p>
      <div className="blocks-table">
        <Table striped hover>
          <thead>
            <tr>
              <th>Hash</th>
              <th>Transactions</th>
              <th>Block Number</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block) => (
              <tr
                onClick={() => setBlockNumber(block.number)}
                key={block.hash}
                className="table-row"
              >
                <td>{block.hash?.slice(0, 15)}...</td>
                <td>{block.transactions?.length}</td>
                <td>{block.number}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Blocks;
