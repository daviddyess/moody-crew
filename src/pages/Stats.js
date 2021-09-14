import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useQuery } from 'graphql-hooks';
import { Card, Col, Container, Pagination, Row } from 'react-bootstrap';
import Loading from 'components/Loading';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Stats = ({ match }) => {
  const [page, setPage] = useState(Number(match?.params?.page) || 1);
  const [count] = useState(20);
  const [stats, setStats] = useState(false);
  const [pages, setPages] = useState(1);

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
      setPages(Math.ceil(data?.players?.totalCount / count));
    }
  }, [data]);

  const pager = () => {
    const active = page;

    const items = [];

    if (page > 2) {
      items.push(
        <Pagination.Item
          as={Link}
          key="first"
          to={`/stats/${1}`}
          onClick={() => setPage(1)}
        >
          <FontAwesomeIcon icon="angle-double-left" />
        </Pagination.Item>
      );
      items.push(
        <Pagination.Item
          as={Link}
          key="previous"
          to={`/stats/${page - 1}`}
          onClick={() => setPage(page - 1)}
        >
          <FontAwesomeIcon icon="chevron-left" />
        </Pagination.Item>
      );
    }

    for (
      let number = page > 5 ? page - 5 : 1;
      number <= pages && number - 5 <= page && number + 5 >= page - 5;
      number++
    ) {
      items.push(
        <Pagination.Item
          as={Link}
          key={number}
          active={number === active}
          to={`/stats/${number}`}
          onClick={() => setPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (page < pages - 1) {
      items.push(
        <Pagination.Item
          as={Link}
          key="next"
          to={`/stats/${page + 1}`}
          onClick={() => setPage(page + 1)}
        >
          <FontAwesomeIcon icon="chevron-right" />
        </Pagination.Item>
      );
      items.push(
        <Pagination.Item
          as={Link}
          key="last"
          to={`/stats/${pages}`}
          onClick={() => setPage(pages)}
        >
          <FontAwesomeIcon icon="angle-double-right" />
        </Pagination.Item>
      );
    }

    return items;
  };

  const time = (sec) => {
    const hours = sec / 60 / 60;

    return hours.toFixed(2);
  };

  const kd = (kills, deaths) => {
    const ratio = kills / deaths;

    return ratio.toFixed(2);
  };

  return (
    <Container fluid>
      <Helmet title="Stats" />
      <h4 className="my-2">Player Stats</h4>
      <Breadcrumbs active="Player Stats" />
      {!loading ? (
        <>
          {stats?.map && stats?.length > 0 ? (
            <>
              <Row className="mb-2">
                <Col>{data?.players?.totalCount} Players since last reset.</Col>
                <Col className="text-end">
                  Page {page} / {pages}
                </Col>
              </Row>

              <Row>
                {stats?.map((player, index) => {
                  const rank = Number(page) * 20 - 20 + index + 1;

                  return (
                    <Col md="6" key={`stats-${index}`}>
                      <Card className="mb-2">
                        <Card.Header>
                          <Row>
                            <Col md="auto">
                              <span className="h6 me-3">#{rank}</span>
                              <Link to={`/player/${player.id}`} className="h5">
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
      {pages && pages > 1 ? (
        <>
          <Row className="justify-content-md-center">
            <Col>Total: {data?.players?.totalCount}</Col>
            <Col md="auto">
              <Pagination>{pager()}</Pagination>
            </Col>
            <Col className="text-end">
              Page {page} / {pages}
            </Col>
          </Row>
        </>
      ) : null}
    </Container>
  );
};

Stats.propTypes = {
  match: PropTypes.object
};

export default Stats;
