const api = require('./db/db');
const uuid = require('uuid');
const DAY = 1000 * 60 * 60 * 24;
const SESSION = new Map();

function authenticate(req) {
    if (SESSION.has(req.cookies.userid) && Date.now() - SESSION.get(req.cookies.userid) <= DAY) {
        return true;
    }
    return false;
}

function listArticle(req, res, next) {
    const {page = 1, pageSize = 5} = req.query;
    api.getArticleList(page, pageSize).then((data) => {
            res.json(data)
        }
    );
}

function getArticleById(req, res, next) {
    api.getArticle(req.params.id).then((data) => {
        res.json(data)
    });
}

function deleteArticleById(req, res, next) {
    api.deleteArticle(req.params.id).then((data) => {
        res.json(data)
    });
}

function addNewArticle(req, res, next) {
    api.createNewArticle(req.body).then((data) => {
        console.log(data);
        res.json(data);
    });
}

function follow(req, res, next) {
    const {follower, following} = req.body;
    api.follow(follower, following).then((data) => {
        console.log(data);
        res.json(data);
    });
}

function unfollow(req, res, next) {
    const {follower, following} = req.body;
    api.unfollow(follower, following).then((data) => {
        console.log(data);
        res.json(data);
    });
}

function updateArticle(req, res, next) {
    api.updateArticle(req.params.id, req.body).then(
        data => res.json({'status': 200})
    )
}

function searchArticle(req, res, next) {
    api.searchArticle(req.params.keyword).then(
        data => res.json(data)
    )
}

function loginHandle(req, res, next) {
    api.checkCredential(req.body.username, req.body.password).then(
        data => {
            const userUuid = uuid.v4();
            SESSION.set(userUuid, Date.now());
            res.cookie("userid", userUuid, {
                expires: new Date(Date.now() + DAY),
                httpOnly: true
            });
            res.json(data);
        }
    ).catch((err) => {
        res.status(400).json('验证出错');
    })
}

function profileHandler(req, res, next) {
    const userid = req.params.id;
    Promise.all([
        api.getUserByID(userid),
        api.countWordByID(userid),
        api.countArticleByID(userid),
        api.countFollowingByID(userid),
        api.countFollowerByID(userid)])
        .then((value => {
            const data = Object.assign({}, ...value);
            delete data['password'];
            res.json(data);
        }));
}

function publish(req, res, next) {
    const userid = req.params.id;
    api.getRecentPublish(userid).then((data) => {
        res.json(data);
    }).catch(() => console.log("获取发表文章信息失败"))
}

function likeActivity(req, res, next) {
    const userid = req.params.id;
    api.getRecentLikes(userid).then((data) => {
        res.json(data);
    }).catch(() => console.log("获取点赞信息失败"))
}

function likeAction(req, res, next) {
    const {user, article, action} = req.body;
    api.likeArticle(user, article, action).then((data) => {
        res.status(200).json(data);
    }).catch(() => console.log("修改点赞信息失败"))
}

function recommendAuthor(req, res, next) {
    const {limit} = req.query;
    api.selectAuthor(limit).then((data) => res.json(data))
        .catch("获取推荐用户失败");
}

function getFollowerList(req, res, next) {
    const userid = req.params.id;
    api.getFollowerList(userid).then((data) => {
        res.json(data);
    }).catch(() => console.log("获取粉丝信息失败"))
}


function getFollowingList(req, res, next) {
    const userid = req.params.id;
    api.getFollowingList(userid).then((data) => {
        res.json(data);
    }).catch(() => console.log("获取关注信息失败"))
}

function checkLike(req, res, next) {
    const {user, article} = req.body;
    api.ifUserlikeArticle(user, article).then((data) => {
        if (data && data.length > 0) {
            res.json({"like": true});
        } else
            res.json({"like": false});

    }).catch(() => console.log("获取关注信息失败"))
}

module.exports = {
    listArticle,
    getArticleById,
    deleteArticleById,
    updateArticle,
    addNewArticle,
    searchArticle,
    loginHandle,
    profileHandler,
    publish,
    likeActivity,
    recommendAuthor,
    likeAction,
    getFollowerList,
    getFollowingList,
    follow,
    unfollow,
    checkLike
};