let html2text = require('html-to-text');

function addSummary(req, res, next) {
    for (let article of res.data) {
        article.summary = html2text.fromString(article.content).slice(0, 100);
        let date = new Date(parseInt(article.timestamp));
        article.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
    }
    res.json(res.data);
}

function authenticate(req, res, next) {
    if (req.session.user) {
        console.log(req.session.user)
        next();
    } else
        res.status(401).send("操作需要登录");
}

module.exports = {
    addSummary,
    authenticate
};