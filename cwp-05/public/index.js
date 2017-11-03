var pageNumber = 0;
var maxPages = 1;
function getArticles(params) {
    var url = '/api/article/?page=' + pageNumber + '&limit=2';
    $.get(url,
        function (data) {
            $('#articles').empty();
            maxPages = data.meta.pages;
            data.items.forEach(function (element) {
                $('#articles').append("<h3>" + element.title + "</h3><h5>" + element.date + "</h5>");
            }, this);
        },
        'json');
}

function nextPage() {
    pageNumber = pageNumber + 1;
    getArticles();
}

function prevPage() {
    pageNumber = pageNumber - 1;
    getArticles();
}