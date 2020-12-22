# zheye

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 开发流程

- 将UI划分出组件的层级
- 创建应用静态版本

##　全局对象的弊端
- 数据不是响应式的
- 数据修改无法追踪
- 

# 状态管理工具的基本原则
- 一个类似 object 的全局数据结构—— 称之为 store
- 只能调用一些特殊的方法来实现数据修改

# Vuex 的特点
- 状态存储是响应式的
- 不能直接改变store中的状态， 唯一推荐就是显示地提交（commit）mutation