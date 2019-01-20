# 一、安装
```
npm install @daluobo/fetchwrap;
import fetchWrap  from '@daluobo/fetchwrap';
```
# 二、使用
## 1. get方法
```
参数为：（api, data = {}, headers = {}, config = {}）
fetchWrap.get('/test-fetch')
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
fetchWrap.post('/test-fetch')
.then((res) => {
    console.log('res:', res);
})
.catch((err) => {
    console.log('error:', err);
})
```