module.exports.getPaginatedItems = function(articles, page, limit) {
    let paginatedData = Object.assign([], articles);
    return {
        items: paginatedData.splice((page - 1) * limit, limit),
        meta: {
            page: page,
            pages: Math.ceil(articles.length / limit),
            count: articles.count,
            limit: limit
        }
    }
}