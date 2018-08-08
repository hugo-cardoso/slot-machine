export default function cash(state = 50, action) {

    switch (action.type) {

        case 'ADD_CASH':
            return (state += action.cash);
        case 'REMOVE_CASH':
            return (state -= action.cash);
        default :
            return state;
    }
};