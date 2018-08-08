export default function message(state = "GOOD LUCK!", action) {

    switch (action.type) {

        case 'SET_MESSAGE':
            return action.message;
        default :
            return state;
    }
};