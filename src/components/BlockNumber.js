import { useEffect } from "react";
import alchemy from "../config";
import { Container, Row, Col } from "react-bootstrap";

const BlockNumber = ({ blockNumber, setBlockNumber }) => {
  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);

  return (
    <div className="block-number card">
      <Container fluid={true}>
        <Row>
          <Col xs={8}>
            <p className="block-number__text">Current Block Number</p>
          </Col>
          <Col className="block-number__count">
            <p>{blockNumber}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlockNumber;
