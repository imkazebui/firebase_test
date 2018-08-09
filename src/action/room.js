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
        console.log("log room", childSnapshot.val());
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
                // dispatch(
                //   startSendMessage(
                //     `${perName} created this room`,
                //     room.name,
                //     true
                //   )
                // ).then(() => {
                //   dispatch(startListening(room.name));
                //   history.push(`/room/${room.name}`);
                // });
              });
          });
      } else {
        return showCreateError();
      }
    });
  };
};
