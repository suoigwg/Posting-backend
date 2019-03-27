let sqlStmt = require('./sql');
let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./jianshu.db');


function getRecentLikes(userid) {
    const promise = new Promise((resolve, reject) => {
        db.all(sqlStmt.SELECT_RECENT_LIKE, userid, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(rows);
            }
        });

    });
    return promise;
}

function getArticleList(page = 1, pageSize = 5) {
    let stmt = db.prepare(sqlStmt.LIST_ARTICLE);
    const promise = new Promise(((resolve, reject) => {
        stmt.all(pageSize, (page - 1) * pageSize, (err, row) => {
            console.log(row);
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(row);
            }
        });
    }));
    return promise;
}


function createNewArticle(data) {
    let stmt = db.prepare(sqlStmt.NEW_ARTICLE);
    console.log(data);
    const promise = new Promise((resolve, reject) => (
        stmt.run(data.title, data.content, Date.now(), data.author, (err) => {
            if (err) reject(err);
            else {
                db.get(sqlStmt.NEW_ARTICLE_ID, (err, row) => {
                    if (err) {
                        reject(err);
                        console.log(err);
                        return;
                    }
                    resolve(row);
                })
            }
        })
    ));
    return promise;
}

function getArticle(id) {
    const promise = new Promise((resolve, reject) => {
        db.get(sqlStmt.SELECT_ARTICLE, id, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        })

    });
    return promise;
}

function deleteArticle(id) {
    console.log(id);
    const promise = new Promise((resolve, reject) => (
        db.run(sqlStmt.DELETE_ARTICLE, id, (err) => {
            if (err) {
                reject(err);
            }
            resolve(id);
        })
    ));
    return promise;
}


function updateArticle(id, data) {
    const promise = new Promise((resolve, reject) => {
        db.run(sqlStmt.UPDATE_ARTICLE, [data.title, data.content, Date.now(), id], (err) => {
            if (err) reject(err);
            else resolve(data);
        })
    });
    return promise;
}

function searchArticle(keyword) {
    const promise = new Promise((resolve, reject) => {
        db.all(sqlStmt.SEARCH_ARTICLE, {$keyword: '%' + keyword + '%'}, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        })
    });
    return promise;
}

function getUserByID(userid) {
    const promise = new Promise((resolve, reject) => {
        db.get(sqlStmt.SELECT_USER_BY_ID, userid, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        })

    });
    return promise;
}

function countFollowerByID(userid) {
    const promise = new Promise((resolve, reject) => {
        db.get(sqlStmt.SELECT_FOLLOWER, userid, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        })

    });
    return promise;
}

function countFollowingByID(userid) {
    const promise = new Promise((resolve, reject) => {
        db.get(sqlStmt.SELECT_FOLLOWING, userid, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        })

    });
    return promise;
}

function countArticleByID(userid) {
    const promise = new Promise((resolve, reject) => {
        db.get(sqlStmt.SELECT_ARTICLE_COUNT, userid, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        })

    });
    return promise;
}

function countWordByID(userid) {
    const promise = new Promise((resolve, reject) => {
        db.all(sqlStmt.SELECT_ARTICLE_BY_USER, userid, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(rows);
            let wordCount = 0;
            for (let row of rows) {
                for (let key in row) {
                    wordCount += key.length + row[key].length;
                }
            }
            resolve({wordCount});
        })
    });
    return promise;
}

function checkCredential(username, password) {
    const promise = new Promise((resolve, reject) => {
        db.get(sqlStmt.SELECT_USER, [username, password], (err, row) => {
            if (err) {
                console.log(err);
                reject("db err");
                return;
            }
            if (!row) {
                reject("user credential err");
                return;
            }
            resolve(row);
        })
    });
    return promise;
}

function getRecentPublish(userid) {
    const promise = new Promise((resolve, reject) => {
        db.all(sqlStmt.SELECT_PUBLISH, userid, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        })
    });
    return promise;
}

function likeArticle(user, article, action) {
    const promise = new Promise((resolve, reject) => {
        if (action === 'like') {
            db.run(sqlStmt.LIKE_ARTICLE, [user, article, Date.now()], (err) => {
                if (err) reject(err);
                else resolve();
            })
        } else {
            db.run(sqlStmt.UNLIKE_ARTICLE, [user, article], (err) => {
                if (err) reject(err);
                else resolve();
            })
        }
    });
    return promise;
}

function selectAuthor(limit = 5) {
    const promise = new Promise((resolve, reject) => {
        db.all(sqlStmt.SELECT_AUTHOR, limit, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        })
    });
    return promise;
}

function selectAll(sql, param) {
    const promise = new Promise((resolve, reject) => {
        db.all(sql, param, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(rows);
            }
        });

    });
    return promise;
}

function getFollowerList(userid) {
    return selectAll(sqlStmt.SELECT_FOLLOWER_LIST, [userid]);
}

function getFollowingList(userid) {
    return selectAll(sqlStmt.SELECT_FOLLOWING_LIST, [userid]);
}

module.exports = {
    db,
    checkCredential,
    getArticleList,
    createNewArticle,
    getArticle,
    deleteArticle,
    updateArticle,
    searchArticle,
    countArticleByID,
    countFollowerByID,
    countFollowingByID,
    countWordByID,
    getUserByID,
    getRecentPublish,
    getRecentLikes,
    likeArticle,
    selectAuthor,
    getFollowerList,
    getFollowingList
};