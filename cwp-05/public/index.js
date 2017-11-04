let currentPage = 0;
let pages;
let check = undefined;
    function getElements() {
        var btn1 = document.getElementById('nav-button-1');
        var btn2 = document.getElementById('nav-button-2');

        btn1.style.display = 'block';
        btn2.style.display = 'block';

        let str = `?sortOrder=desc&limit=5&page=${currentPage}`;
        if (!check) {
            if (document.getElementById("rad1").checked == true) {
                str = `?sortOrder=asc&limit=5&page=${currentPage}`;
                check = 'asc';
            }
            else check = 'desc';
        }
        else {
            switch (check) {
                case 'asc': str = `?sortOrder=asc&limit=5&page=${currentPage}`;
                case 'desc': str = `?sortOrder=desc&limit=5&page=${currentPage}`;
            }
        }
        let doc = document.getElementsByTagName('body')[0];
        $.get('/api/article/' + str, (data) => {
            var articles = JSON.parse(data);
            pages = articles.meta.pages;
            $('#articles').empty();
            articles.items.forEach((element) => {
                $('#articles').append(`<div id='article'>` +
                    `<div class='date'>   ${element.date}  </div>` +
                    `<div class='title'>  ${element.title} </div>` +
                    `<div class='text'>'  ${element.text}  </div>` +
                    `<div class='author'>'${element.author} </div>` +
                    `</div><br />`);
            }, this);
        });
    }
    function nextPage() {
        currentPage = currentPage + 1;
        if(currentPage > pages) {
            currentPage = pages;
        }
        getElements();
    }

    function prevPage() {
        currentPage = currentPage - 1;
        if(currentPage < 0){
            currentPage = 0;
        }
        getElements();
    }