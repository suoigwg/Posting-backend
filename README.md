API

- 无需认证的
  - GET article/:id
    -     {
            "id": 1,
            "title": "标题",
            "content": "内容",
            "timestamp": "0",
            "author": 0
          }
  - GET user/:id
    -     {
            "id": 1,
            "username": "demoAccount",
            "wordCount": 18,
            "articleCount": 1,
            "following": 0,
            "follower": 0
          }
  - GET likes/:id
    -     [
              {
                  "id": 2,
                  "title": "标题2",
                  "content": "内容2",
                  "timestamp": "0",
                  "author": 0
              },
              {
                  "id": 3,
                  "title": "标题3",
                  "content": "内容3",
                  "timestamp": "0",
                  "author": 0
              }
          ]
  - GET publish/:id
    -     [
              {
                  "id": 4,
                  "title": "标题3",
                  "content": "内容3",
                  "timestamp": "0",
                  "author": 1
              },
              {
                  "id": 5,
                  "title": "标题3",
                  "content": "内容4阿巴斯的噶啥办法杜甫八十多暗杀第八的申报表卡萨达是低速回复八十",
                  "timestamp": "0",
                  "author": 1
              }
          ]
          
      
  - POST login
  - GET article/list
    -     [
              {
                  "id": 1,
                  "title": "标题",
                  "content": "内容",
                  "timestamp": "0",
                  "author": 0
              },
              {
                  "id": 2,
                  "title": "标题2",
                  "content": "内容2",
                  "timestamp": "0",
                  "author": 0
              }
          ]
      
- 需要认证的
  - POST article/new
    -     {
            "author":1,
            "title":"测试创建文章",
            "content":"测试创建文章内容"
          }
      
  - GET article/delete/:id
    -     删除文章的id
      
  - POST like
    -     {
            "user":1,
            "article":100,
            "action":"like"
          }
      

数据库

- User: id username password
- Follow: follower following
- Article: id, title, content, date, authorid
- Likes: user, article
