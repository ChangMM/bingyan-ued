# bingyan-ued

> 冰岩UED前端代码

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

``` mysql
下面是`category`这个表的结构
+----+------+--------+-----------+
| id | name | status | full_name |
+----+------+--------+-----------+
|  1 | PM   |      0 | 产品 PM   |
|  2 | VD   |      0 | 设计 VD   |
|  3 | ID   |      0 | 交互 ID   |
|  4 | FE   |      0 | 前端 FE   |
|  5 | RD   |      0 | 研发 RD   |
+----+------+--------+-----------+
```

### 文章具体的字段有
```
mysql> desc article;
+--------------+--------------+------+-----+-------------------+-----------------------------+
| Field        | Type         | Null | Key | Default           | Extra                       |
+--------------+--------------+------+-----+-------------------+-----------------------------+
| article_id   | int(8)       | NO   | PRI | NULL              | auto_increment              |
| title        | varchar(128) | NO   |     | NULL              |                             |
| author_id    | int(4)       | NO   |     | NULL              |                             |
| category     | int(2)       | NO   |     | NULL              |                             |
| content      | text         | NO   |     | NULL              |                             |
| cover        | varchar(128) | NO   |     | NULL              |                             |
| article_date | date         | YES  |     | NULL              |                             |
| like_num     | int(8)       | NO   |     | 0                 |                             |
| comment_num  | int(8)       | NO   |     | 0                 |                             |
| share_num    | int(8)       | NO   |     | 0                 |                             |
| status       | int(2)       | NO   |     | 0                 |                             |
| check_date   | timestamp    | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
| intro        | varchar(128) | NO   |     | NULL              |                             |
+--------------+--------------+------+-----+-------------------+-----------------------------+
```
### 开发过程中的bug
* 1、路由钩子的绑定问题
* 2、transition过渡钩子的绑定问题
