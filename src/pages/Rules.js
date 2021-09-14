import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import ServerRules from 'components/Rules';

const Rules = () => {
  return (
    <Container fluid>
      <Helmet title="Home" />
      <Row className="mt-2">
        <Col>
          <ServerRules />
        </Col>
      </Row>
    </Container>
  );
};

export default Rules;
