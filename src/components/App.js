import React, { Component, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from 'components/Header';
import Footer from 'components/Footer';

import { Home, Motd, NotFound, Player, Rules, Stats } from 'pages';
import SuspenseFallback from 'components/SuspenseFallback/SuspenseFallback';

export class App extends Component {
  render() {
    return (
      <Suspense fallback={<SuspenseFallback />}>
        <Helmet
          defaultTitle={process.env.REACT_APP_HTML_TITLE}
          titleTemplate={`%s | ${process.env.REACT_APP_HTML_TITLE}`}
        />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/motd" component={Motd} />
          <Route exact path="/player/:id" component={Player} />
          <Route exact path="/rules" component={Rules} />
          <Route exact path="/stats" component={Stats} />
          <Route exact path="/stats/:page" component={Stats} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Suspense>
    );
  }
}

export default withRouter(App);
