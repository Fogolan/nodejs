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
    let sortOrder;
    switch (sortMode) {
        case 'ask':
            sortOrder = dynamicSort(property);
            break;
        case 'desc':
            sortOrder = dynamicSort("-" + property);
            break;
        default:
            sortOrder = dynamicSort(property);
            break;
        
    }
    return sortOrder;
}