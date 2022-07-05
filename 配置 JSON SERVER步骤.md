### 安装

npm i json-server -g

### 新建文件夹 **json_server_mock**

### 在 **json_server_mock** 中新建文件 db.json

JSON 对象，内容为我们 mock 的数据

### 编辑 package.json 文件

"scripts": {
"json-server": "json-server **json_server_mock**/db.json --watch"
},

### 启动

npm run json-server
