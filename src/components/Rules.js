import React from 'react';
import { Card } from 'react-bootstrap';

const ServerRules = () => {
  return (
    <Card>
      <Card.Header className="h4">Server Rules</Card.Header>
      <Card.Body>
        <ol>
          <li className="pb-3">No Racism</li>
          <li className="pb-3">No Profanity</li>
          <li className="pb-3">No Cheating/Hacks</li>
          <li className="pb-3">No Intentional Team Killing</li>
          <li>Be Respectful to other Players</li>
        </ol>
      </Card.Body>
    </Card>
  );
};

export default ServerRules;
