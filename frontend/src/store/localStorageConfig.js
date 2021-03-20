export const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('stateExamProject', serializedState);
    } catch (e) {
        console.log('Could not save state');
    }
};


export const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('stateExamProject');
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};