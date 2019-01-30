# 安装步骤


## 1. Build

```
git clone git@github.com:zhangboyce/max-less.git
npm install
npm run build
```

## 2. Config

```
config.default.js

config.host = 'http://192.168.60.98:7001'
config.mongoose = {
    url: 'mongodb://192.168.60.98:27017/max_less',
    options: { useNewUrlParser: true },
  };
```

## 3. Data init

```
npm run data menu
npm run data option
npm run data permission
npm run data role
npm run data roleMenu
npm run data shop
npm run data user
```

## 4. Run

```
npm run start
```