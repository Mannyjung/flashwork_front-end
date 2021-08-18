const initialState = [
    {
        id: null,
        Username: null
    }
]
const roomChatRdeucer = (state = initialState, action) => {

    const { type, payload } = action;
    switch (type) {
        case "JoinRoom":
            const newState = [{
                id: payload.room,
                Username: payload.Username
            }]
            return newState;
        default:
            return state;
    }
}
export default roomChatRdeucer;