import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'graphql-hooks';
import { Card, ListGroup } from 'react-bootstrap';
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
              Status:{' '}
              <span className="ms-2 text-success font-weight-bold">Online</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Map: <span className="ms-2 font-weight-bold">{server?.map}</span>
            </ListGroup.Item>
            <ListGroup.Item>
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
                          <span className="ms-1">{player.score}</span>
                        </span>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              ) : null}
            </ListGroup.Item>
            <ListGroup.Item>
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
                          <span className="ms-1">{player.raw.score}</span>
                        </span>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              ) : null}
            </ListGroup.Item>
            <ListGroup.Item>
              Address:{' '}
              <span className="ms-2 font-weight-bold">{server?.connect}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Avg Ping:{' '}
              <span className="ms-2 font-weight-bold">{server?.ping}</span>
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
