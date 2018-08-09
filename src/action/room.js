import moment from "moment";
import { firebaseDatabase as database } from "../firebase";

export const createRoom = ({ id, name, people, messages = [] }) => ({
  type: "CREATE_ROOM",
  room: {
    id,
    name,
    people,
    messages
  }
});

export const startCreateRoom = (roomper = {}, showCreateError) => {
  return (dispatch, getState) => {
    const room = {
      name: roomper.name
    };
    return database.ref("rooms").once("value", snapshot => {
      const rooms = [];

      snapshot.forEach(childSnapshot => {
        rooms.push({
          ...childSnapshot.val()
        });
      });
      if (!rooms.find(r => r.name === room.name)) {
        return database
          .ref(`rooms/${room.name}`)
          .set(room)
          .then(ref => {
            return database
              .ref(`rooms/${room.name}/people/${roomper.people.id}`)
              .set(roomper.people)
              .then(() => {
                database
                  .ref(`users/${roomper.people.id}/rooms/${room.name}`)
                  .set({ roomName: room.name });

                dispatch(
                  createRoom({
                    ...roomper,
                    people: [roomper.people]
                  })
                );
                const perName = roomper.people.name;
                dispatch(
                  startSendMessage(
                    `${perName} created this room`,
                    room.name,
                    true
                  )
                ).then(() => {
                  dispatch(startListening(room.name));
                  window.location.href = `#/room/${room.name}`;
                });
              });
          });
      } else {
        return showCreateError();
      }
    });
  };
};

export const sendMessage = (message, roomName) => ({
  type: "SEND_MESSAGE",
  message,
  roomName
});

export const orderRoomsStartState = () => ({
  type: "ORDER_ROOMS_START_STATE"
});

export const startListening = roomName => {
  return (dispatch, getState) => {
    return database
      .ref(`rooms/${roomName}/messages`)
      .on("child_added", msgSnapshot => {
        if (getState().rooms.find(r => r.name === roomName)) {
          database
            .ref(`rooms/${roomName}/people`)
            .once("value", personSnapshot => {
              const message = msgSnapshot.val();
              dispatch(
                sendMessage({ ...message, id: msgSnapshot.key }, roomName)
              );
              dispatch(orderRoomsStartState());
              if (message.sender.displayName !== getState().auth.displayName) {
                // ipcRenderer.send('playNotif', message.sender.displayName, message.text);
                const audio = new Audio("/sounds/notif.mp3");
                audio.play();
              }
              const keyword =
                message.status && message.text.split(" ").splice(-1, 1)[0];
              if (keyword === "left") {
                dispatch(onLeft(roomName, message.sender.uid));
              } else if (keyword === "joined") {
                dispatch(
                  onJoined(roomName, personSnapshot.val()[message.sender.uid])
                );
              }
              const personID = getState().auth.uid;

              if (personID === message.sender.uid && keyword !== "left") {
                database
                  .ref(`rooms/${roomName}/people/${personID}`)
                  .update({ unread: 0, lastRead: message.createdAt })
                  .then(() => {
                    dispatch(
                      setUnread(roomName, personID, message.createdAt, 0)
                    );
                  });
              } else if (
                personID !== message.sender.uid &&
                moment(message.createdAt) >
                  moment(personSnapshot.val()[personID].lastRead)
              ) {
                database
                  .ref(`rooms/${roomName}/people/${personID}`)
                  .update({
                    unread: personSnapshot.val()[personID].unread + 1,
                    lastRead: message.createdAt
                  })
                  .then(() => {
                    dispatch(
                      setUnread(
                        roomName,
                        personID,
                        message.createdAt,
                        personSnapshot.val()[personID].unread + 1
                      )
                    );
                  });
              }
            });
        }
      });
  };
};

export const startSendMessage = (text, roomName, status = false) => {
  return (dispatch, getState) => {
    const user = getState().auth;
    if (user) {
      const uid = user.uid;
      const displayName = user.displayName;
      const message = {
        sender: { uid, displayName },
        text,
        createdAt: moment().format(),
        status
      };
      return database.ref(`rooms/${roomName}/messages`).push(message);
    }
  };
};

export const onLeft = (roomName, personID) => ({
  type: "ON_LEFT",
  roomName,
  personID
});

export const onJoined = (roomName, person) => ({
  type: "ON_JOINED",
  roomName,
  person
});

export const setUnread = (roomName, uid, time, unread) => {
  return dispatch => {
    dispatch(clearUnread(roomName, uid, time, unread));
  };
};

export const clearUnread = (roomName, uid, time, unread) => ({
  type: "CLEAR_UNREAD",
  roomName,
  uid,
  time,
  unread
});
