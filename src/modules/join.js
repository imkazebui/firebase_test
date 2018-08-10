import React from "react";
import { Row, Col, Button, Input } from "reactstrap";
import { connect } from "react-redux";
import { startCreateRoom, startJoinRoom } from "../action/room";

class Join extends React.Component {
  constructor(props) {
    super(props);
  }

  createRoom = () => {
    const { dispatch, auth } = this.props;
    const roomInfo = {
      name: document.getElementById("input-create-room").value.trim(),
      people: {
        id: auth.uid,
        name: auth.displayName,
        unread: 0,
        lastRead: 0
      }
    };
    dispatch(
      startCreateRoom(roomInfo, () => {
        alert("Room name not available!");
      })
    );
  };

  joinRoom = () => {
    const user = this.props.auth;
    const data = {
      roomName: document.getElementById("input-join-room").value.trim(),
      id: user.uid,
      name: user.displayName,
      unread: 0
    };
    this.props.dispatch(
      startJoinRoom(data, () => alert("Room name not available!"))
    );
  };

  render() {
    return (
      <Row>
        <Col>room</Col>
        <Col>
          <Row>
            Create a room
            <Input placeholder="Enter room name" id="input-create-room" />
            <Button onClick={this.createRoom}>Create</Button>
          </Row>
          <Row>
            Join a room
            <Input placeholder="Enter room name" id="input-join-room" />
            <Button onClick={this.joinRoom}>Join</Button>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default connect(
  state => ({ auth: state.auth }),
  dispatch => ({ dispatch })
)(Join);
