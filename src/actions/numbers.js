export function setNumbers( numbers ) {
    return {
        type: 'SET_NUMBERS',
        numbers,
    };
}

export function resetNumbers() {
    return {
        type: 'RESET_NUMBERS'
    };
}