function dynamicSort (property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

module.exports.Sort = function (property, sortMode) {
    switch (sortMode) {
        case 'ask':
            return dynamicSort(property);
            break;
        case 'desc':
            return dynamicSort("-" + property);
            break;
        default:
            return dynamicSort(property);
            break;
    }
}