import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, Col, Container, Row } from 'react-bootstrap';
import GameServer from 'components/GameServer';

const Home = () => {
  return (
    <Container fluid>
      <Helmet title="Home" />

      <Row>
        <Col>
          <h4 className="text-center mt-2">Game Server</h4>
          <GameServer host="css.moodycrew.us" type="css" />
        </Col>
        <Col>
          <h4 className="text-center mt-2">CSS Server Features</h4>
          <Card>
            <Card.Body>
              * All Official CS:S Maps enabled + 25 Custom Maps * Classic
              Counter-Strike Team Play * GunGame Team Deathmatch by choosing any
              gg_* Map * Per-map optimized settings * Player Stats and Ranking *
              Damage Report * Last Man Standing - Knife Fight * Rock the Vote,
              Map Voting, Map Nominations * No Block enabled
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
