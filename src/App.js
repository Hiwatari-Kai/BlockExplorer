import { useState } from "react";
import BlockNumber from "./components/BlockNumber";
import Blocks from "./components/Blocks";
import Transactions from "./components/Transactions";
import TransactionReceipt from "./components/TransactionReceipt";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactionHash, setTransactionHash] = useState("");
  const [inputBlock, setInputBlock] = useState(0);

  const formSubmit = (event) => {
    event.preventDefault();
    setBlockNumber(parseInt(inputBlock));
  };

  return (
    <div className="">
      <div className="header">
        <img
          src={require("./images/surfing-board.png")}
          className="header__image"
        />
        <p className="header__heading"> BLOCK-SURFER</p>
      </div>
      <Form onSubmit={formSubmit}>
        <Form.Group className="mb-3 block-input">
          <Form.Control
            onChange={(e) => setInputBlock(e.target.value)}
            placeholder="Type a block number..."
          />
        </Form.Group>
        <Button  type="submit" className="btn">
          Search
        </Button>
      </Form>

      <BlockNumber setBlockNumber={setBlockNumber} blockNumber={blockNumber} />
      <div>
        <Container fluid={true}>
          <Row>
            <Col>
              {blockNumber ? (
                <Blocks
                  blockNumber={blockNumber}
                  setBlockNumber={setBlockNumber}
                />
              ) : null}
            </Col>
            <Col>
              <Transactions
                blockNumber={blockNumber}
                setTransactionHash={setTransactionHash}
              />
              <TransactionReceipt transactionHash={transactionHash} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
