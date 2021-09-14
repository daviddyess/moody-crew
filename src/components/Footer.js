import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Footer extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="border-top border-primary mt-2">
          <Col md="6" className="text-start text-warning">
            &copy; 2020-2021 {process.env.REACT_APP_HTML_TITLE}
          </Col>
          <Col md="6" className="text-end align-middle">
            Powered by <FontAwesomeIcon color="red" icon={['far', 'heart']} />{' '}
            &amp;{' '}
            <a href="https://github.com/daviddyess/moody-crew">Open Source</a>
          </Col>
        </Row>
      </Container>
    );
  }
}
