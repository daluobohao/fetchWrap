# 一、安装
npm install fetchWrap
# 二、使用
## 1. get方法
```
参数为：（api, data = {}, headers = {}, config = {}）
http.get('/test-fetch')
.then((res) => {
    console.log('res:', res);
})
.catch((err) => {
    console.log('error:', err);
})
```
## 2. post方法
```
参数为：（api, data = {}, headers = {}, config = {}）
http.post('/test-fetch')
.then((res) => {
    console.log('res:', res);
})
.catch((err) => {
    console.log('error:', err);
})
```