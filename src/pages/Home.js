import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkReact from 'remark-react';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Card, Col, Container, Row } from 'react-bootstrap';
import CSSServerStatus from 'components/CSSServerStatus';

class Home extends Component {
  render() {
    return (
      <Container fluid>
        <Helmet title="Home" />

        <Row>
          <Col>
            <h4 className="text-center mt-2">Game Server</h4>
            <CSSServerStatus server={{ host: 'css.moodycrew.us' }} />
          </Col>
          <Col>
            <h4 className="text-center mt-2">CSS Server Features</h4>
            <Card>
              <Card.Body>
                {
                  unified()
                  .use(remarkParse)
                  .use(remarkReact, React)
                  .processSync(
                    `* All Official CS:S Maps enabled + 25 Custom Maps
* Classic Counter-Strike Team Play
* GunGame Team Deathmatch by choosing any gg_* Map
* Per-map optimized settings
* Player Stats and Ranking
* Damage Report
* Last Man Standing - Knife Fight
* Rock the Vote, Map Voting, Map Nominations
* No Block enabled
`
                  ).result
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
