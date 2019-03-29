var express = require('express');
var router = express.Router();
var handlers = require('../src/handlers');
var middlewares = require('../src/middlewares');


router.get('/users', handlers.recommendAuthor);
router.get('/article/list', handlers.listArticle, middlewares.addSummary);
router.post('/article/new', middlewares.authenticate, handlers.addNewArticle);
router.get('/article/delete/:id', handlers.deleteArticleById);
router.get('/article/:id', handlers.getArticleById, middlewares.addSummary);
router.post('/login', handlers.loginHandle);
router.get('/user/:id', handlers.profileHandler);
router.get('/publish/:id', handlers.publish, middlewares.addSummary);
router.post('/like', handlers.likeAction);
router.get('/likes/:id', handlers.likeActivity);
router.get('/following/:id', handlers.getFollowingList);
router.get('/follower/:id', handlers.getFollowerList);
router.post('/follow', handlers.follow);
router.post('/unfollow', handlers.unfollow);
router.post('/checklike', handlers.checkLike);
router.get('/search/:keyword', handlers.searchArticle);


module.exports = router;
