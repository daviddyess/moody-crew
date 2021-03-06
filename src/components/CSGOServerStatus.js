import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, Fragment } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Loading from 'components/Loading';
import { actions as serverActions } from 'redux/reducers/server';
import { getCSGOServerStatus, isCSGOLoading } from 'redux/selectors/server';

export class CSGOServerStatus extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    collection: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    server: PropTypes.object
  };

  componentDidMount() {
    const { actions, server } = this.props;

    actions.requestCSGOServerStatus(server);
  }

  render() {
    const {
      collection,
      loading,
      server: { host }
    } = this.props;

    const server = collection;
    return !loading ? (
      <Fragment>
        {server ? (
          <Card>
            <Card.Header>{server?.name}</Card.Header>
            <ListGroup>
              <ListGroup.Item>
                <span className="font-weight-bold">{server?.raw?.game}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Status:{' '}
                <span className="ml-2 text-success font-weight-bold">
                  Online
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                Map:{' '}
                <span className="ml-2 font-weight-bold">{server?.map}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Players:{' '}
                <span className="ml-2 font-weight-bold">
                  {server?.raw?.numplayers} / {server?.maxplayers}
                </span>
                {server?.raw?.numplayers > 0 ? (
                  <ListGroup className="mt-1">
                    {collection?.players.map((player, index) => {
                      return (
                        <Fragment>
                          <ListGroup.Item>
                            {player.name}{' '}
                            <span className="ml-3">
                              <span className="font-weight-light text-muted">
                                Score:
                              </span>{' '}
                              <span className="ml-1">{player.score}</span>
                            </span>
                          </ListGroup.Item>
                        </Fragment>
                      );
                    })}
                  </ListGroup>
                ) : null}
              </ListGroup.Item>
              <ListGroup.Item>
                Bots:{' '}
                <span className="ml-2 font-weight-bold">
                  {server?.raw?.numbots} / {server?.raw?.rules?.bot_quota}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                Address:{' '}
                <span className="ml-2 font-weight-bold">{server?.connect}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Avg Ping:{' '}
                <span className="ml-2 font-weight-bold">{server?.ping}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ) : (
          <Card>
            <Card.Header>
              {host} is currently{' '}
              <span className="ml-2 text-danger font-weight-bold">Offline</span>
            </Card.Header>
            <Card.Body>
              The server is likely down for maintenance, it will restart soon.
            </Card.Body>
          </Card>
        )}
      </Fragment>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = (state) => ({
  loading: isCSGOLoading(state),
  collection: getCSGOServerStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...serverActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CSGOServerStatus);
