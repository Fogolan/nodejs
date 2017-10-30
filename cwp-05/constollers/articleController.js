const Controller = require('./controller');
const constants = require('../modules/constants_module');
const errors = require('../content/responses.json');
const validation = require('../modules/helpers/validationHelper.js');

let articles = require('../content/articles.json');

class ArticleController extends Controller {
    constructor() {
        super(constants.articleControllerUrl);
        super.addHandlerToController("GET", this.getArticle, 1);
        super.addHandlerToController("GET", this.getArticles, 0);
        super.addHandlerToController("POST", this.createArticle, 1);
        super.addHandlerToController("PUT", this.updateArticle, 1);
        super.addHandlerToController("DELETE", this.deleteArticle, 1);
    }

    GetcontrollersMethods() {
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
                paramsCount: 0,
            },
            {
                requestType: "PUT",
                handler: this.updateArticle,
                paramsCount: 1,
            }
        ]
    }

    createArticle(article) {
        console.log('validation: ', validation.isValidArticle(article));
        if (validation.isValidArticle(article)) {
            article.id = articles.count;
            articles.push(article);
            return errors.ok;
        }
        return errors.request_invalid;
    }

    getArticle(paramsArray) {
        let result;
        articles.forEach(function (article) {
            if (article.id === paramsArray[0]) {
                console.log('article id = ', paramsArray[0], ' ', article);
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
        console.log('try to update article: ', paramsArray);
        if (validation.isValidArticle(paramsArray[0])) {
            for (var index = 0; index < articles.length; index++) {
                if (paramsArray[0].id && articles[index].id == paramsArray[0].id) {
                    Object.assign(articles[index], paramsArray[0]);
                    return errors.ok;
                }
            }
        }
        return errors.request_invalid;
    }

    deleteArticle(paramsArray) {
        for (var index = 0; index < articles.length; index++) {
            if (paramsArray[0].id && articles[index].id == paramsArray[0].id) {
                articles.splice(articles.findIndex(x => x.id == paramsArray[0].id), 1);
                return errors.ok;
            }
        }
        return errors.request_invalid;
    }
}

module.exports = ArticleController;