import React from 'react';
import { Card } from 'react-bootstrap';

const ServerRules = () => {
  return (
    <Card className="mb-2">
      <Card.Header className="h4">Server Rules</Card.Header>
      <Card.Body>
        <ol>
          <li className="p-2">No Racism</li>
          <li className="p-2">No Profanity</li>
          <li className="p-2">No Cheating/Hacks</li>
          <li className="p-2">No Intentional Team Killing</li>
          <li className="p-2">Be Respectful to other Players</li>
        </ol>
      </Card.Body>
    </Card>
  );
};

export default ServerRules;
