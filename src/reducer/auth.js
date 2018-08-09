export const auth = (state = {}, { type, data }) => {
  switch (type) {
    case "LOGIN":
      return "hello";

    default:
      return state;
  }
};
