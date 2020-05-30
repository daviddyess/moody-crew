import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Pagination, Row } from 'react-bootstrap';
import Loading from 'components/Loading';
import { actions as statsActions } from 'redux/reducers/stats';
import { getPager, getStats, isLoading } from 'redux/selectors/stats';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Stats extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object,
    collection: PropTypes.array,
    pager: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.navigatePager = this.navigatePager.bind(this);
  }

  componentDidMount() {
    const {
      actions,
      match: {
        params: { page }
      }
    } = this.props;

    actions.requestStats({ page: page || 1 });
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  get pager() {
    const {
      pager: { pages, page }
    } = this.props;
    const queryParams = this.queryParams;
    let active = page || queryParams?.p || 1;
    let items = [];

    if (page > 2) {
      items.push(
        <Pagination.Item
          as={Link}
          to={`/stats/${1}`}
          onClick={() => this.navigatePager(1)}
        >
          <FontAwesomeIcon icon="angle-double-left" />
        </Pagination.Item>
      );
      items.push(
        <Pagination.Item
          as={Link}
          to={`/stats/${page - 1}`}
          onClick={() => this.navigatePager(page - 1)}
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
          onClick={() => this.navigatePager(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (page < pages - 1) {
      items.push(
        <Pagination.Item
          as={Link}
          to={`/stats/${page + 1}`}
          onClick={() => this.navigatePager(page + 1)}
        >
          <FontAwesomeIcon icon="chevron-right" />
        </Pagination.Item>
      );
      items.push(
        <Pagination.Item
          as={Link}
          to={`/stats/${pages}`}
          onClick={() => this.navigatePager(pages)}
        >
          <FontAwesomeIcon icon="angle-double-right" />
        </Pagination.Item>
      );
    }

    return items;
  }

  navigatePager(Page) {
    const {
      actions,
      pager: { page }
    } = this.props;
    console.log(`page: ${page}`);
    console.log(`Page: ${Page}`);
    if (page !== Page) {
      actions.requestStats({ page: Page });
    }
  }

  time(time) {
    time = time / 60 / 60;
    return time.toFixed(2);
  }

  render() {
    const {
      collection,
      loading,
      pager: { pages, page, count }
    } = this.props;

    return (
      <Container fluid>
        <Helmet title="Stats" />
        <h1>Stats</h1>
        <Breadcrumbs active="Player Stats" />
        {!loading ? (
          <Fragment>
            {collection?.map && collection.length > 0 ? (
              <Fragment>
                <Row className="mb-2">
                  <Col>{count} Players since last reset.</Col>
                  <Col className="text-right">
                    Page {page} / {pages}
                  </Col>
                </Row>

                <Row>
                  {collection.map((player, index) => {
                    const rank = Number(page) * 20 - 20 + index + 1;
                    return (
                      <Col md="6" key={`stats-${index}`}>
                        <Card className="mb-2">
                          <Card.Header>
                            <span className="h6 mr-3">#{rank} </span>
                            <Link to={`/player/${player.id}`} className="h5">
                              {player.name}
                            </Link>
                            <span className="ml-3">
                              <span className="p-1"> Score:</span>{' '}
                              <span className="font-weight-bold h5">
                                {player.score}
                              </span>
                            </span>
                          </Card.Header>
                          <Card.Body>
                            <span className="pl-2">
                              <span className="font-weight-bold  border border-danger bg-danger p-1">
                                {' '}
                                Kills:
                              </span>{' '}
                              <span className="p-1 border border-danger">
                                {player.kills}
                              </span>
                            </span>
                            <span className="pl-2">
                              <span className="font-weight-bold  border border-warning bg-warning p-1">
                                {' '}
                                Deaths:
                              </span>{' '}
                              <span className="p-1 border border-warning">
                                {player.deaths}
                              </span>
                            </span>
                            <span className="pl-2">
                              <span className="font-weight-bold border border-light bg-primary p-1">
                                {' '}
                                Time:
                              </span>{' '}
                              <span className="p-1 border border-light">
                                {this.time(player.connected)} hrs
                              </span>
                            </span>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Fragment>
            ) : null}
            {collection.length === 0 ? (
              <Card text="info" border="info" className="mt-2 mb-2">
                <Card.Body>
                  <Card.Title>No Stats Available</Card.Title>
                </Card.Body>
              </Card>
            ) : null}
          </Fragment>
        ) : (
          <Loading />
        )}
        {pages && pages > 1 ? (
          <Fragment>
            <Row className="justify-content-md-center mt-4">
              <Col md="auto">
                <Pagination>{this.pager}</Pagination>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>Total: {count}</Col>
              <Col className="text-right">
                Page {page} / {pages}
              </Col>
            </Row>
          </Fragment>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: isLoading(state),
  collection: getStats(state),
  pager: getPager(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...statsActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
