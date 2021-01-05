export default (value, search) => {
    if (!value || !search || value.length === 0 || search.length === 0) {
        return -1;
    }
    const lowerCaseValue = value.toLowerCase();
    const lowerCaseSearch = search.toLowerCase();

    return lowerCaseValue.indexOf(lowerCaseSearch);
}