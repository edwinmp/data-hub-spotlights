export default (state, action) => {
  switch (action.type) {
    case "GET_DISTRICTS":
      return {
        districts: state.districts
      };
    default:
      return state;
  }
};
