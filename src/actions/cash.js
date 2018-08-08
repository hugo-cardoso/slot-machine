export function addCash( cash ) {
    return {
        type: 'ADD_CASH',
        cash,
    };
}

export function removeCash( cash ) {
    return {
        type: 'REMOVE_CASH',
        cash
    }
}