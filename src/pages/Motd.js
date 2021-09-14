import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import ServerRules from 'components/Rules';
import ServerNews from 'components/News';
import TopStats from 'components/TopStats';

const Home = () => {
  return (
    <Container fluid>
      <Helmet title="Welcome" />
      <Row className="mt-2">
        <Col md={4} sm={12} xs={12}>
          <ServerRules />
          <ServerNews />
        </Col>
        <Col md={8} sm={12} xs={12}>
          <TopStats count={10} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
