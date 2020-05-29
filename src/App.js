import React from 'react';
import Addcomments from './addComments';
import Showcomments from './showComments';
import {Container,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Container>
      <Row>
        <Col>
      <Addcomments/>
      </Col>
      <Col>
      <Showcomments/>
      </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
