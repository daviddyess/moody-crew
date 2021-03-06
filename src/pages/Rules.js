import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import ServerRules from 'components/Rules';

class Rules extends Component {
  render() {
    return (
      <Container fluid>
        <Helmet title="Home" />
        <Row className="mt-4">
          <Col>
            <ServerRules />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Rules;
