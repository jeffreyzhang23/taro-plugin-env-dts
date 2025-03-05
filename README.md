# taro-plugin-env-dts
一个根据.env.${mode}文件生成声明文件（*.d.ts）的Taro插件。
*模式和环境变量使用方式请看[Taro官网](https://docs.taro.zone/en/docs/env-mode-config)*。

## 安装
```shell
npm i taro-plugin-env-dts --save-dev
```

## 使用
### 引入插件
请确保Taro版本在3.5.10以上。
修改项目config/dev.js中的plugins配置：
```javascript
const config = {
  ...
  plugins: [
    ...其余插件

    'taro-plugin-env-dts'
  ]
  ...
}
```
### 参数
| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| path | string | 否 | 指定生成声明文件*.d.ts文件路径，默认 taro-env.d.ts
| prefix | string | 否 | env文件中变量前缀，默认TARO_APP_
| parser | ParserType | 否 | 转换类型，支持传入函数。默认 auto
| arrayType | ArrayType | 否 | 转换arrayType，默认 array

### 参数传递示例
```javascript
const config = {
  ...
  plugins: [
    ...其余插件

    ['taro-plugin-env-dts', {
      path: 'taro-env.d.ts'
      prefix: 'JD_APP_',
    }]
  ]
  ...
}
```

### 注意
生成类型文件后，注意将路径path添加到tsconfig.json中。

```json
{
  "include": [
    "taro-env.d.ts"
  ]
}
```
