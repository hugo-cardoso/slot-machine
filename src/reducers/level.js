export default function level(state = 'medium', action) {

    switch (action.type) {

        case 'SET_LEVEL':
            return action.level;
        default :
            return state;
    }
};