import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, Col, Container, Row } from 'react-bootstrap';
import GameServer from 'components/GameServer';

const Home = () => {
  return (
    <Container fluid>
      <Helmet title="Home" />

      <Row>
        <Col md={6} sm={12} xs={12}>
          <h4 className="text-center mt-2">Game Server</h4>
          <GameServer host="css.moodycrew.us" type="css" />
        </Col>
        <Col md={6} sm={12} xs={12}>
          <h4 className="text-center mt-2">CSS Server Features</h4>
          <Card>
            <Card.Body>
              <ul>
                <li>All Official CS:S Maps enabled + 25 Custom Maps</li>
                <li>Classic Counter-Strike Team Play</li>
                <li>GunGame Team Deathmatch by choosing any gg_* Map</li>
                <li>Per-map optimized settings</li>
                <li>Player Stats and Ranking</li>
                <li>Damage Report</li>
                <li>Last Man Standing - Knife Fight</li>
                <li>Rock the Vote, Map Voting, Map Nominations</li>
                <li>No Block enabled</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
