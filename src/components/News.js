import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const ServerNews = () => {
  return (
    <Card className="mt-2">
      <Card.Header className="h4">Welcome</Card.Header>
      <Card.Body>
        <h5>Bank commands (in chat):</h5>
        <ul>
          <li>!bank : Display bank menu</li>
          <li>!deposit : Display deposit menu</li>
          <li>!deposit [amount or all] : Deposit [amount]</li>
          <li>!withdraw : Display withdrawal menu</li>
          <li>!withdraw [amount or all] : Withdraw [amount]</li>
          <li>!bankstatus : Account balance</li>
        </ul>
        <p>
          <strong>Note: </strong>The Bank is disabled during the pistol round
          and on Gun Game maps. It may be possible to make deposits on some
          other maps though...
        </p>
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
};

export default ServerNews;
