import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'graphql-hooks';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import Loading from 'components/Loading';

const GameServer = ({ type, host }) => {
  const [server, setServer] = useState();

  const { loading, data } = useQuery(
    `query server($type: String, $host: String) {
      server(type: $type, host: $host) {
        name
        map
        password
        maxplayers
        connect
        ping
        raw {
          game
          numplayers
          numbots
          secure
          tags {
            tag
          }
          rules {
            bot_quota
            gungame_enabled
            mp_friendlyfire
            sm_nextmap
          }
        }
        players {
          name
          raw {
            score
            time
          }
        }
        bots {
          name
          raw {
            score
            time
          }
        }
      }
    }`,
    {
      variables: {
        type,
        host
      }
    }
  );

  useEffect(() => {
    if (data) {
      setServer(data?.server);
    }
  }, [data]);

  return !loading ? (
    <>
      {server?.name ? (
        <Card>
          <Card.Header>{server?.name}</Card.Header>
          <ListGroup>
            <ListGroup.Item>
              <span className="font-weight-bold">{server?.raw?.game}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} sm={12} xs={'auto'}>
                  <span>Status: </span>
                  <span className="text-success font-weight-bold">Online</span>
                </Col>
                <Col md={4} sm={12} xs={'auto'}>
                  <span>GunGame: </span>
                  {server?.raw?.rules?.gungame_enabled === 1 ? (
                    <span className="text-success font-weight-bold">On</span>
                  ) : (
                    <span className="text-danger font-weight-bold">Off</span>
                  )}
                </Col>
                <Col md={4} sm={12} xs={'auto'}>
                  <span>Friendly Fire: </span>
                  {server?.raw?.rules?.mp_friendlyfire === 1 ? (
                    <span className="text-success font-weight-bold">On</span>
                  ) : (
                    <span className="text-danger font-weight-bold">Off</span>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} sm={12} xs={'auto'}>
                  <span>Map: </span>
                  <span className="font-weight-bold text-success">
                    {server?.map}
                  </span>
                </Col>
                <Col md={4} sm={12} xs={'auto'}>
                  <span>Next Map: </span>
                  <span className="font-weight-bold text-warning">
                    {server?.raw?.rules?.sm_nextmap}
                  </span>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={6} sm={12} xs={'auto'}>
                  Players:{' '}
                  <span className="ms-2 font-weight-bold">
                    {server?.raw?.numplayers - server?.raw?.numbots} /{' '}
                    {server?.maxplayers}
                  </span>
                  {server?.raw?.numplayers - server?.raw?.numbots > 0 ? (
                    <ListGroup className="mt-1">
                      {server?.players.map((player, index) => {
                        return (
                          <ListGroup.Item key={index}>
                            {player.name}{' '}
                            <span className="ms-3">
                              <span className="font-weight-light text-muted">
                                Score:
                              </span>{' '}
                              <span className="ms-1">{player?.raw?.score}</span>
                            </span>
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  ) : null}
                </Col>
                <Col md={6} sm={12} xs={'auto'}>
                  Bots:{' '}
                  <span className="ms-2 font-weight-bold">
                    {server?.raw?.numbots} / {server?.raw?.rules?.bot_quota}
                  </span>
                  {server?.raw?.numbots > 0 ? (
                    <ListGroup className="mt-1">
                      {server?.bots.map((player, index) => {
                        return (
                          <ListGroup.Item key={index}>
                            {player.name}{' '}
                            <span className="ms-3">
                              <span className="font-weight-light text-muted">
                                Score:
                              </span>{' '}
                              <span className="ms-1">{player?.raw?.score}</span>
                            </span>
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  ) : null}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={6} sm={12} xs={'auto'}>
                  <span>Address: </span>
                  <span className="ms-2 font-weight-bold">
                    {server?.connect}
                  </span>
                </Col>
                <Col md={6} sm={12} xs={'auto'}>
                  <span>Avg Ping: </span>
                  <span className="ms-2 font-weight-bold">{server?.ping}</span>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      ) : (
        <Card>
          <Card.Header>
            {host} is currently{' '}
            <span className="ms-2 text-danger font-weight-bold">Offline</span>
          </Card.Header>
          <Card.Body>
            The server is likely down for maintenance, it will restart soon.
          </Card.Body>
        </Card>
      )}
    </>
  ) : (
    <Loading />
  );
};

GameServer.propTypes = {
  type: PropTypes.string,
  host: PropTypes.string
};

export default GameServer;
