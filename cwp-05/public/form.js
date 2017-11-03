function createNewArticle() {
    let title = document.getElementById('titleArticle').value;
    let txt = document.getElementById('textArticle').value;
    let author = document.getElementById('authorArticle').value;
    let obj = JSON.stringify({ author: author, title: title, text: txt});
    console.log(obj);
    $.post("/api/article/", obj, (data) => {
        alert('Create successful');
    });
}