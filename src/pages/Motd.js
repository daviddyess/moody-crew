import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import ServerRules from 'components/Rules';
import ServerNews from 'components/News';

const Home = () => {
  return (
    <Container fluid>
      <Helmet title="Welcome" />
      <Row className="mt-4">
        <Col>
          <ServerRules />
        </Col>
        <Col>
          <ServerNews />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
