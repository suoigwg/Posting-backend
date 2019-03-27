const SELECT_AUTHOR = `select * from user limit ?;`;
const SELECT_USER = `SELECT * FROM user WHERE username = ? AND password = ?`;
const SELECT_ARTICLE = `SELECT * FROM article WHERE id = ?`;
const LIST_ARTICLE = `SELECT * FROM article order by timestamp desc LIMIT ? OFFSET ?`;
const NEW_ARTICLE = `INSERT INTO article (title, content, timestamp, author) VALUES 
(?, ?, ?, ?)`;
const NEW_ARTICLE_ID = `SELECT id FROM article ORDER BY id DESC LIMIT 1`;
const DELETE_ARTICLE = `DELETE FROM article WHERE id = ? `;
const UPDATE_ARTICLE = `UPDATE article SET title = ?, content = ?, timestamp = ?
WHERE id = ?
`;
const SEARCH_ARTICLE = 'SELECT * FROM article WHERE title LIKE $keyword OR content LIKE $keyword';
const SELECT_USER_BY_ID = `SELECT * FROM user WHERE id = ?`;
const SELECT_FOLLOWER = `SELECT count(*) as follower FROM follow where following=?`;
const SELECT_FOLLOWING = `SELECT count(*) as following FROM follow where follower=?`;
const SELECT_ARTICLE_COUNT = `select count (*) as articleCount from article where author = ?;`;
const SELECT_ARTICLE_BY_USER = `select content, title from article where author = ?;`;
const SELECT_USER_LIKE = `select * from likes where user = ? and article = ?;`;
const SELECT_PUBLISH = `select * from article where author = ? order by timestamp desc limit 10;`;
const SELECT_RECENT_LIKE = `select * from article where id in (select article from likes where user = ?) order by timestamp desc limit 10;`;
const LIKE_ARTICLE = `insert into likes values (?, ?, ?);`;
const UNLIKE_ARTICLE = `delete from likes where user = ? and article = ?;`;
const SELECT_FOLLOWER_LIST = `SELECT *  FROM user where id in (select follower as id from follow where following=?)`;
const SELECT_FOLLOWING_LIST = `SELECT *  FROM user where id in (select following as id from follow where follower=?);`;
const INSERT_FOLLOW = `insert into follow values (?, ?);`;
const UNFOLLOW = `delete from follow where follower = ? and following = ?;`;
module.exports = {
    SELECT_USER_LIKE,
    INSERT_FOLLOW,
    UNFOLLOW,
    SELECT_FOLLOWER_LIST,
    SELECT_FOLLOWING_LIST,
    SELECT_AUTHOR,
    SELECT_USER,
    SELECT_ARTICLE,
    LIST_ARTICLE,
    NEW_ARTICLE,
    NEW_ARTICLE_ID,
    DELETE_ARTICLE,
    UPDATE_ARTICLE,
    SEARCH_ARTICLE,
    SELECT_FOLLOWER,
    SELECT_FOLLOWING,
    SELECT_ARTICLE_COUNT,
    SELECT_ARTICLE_BY_USER,
    SELECT_USER_BY_ID,
    SELECT_PUBLISH,
    SELECT_RECENT_LIKE,
    LIKE_ARTICLE,
    UNLIKE_ARTICLE
};