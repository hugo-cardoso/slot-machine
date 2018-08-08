export default function numbers(state = ['?','?','?'], action) {

    switch (action.type) {

        case 'SET_NUMBERS':
            return action.numbers;
        case 'RESET_NUMBERS':
            return ['?','?','?'];
        default :
            return state;
    }
};