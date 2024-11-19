import AtomicSpinner from "atomic-spinner";
import { Col, Container, Row } from "react-bootstrap";

const Loading = () => {
  return (
    <Container
      fluid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Row>
        <Col>
          <AtomicSpinner />
        </Col>
      </Row>
    </Container>
  );
};
export default Loading;
