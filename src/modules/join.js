import React from "react";
import { Row, Col, Button, Input } from "reactstrap";

export default class Join extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row>
        <Col>room</Col>
        <Col>
          <Row>
            Create a room
            <Input placeholder="Enter room name" />
            <Button>Create</Button>
          </Row>
          <Row>
            Join a room
            <Input placeholder="Enter room name" />
            <Button>Join</Button>
          </Row>
        </Col>
      </Row>
    );
  }
}
