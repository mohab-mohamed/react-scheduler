import React from "react";
import { Col, Row, Container } from "../components/Grid";
import CreateTimeDonut from "../components/CreateTimeDonut";


const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <CreateTimeDonut />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
