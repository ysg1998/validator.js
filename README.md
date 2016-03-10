# validator



## 使用方法

### 点击按submit按钮验证

```js 
var validator = new Validator('example_form',[
    {
        //name 字段
        name: 'email',
        display:"你输入的不{{email}}是合法邮箱|不能为空|太长|太短",
        // 验证条件
        rules: 'is_emil|max_length(12)'
        // rules: 'valid_email|required|max_length(12)|min_length(2)'
    },{
        //name 字段
        name: 'sex',
        display:"请你选择性别{{sex}}",
        // 验证条件
        rules: 'required'
    }
],function(error){

})
```

### 没有submit验证

```js 
var validator = new Validator('example_form',[
    {
        //name 字段
        name: 'email',
        display:"你输入的不{{email}}是合法邮箱|不能为空|太长|太短",
        // 验证条件
        rules: 'is_emil|max_length(12)'
        // rules: 'valid_email|required|max_length(12)|min_length(2)'
    },{
        //name 字段
        name: 'sex',
        display:"请你选择性别{{email}}",
        // 验证条件
        rules: 'required'
    }
],function(error){

})

validator.validate()
```
