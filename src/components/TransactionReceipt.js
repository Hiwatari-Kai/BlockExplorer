import { useEffect, useState } from "react";
import alchemy from "../config";
import { utils } from "ethers";
import { Container, Row, Col } from "react-bootstrap";

const TransactionReceipt = ({ transactionHash }) => {
  const [transactionReceipt, setTransactionReceipt] = useState({});

  useEffect(() => {
    async function getTransactionReceipt() {
      const res = await alchemy.core.getTransactionReceipt(transactionHash);
      setTransactionReceipt(res);
    }
    getTransactionReceipt();
  }, [transactionHash]);
    
  return (
    <div className="receipt-grid">
      <p className="primary-heading">Transaction</p>
      <Container>
        <Row>
          <Col xs={4}>
            <p className="receipt-col">Block Number</p>
          </Col>
          <Col>{transactionReceipt?.blockNumber}</Col>
        </Row>
        <Row>
          <Col xs={4}>
            <p className="receipt-col">Gas Used</p>
          </Col>
          <Col>
            {transactionReceipt?.gasUsed
              ? parseInt(transactionReceipt.gasUsed._hex)
              : ""}
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <p className="receipt-col">To</p>
          </Col>
          <Col>{transactionReceipt?.to}</Col>
        </Row>
        <Row>
          <Col xs={4}>
            <p className="receipt-col">From</p>
          </Col>
          <Col>{transactionReceipt?.from}</Col>
        </Row>
        <Row>
          <Col xs={4}>
            <p className="receipt-col">Transaction Fee</p>
          </Col>
          <Col>
            {transactionReceipt.gasUsed
              ? utils.formatEther(transactionReceipt.effectiveGasPrice._hex) *
                parseInt(transactionReceipt.gasUsed._hex)
              : ""}{" "}
            ETH
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TransactionReceipt;
