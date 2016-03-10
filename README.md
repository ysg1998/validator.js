# validator



## 使用方法

> new Validator(formName, option, callback)

### formName

```html 
<form name="example_form"></form>
<!-- name 或者 id -->
<form id="example_form"></form>
```

### option

```html 
<form id="example_form">
    <div>
        <label>邮箱验证</label>
        <input type="text" name="email" />
    </div>
</form>
```

- `name` -> input 中 `name` 对应的值
- `display` -> 验证错误要提示的文字 `{{这个中间是name对应的值}}` 
- `rules` -> 一个或多个规则(中间用`|`间隔)

    - `is_emil` -> 验证合法邮箱
    - `is_ip` -> 验证合法 ip 地址
    - `is_fax` -> 验证传真
    - `is_tel` -> 验证座机
    - `is_phone` -> 验证手机
    - `is_url` -> 验证URL
    - `required` -> 是否为必填
    - `max_length` -> 最大长度
    - `min_length` -> 最小长度

```json 
{
    //name 字段
    name: 'email',
    display:"你输入的不{{email}}是合法邮箱|不能为空|太长|太短",
    // 验证条件
    rules: 'is_emil|max_length(12)'
    // rules: 'valid_email|required|max_length(12)|min_length(2)'
}
```

### callback

```js 
var validator = new Validator('example_form',[
    {...},{...}
],function(obj,evt){
    //obj = {
    //  callback:(error, evt, handles)
    //  errors:Array[2]
    //  fields:Object
    //  form:form#example_form
    //  handles:Object
    //  isCallback:true
    //  isEmil:(field)
    //  isFax:(field)
    //  isIp:(field)
    //  isPhone:(field)
    //  isTel:(field)
    //  isUrl:(field)
    //  maxLength:(field, length)
    //  minLength:(field, length)
    //  required:(field)
    //} 
    if(obj.errors.length>0){
        // 判断是否错误
    }
})
```

## 例子

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
],function(obj,evt){
    if(obj.errors){
        // 判断是否错误
    }
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
        display:"请你选择性别{{sex}}",
        // 验证条件
        rules: 'required'
    }
],function(obj,evt){
    if(obj.errors){
        // 判断是否错误
    }
})
validator.validate()
```
