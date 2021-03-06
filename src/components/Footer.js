import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Footer extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="border-top border-light mt-3 pt-2 pb-2 text-right">
          <Col md="6" className="text-left">
            <p>&copy; 2020 {process.env.REACT_APP_HTML_TITLE}</p>
          </Col>
          <Col md="6" className="text-right">
            Powered by <FontAwesomeIcon color="red" icon={['far', 'heart']} />{' '}
            &amp;{' '}
            <a href="https://github.com/daviddyess/react-boilerplate">
              Open Source
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}
