import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

class ServerNews extends Component {
  render() {
    return (
      <Card className="mb-2">
        <Card.Header className="h4">Welcome</Card.Header>
        <Card.Body>
          <strong>Bank</strong> Plugin commands (in chat):
          <ul>
            <li>!bank : Display bank menu</li>
            <li>!deposit : Display deposit menu</li>
            <li>!deposit [amount or all] : Deposit [amount]</li>
            <li>!withdraw : Display withdrawal menu</li>
            <li>!withdraw [amount or all] : Withdraw [amount]</li>
            <li>!bankstatus : Account balance</li>
          </ul>
        </Card.Body>
        <Card.Body className="bg bg-light text-dark">
          Thanks for joining us!
        </Card.Body>
        <Card.Body className="bg bg-primary">
          Need a change of pace? GunGame! Vote for any gg_ map and we become a
          GunGame server. All other maps are classic Counter-Strike game play.
        </Card.Body>
        <Card.Body>
          Returning player? Check out your <Link to="/stats">Stats</Link>
        </Card.Body>
        <Card.Body className="bg bg-light text-primary">
          Visit this web site in your browser by going to{' '}
          <span className="text-dark">https://moodycrew.us</span>
        </Card.Body>
      </Card>
    );
  }
}

export default ServerNews;
