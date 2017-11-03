const Controller = require('./controller');
const constants = require('../modules/constants_module');
const errors = require('../content/responses.json');
const validation = require('../modules/helpers/validationHelper.js');
const sortHelper = require('../modules/helpers/sortHelper.js');
const paginationHelper = require('../modules/helpers/paginationHelper.js');

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
        let currentDate = new Date();
        article.date = currentDate.getDate() + '' + currentDate.getMonth() + '' + currentDate.getFullYear();

        if (validation.isValidArticle(article)) {
            article.id = (articles.length + 1).toString();
            articles.push(article);
            return errors.ok;
        }
        return errors.request_invalid;
    }

    getArticle(queryObject) {
        let result;
        let articleId = queryObject.id;
        articles.forEach(function (article) {
            if (article.id === articleId) {
                result = article;
            }
        }, this);
        if (!result || !articleId) {
            return errors.request_invalid;
        }

        return result;
    }

    getArticles(queryObject) {

        let result = articles;

        if (queryObject.includeDeps == "false") {
            result = [];
            for (let i = 0; i < articles.length; i++) {
                let element = {
                    id: articles[i].id,
                    title: articles[i].title,
                    text: articles[i].text,
                    date: articles[i].date,
                    author: articles[i].author
                };
                result.push(element);
            }
        }

        if (queryObject.sortField) {
            let sortMode = sortHelper.Sort(queryObject.sortField, queryObject.sortOrder);
            result = articles.sort(sortMode);
        }

        if (queryObject.page && queryObject.limit) {
            result = paginationHelper.getPaginatedItems(articles, queryObject.page, queryObject.limit);
        }

        return result;
    }

    updateArticle(paramsArray) {
        let newArticle = paramsArray[0];
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