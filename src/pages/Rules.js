import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Card, Col, Container, Row } from 'react-bootstrap';

class Rules extends Component {
  render() {
    return (
      <Container fluid>
        <Helmet title="Home" />
        <Row className="mt-4">
          <Col>
            <Card className="mb-2">
              <Card.Header className="h3">Server Rules</Card.Header>
              <Card.Body>
                <ol>
                  <li className="p-2">No Racism</li>
                  <li className="p-2">No Profanity</li>
                  <li className="p-2">No Cheating/Hacks</li>
                  <li className="p-2">
                    No Intentional Team Killing{' '}
                    <ul>
                      <li>Server auto-slays the next round for any TK</li>
                    </ul>
                  </li>
                </ol>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Rules;
