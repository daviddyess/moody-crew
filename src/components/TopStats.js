import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'graphql-hooks';
import { Card, Col, Row } from 'react-bootstrap';
import Loading from 'components/Loading';

const TopStats = ({ count = 10 }) => {
  const [stats, setStats] = useState(false);
  const page = 1;

  const { loading, data } = useQuery(
    `query players($count: Int, $page: Int) {
      players(count: $count, page: $page) {
        storage
        totalCount
        count
        nodes {
          id
          steam
          name
          score
          kills
          deaths
          connected
        }
      }
    }`,
    {
      variables: {
        count,
        page
      }
    }
  );

  useEffect(() => {
    if (data) {
      setStats(data?.players?.nodes);
    }
  }, [data]);

  const time = (sec) => {
    const hours = sec / 60 / 60;

    return hours.toFixed(2);
  };

  const kd = (kills, deaths) => {
    const ratio = kills / deaths;

    return ratio.toFixed(2);
  };

  return (
    <Card className="mb-2">
      <Card.Header className="h4">
        Top 10 Players
        <Link to={`/stats`} className="h6 ps-4">
          View More
        </Link>
      </Card.Header>
      <Card.Body>
        {!loading ? (
          <>
            {stats?.map && stats?.length > 0 ? (
              <>
                <Row>
                  {stats?.map((player, index) => {
                    const rank = Number(page) * 20 - 20 + index + 1;

                    return (
                      <Col md="6" key={`stats-${index}`}>
                        <Card className="mb-2 border-secondary">
                          <Card.Header>
                            <Row>
                              <Col md="auto">
                                <span className="h6 me-3">#{rank}</span>
                                <Link
                                  to={`/player/${player.id}`}
                                  className="h5"
                                >
                                  {player.name}
                                </Link>
                              </Col>
                              <Col md="auto">
                                <span className="p-1"> Score:</span>{' '}
                                <span className="font-weight-bold h5">
                                  {player.score}
                                </span>
                              </Col>
                            </Row>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col md="auto" className="p-2">
                                <span className="font-weight-bold  border border-light bg-light p-1 text-dark">
                                  {' '}
                                  K/D:
                                </span>{' '}
                                <span className="p-1 border border-light">
                                  {kd(player.kills, player.deaths)}
                                </span>
                              </Col>
                              <Col md="auto" className="p-2">
                                <span className="font-weight-bold  border border-danger bg-danger p-1">
                                  {' '}
                                  Kills:
                                </span>{' '}
                                <span className="p-1 border border-danger">
                                  {player.kills}
                                </span>
                              </Col>
                              <Col md="auto" className="p-2">
                                <span className="font-weight-bold  border border-warning bg-warning p-1">
                                  {' '}
                                  Deaths:
                                </span>{' '}
                                <span className="p-1 border border-warning">
                                  {player.deaths}
                                </span>
                              </Col>
                              <Col md="auto" className="p-2">
                                <span className="font-weight-bold border border-primary bg-primary p-1">
                                  {' '}
                                  Time:
                                </span>{' '}
                                <span className="p-1 border border-primary">
                                  {time(player.connected)} hrs
                                </span>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </>
            ) : null}
            {stats?.length === 0 ? (
              <Card text="info" border="info" className="mt-2 mb-2">
                <Card.Body>
                  <Card.Title>No Stats Available</Card.Title>
                </Card.Body>
              </Card>
            ) : null}
          </>
        ) : (
          <Loading />
        )}
      </Card.Body>
    </Card>
  );
};

TopStats.propTypes = {
  count: PropTypes.number
};

export default TopStats;
