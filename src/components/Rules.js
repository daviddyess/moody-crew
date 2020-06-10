import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class ServerRules extends Component {
  render() {
    return (
      <Card className="mb-2">
        <Card.Header className="h4">Server Rules</Card.Header>
        <Card.Body>
          <ol>
            <li className="p-2">No Racism</li>
            <li className="p-2">No Profanity</li>
            <li className="p-2">No Cheating/Hacks</li>
            <li className="p-2">
              No Intentional Team Killing{' '}
              <ul>
                <li>Server auto-slays the next round for any TK</li>
              </ul>
            </li>
          </ol>
        </Card.Body>
      </Card>
    );
  }
}

export default ServerRules;
