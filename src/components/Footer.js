import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Footer extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="border-top border-light mt-3 pt-2 pb-2 text-end">
          <Col md="6" className="text-start">
            <p>&copy; 2020-2021 {process.env.REACT_APP_HTML_TITLE}</p>
          </Col>
          <Col md="6" className="text-end">
            Powered by <FontAwesomeIcon color="red" icon={['far', 'heart']} />{' '}
            &amp;{' '}
            <a href="https://github.com/daviddyess/moody-crew">Open Source</a>
          </Col>
        </Row>
      </Container>
    );
  }
}
