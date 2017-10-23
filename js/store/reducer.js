export default function reducer(state={}, action) {
    switch (action.type) {
        case "CHANGE_CITY":
            return Object.assign({}, state, {
                city: action.payload
            })
            break;
    
        default:
            return state
            break;
    }
}