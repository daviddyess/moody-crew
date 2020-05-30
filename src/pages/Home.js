import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import CSGOServerStatus from 'components/CSGOServerStatus';
import CSSServerStatus from 'components/CSSServerStatus';

class Home extends Component {
  render() {
    return (
      <Container fluid>
        <Helmet title="Home" />
        <h3 className="text-center mt-2">Game Servers</h3>
        <Row>
          <Col>
            <CSSServerStatus server={{ host: 'css.moodycrew.us' }} />
          </Col>
          <Col>
            <CSGOServerStatus server={{ host: 'csgo.moodycrew.us' }} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
