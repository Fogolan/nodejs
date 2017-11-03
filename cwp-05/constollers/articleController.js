const Controller = require('./controller');
const constants = require('../modules/constants_module');
const errors = require('../content/responses.json');
const validation = require('../modules/helpers/validationHelper.js');

let articles = require('../content/articles.json');

class ArticleController extends Controller {
    constructor() {
        super(constants.articleControllerUrl);
        super.addHandlersToController(this.getControllersMethods());
    }

    getControllersMethods() {
        return [
            {
                requestType: "GET",
                handler: this.getArticle,
                paramsCount: 1,
            },
            {
                requestType: "GET",
                handler: this.getArticles,
                paramsCount: 0,
            },
            {
                requestType: "POST",
                handler: this.createArticle,
                paramsCount: 1,
            },
            {
                requestType: "PUT",
                handler: this.updateArticle,
                paramsCount: 1,
            }
        ]
    }

    createArticle(paramsArray) {
        let article = paramsArray[0];
        console.log('validation: ', validation.isValidArticle(article));
        if (validation.isValidArticle(article)) {
            article.id = (articles.length + 1).toString();
            articles.push(article);
            return errors.ok;
        }
        return errors.request_invalid;
    }

    getArticle(paramsArray) {
        let result;
        let articleId = paramsArray[0];
        articles.forEach(function (article) {
            if (article.id === articleId) {
                console.log('article id = ', articleId, ' ', article);
                result = article;
            }
        }, this);
        if (!result) {
            return errors.request_invalid;
        }

        return result;
    }

    getArticles() {
        return articles;
    }

    updateArticle(paramsArray) {
        let newArticle = paramsArray[0];
        console.log('try to update article: ', paramsArray);
        if (validation.isValidArticle(newArticle)) {
            for (var index = 0; index < articles.length; index++) {
                if (newArticle.id && articles[index].id == newArticle.id) {
                    Object.assign(articles[index], newArticle);
                    return errors.ok;
                }
            }
        }
        return errors.request_invalid;
    }

    deleteArticle(paramsArray) {
        let articleId = paramsArray[0].id;
        for (var index = 0; index < articles.length; index++) {
            if (articleId && articles[index].id == articleId) {
                articles.splice(articles.findIndex(x => x.id == articleId), 1);
                return errors.ok;
            }
        }
        return errors.request_invalid;
    }
}

module.exports = ArticleController;