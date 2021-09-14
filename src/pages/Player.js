import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'graphql-hooks';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Loading from 'components/Loading';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Player = ({ match }) => {
  const [stats, setStats] = useState();
  const [steam, setSteam] = useState();
  const [id] = useState(match.params.id);

  const { loading, data } = useQuery(
    `query player($id: Int) {
      player(id: $id) {
        steam {
          steamid
          personaname
          profileurl
          avatar
          avatarfull
          avatarmedium
          lastlogoff
          realname
          primaryclanid
          timecreated
          loccountrycode
          locstatecode
        }
        stats {
          id
          name
          steam
          lastip
          connected
          lastconnect
          deaths
          score
          kills
          shots
          hits
          headshots
          suicides
          tk
          rounds_tr
          rounds_ct
          knife
          glock
          usp
          p228
          deagle
          elite
          fiveseven
          m3
          xm1014
          mac10
          tmp
          mp5navy
          ump45
          p90
          galil
          ak47
          sg550
          famas
          m4a1
          aug
          scout
          sg552
          awp
          g3sg1
          m249
          hegrenade
          flashbang
          smokegrenade
          head
          chest
          stomach
          left_arm
          right_arm
          left_leg
          right_leg
          c4_planted
          c4_exploded
          c4_defused
          ct_win
          tr_win
          hostages_rescued
        }
      }
    }`,
    {
      variables: {
        id: Number(id)
      }
    }
  );

  useEffect(() => {
    if (data) {
      setStats(data?.player?.stats);
      setSteam(data?.player?.steam);
    }
  }, [data]);

  const time = (sec) => {
    const hour = sec / 60 / 60;

    return hour.toFixed(2);
  };

  return (
    <Container fluid>
      {!loading ? (
        <>
          <Helmet title={`${stats?.name} | Stats`} />
          {stats?.id ? (
            <>
              <h1 className="bg-secondary ps-2">{stats.name}</h1>

              <Breadcrumbs
                links={[{ name: 'Player Stats', url: '/stats' }]}
                active={stats.name}
              />
              <Row>
                <Col md="auto">
                  <Card className="mb-2" bg="primary">
                    <Card.Img variant="top" src={steam.avatarfull} />
                    <Card.Body className="text-center">
                      <h5>
                        <span className="h3 mx-2">{stats.score}</span>
                        Points
                      </h5>
                      <a
                        href={steam.profileurl}
                        className="text-light text-decoration-none"
                      >
                        <FontAwesomeIcon size="3x" icon={['fab', 'steam']} />
                        <br />
                        Steam Profile
                      </a>
                    </Card.Body>
                  </Card>

                  <Card className="mb-2" bg="secondary">
                    <Card.Body>
                      <h5>
                        Played
                        <span className="h3 mx-2">
                          {time(stats.connected)}
                        </span>{' '}
                        Hours
                      </h5>
                    </Card.Body>
                  </Card>

                  <Card className="mb-2" bg="danger">
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2">{stats.kills}</span>
                        Kills
                      </h5>
                    </Card.Body>
                  </Card>

                  <Card className="mb-2" bg="dark">
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2">{stats.deaths}</span>
                        Deaths
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="auto">
                  <Card className="mb-2" bg="light" border="danger" text="dark">
                    <Card.Header className="bg-danger text-light">
                      <h4>Terrorist</h4>
                    </Card.Header>
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2 text-danger">
                          {stats.rounds_tr}
                        </span>{' '}
                        Rounds
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-danger">
                          {stats.tr_win}
                        </span>{' '}
                        Wins
                      </h5>
                      <h5>
                        Planted{' '}
                        <span className="h3 mx-2 text-danger">
                          {stats.c4_planted}
                        </span>{' '}
                        Bombs
                      </h5>
                      <h5>
                        Detonated{' '}
                        <span className="h3 mx-2 text-danger">
                          {stats.c4_exploded}
                        </span>{' '}
                        Bombs
                      </h5>
                    </Card.Body>
                  </Card>
                  <Card
                    className="mb-2"
                    bg="light"
                    border="primary"
                    text="secondary"
                  >
                    <Card.Header className="bg-primary text-light">
                      <h4>Counter-Terrorist </h4>
                    </Card.Header>
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2 text-primary">
                          {stats.rounds_ct}
                        </span>{' '}
                        Rounds
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-primary">
                          {stats.ct_win}
                        </span>{' '}
                        Wins
                      </h5>
                      <h5>
                        Defused{' '}
                        <span className="h3 mx-2 text-primary">
                          {stats.c4_defused}
                        </span>{' '}
                        Bombs
                      </h5>
                      <h5>
                        Rescued{' '}
                        <span className="h3 mx-2 text-primary">
                          {stats.hostages_rescued}
                        </span>{' '}
                        Hostages
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="auto">
                  <Card className="mb-2" bg="info">
                    <Card.Body>
                      <h5>
                        Fired
                        <span className="h3 mx-2">{stats.shots}</span>
                        Shots
                      </h5>
                    </Card.Body>
                  </Card>
                  <Card
                    className="mb-2"
                    bg="light"
                    border="success"
                    text="dark"
                  >
                    <Card.Header className="bg-success">
                      <h4>Hits</h4>
                    </Card.Header>
                    <Card.Body>
                      <h5>
                        <span className="h3 mr-2 text-success">
                          {stats.head}
                        </span>{' '}
                        Head
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-success">
                          {stats.chest}
                        </span>{' '}
                        Chest
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-success">
                          {stats.stomach}
                        </span>{' '}
                        Stomach
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-success">
                          {stats.left_arm}
                        </span>{' '}
                        Left Arm
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-success">
                          {stats.right_arm}
                        </span>{' '}
                        Right Arm
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-success">
                          {stats.left_leg}
                        </span>{' '}
                        Left Leg
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-success">
                          {stats.right_leg}
                        </span>{' '}
                        Right Leg
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="auto">
                  <Card className="mb-2" bg="danger">
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2">{stats.hits}</span>
                        Hits
                      </h5>
                    </Card.Body>
                  </Card>
                  <Card
                    className="mb-2"
                    bg="light"
                    border="warning"
                    text="dark"
                  >
                    <Card.Header className="bg-warning">
                      <h4>Kill Types</h4>
                    </Card.Header>
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2 text-warning">
                          {stats.knife}
                        </span>{' '}
                        Melee
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-warning">
                          {stats.headshots}
                        </span>{' '}
                        Headhots
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-warning">
                          {stats.hegrenade}
                        </span>{' '}
                        Grenades
                      </h5>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2" bg="light" text="dark">
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2">{stats.tk}</span>
                        Team Kills
                      </h5>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2" bg="light" text="dark">
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2">{stats.suicides}</span>
                        Suicides
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="auto">
                  <Card className="mb-2" bg="light" border="info" text="dark">
                    <Card.Header className="bg-info">
                      <h4>Handgun Kills</h4>
                    </Card.Header>
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2 text-info">{stats.glock}</span>{' '}
                        Glock
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-info">{stats.usp}</span>{' '}
                        USP
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-info">{stats.p228}</span>{' '}
                        P228
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">
                          {stats.deagle}
                        </span>{' '}
                        Desert Eagle
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-info">{stats.elite}</span>{' '}
                        Duals
                      </h5>
                      <h5>
                        <span className="h3 me-2 text-info">
                          {stats.fiveseven}
                        </span>{' '}
                        Five Seven
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="auto">
                  <Card className="mb-2" bg="light" border="info" text="dark">
                    <Card.Header className="bg-info">
                      <h4>Shotgun Kills</h4>
                    </Card.Header>
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2 text-info">{stats.m3}</span> M3
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">
                          {stats.xm1014}
                        </span>{' '}
                        XM1014
                      </h5>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2" bg="light" border="info" text="dark">
                    <Card.Header className="bg-info">
                      <h4>LMG Kills</h4>
                    </Card.Header>
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2 text-info">{stats.m249}</span>{' '}
                        M249
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="auto">
                  <Card className="mb-2" bg="light" border="info" text="dark">
                    <Card.Header className="bg-info">
                      <h4>SMG Kills</h4>
                    </Card.Header>
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2 text-info">{stats.mac10}</span>{' '}
                        MAC10
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">{stats.tmp}</span>{' '}
                        TMP
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">
                          {stats.mp5navy}
                        </span>{' '}
                        MP5
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">{stats.ump45}</span>{' '}
                        UMP 45
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">{stats.p90}</span>{' '}
                        P90
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="auto">
                  <Card className="mb-2" bg="light" border="info" text="dark">
                    <Card.Header className="bg-info">
                      <h4>Rifle Kills</h4>
                    </Card.Header>
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2 text-info">{stats.galil}</span>{' '}
                        Galil
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">{stats.ak47}</span>{' '}
                        AK47
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">{stats.sg550}</span>{' '}
                        SG550
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">{stats.aug}</span>{' '}
                        AUG
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">{stats.famas}</span>{' '}
                        Famas
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">{stats.m4a1}</span>{' '}
                        M4A1
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="auto">
                  <Card className="mb-2" bg="light" border="info" text="dark">
                    <Card.Header className="bg-info">
                      <h4>Sniper Kills</h4>
                    </Card.Header>
                    <Card.Body>
                      <h5>
                        <span className="h3 me-2 text-info">{stats.scout}</span>{' '}
                        Scout
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">{stats.sg552}</span>{' '}
                        SG552
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">{stats.awp}</span>{' '}
                        AWP
                      </h5>

                      <h5>
                        <span className="h3 me-2 text-info">{stats.g3sg1}</span>{' '}
                        G3SG1
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            <Card text="info" border="info" className="mt-2 mb-2">
              <Card.Body>
                <Card.Title>Player not found</Card.Title>
              </Card.Body>
            </Card>
          )}
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

Player.propTypes = {
  match: PropTypes.object
};

export default Player;
