const catReducer = (state = "ALL", action) => {
    switch (action.type) {
        case "SET_CAT":
            return action.cat;
        default:
            return state;
    }
};

export const catChange = (cat) => {
    return {
        type: "SET_CAT",
        cat,
    };
};

export default catReducer;
