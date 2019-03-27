var express = require('express');
var router = express.Router();
let handlers = require('../src/handlers');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/users', handlers.recommendAuthor);
router.get('/article/list', handlers.listArticle);
router.post('/article/new', handlers.addNewArticle);
router.get('/article/delete/:id', handlers.deleteArticleById);
router.get('/article/:id', handlers.getArticleById);
router.post('/login', handlers.loginHandle);
router.get('/user/:id', handlers.profileHandler);
router.get('/publish/:id', handlers.publish);
router.post('/like', handlers.likeAction);
router.get('/likes/:id', handlers.likeActivity);
router.get('/following/:id', handlers.getFollowingList);
router.get('/follower/:id', handlers.getFollowerList);

module.exports = router;
