const Controller = require('./controller');
const constants = require('../modules/constants_module');

class ArticleController extends Controller {    
    constructor() {
        super(constants.articleControllerUrl);
        super.addHandlerToController("GET", this.getArticle);
    }

    GetcontrollersMethods() {
        return [
            {
                requestType: "GET",
                handler: this.getArticle,
            }
        ]
    }

    createArticle(article) {

    }

    getArticle(articleId) {
        return "It works!";
    }

    getArticles() {

    }

    updateArticle(article) {

    }

    deleteArticle(articleId) {

    }
}

module.exports = ArticleController;