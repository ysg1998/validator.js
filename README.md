# validator

轻量级的JavaScript表单验证，字符串验证。没有依赖，支持UMD，`~3kb`。

## 安装使用

### 模块

```bash
$ npm install validator.tool --save
```

```js
var validator = require('validator.tool');
var v = new validator();
v.isEmil('wowohoo@qq.com');
v.isIp('192.168.23.3');
v.isFax('');

var a = new validator('example_form',[
    {...}
],function(obj,evt){
    if(obj.errors){
        // 判断是否错误
    }
})
```



## 客户端使用

```html 
<form id="example_form">
    <div>
        <label>邮箱验证</label>
        <input type="text" name="email" />
    </div>
</form>
<script type="text/javascript" src="dist/validator.min.js"></script>
<script type="text/javascript">
var v = new Validator();
v.isEmil('wowohoo@qq.com');
v.isIp('192.168.23.3');
</script>
```

> new Validator(formName, option, callback)


### formName

`formName` 是标签中`<form>` 中的 `id` 或者 `name` 的值，如上面的`example_form`

### option

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

```js 
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

### 字符串验证 

```js
var v = new Validator();
v.isEmil('wowohoo@qq.com'); // -> 验证合法邮箱  |=> 返回布尔值
v.isIp('192.168.23.3'); // -> 验证合法 ip 地址  |=> 返回布尔值
v.isFax(''); // -> 验证传真  |=> 返回布尔值
v.isPhone('13622667263'); // -> 验证手机  |=> 返回布尔值
v.isTel('021－324234-234'); // -> 验证座机  |=> 返回布尔值
v.isUrl('http://JSLite.io'); // -> 验证URL  |=> 返回布尔值
v.maxLength('JSLite',12); // -> 最大长度  |=> 返回布尔值
v.minLength('JSLite',3); // -> 最小长度  |=> 返回布尔值
v.required('23'); // -> 是否为必填(是否为空)  |=> 返回布尔值
```

### 表单中验证

**点击按submit按钮验证** 

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

**没有submit验证**

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


## 相关正则

```js 
{
    // 匹配 max_length(12) => ["max_length",12]
    rule:/^(.+?)\((.+)\)$/,
    // 数字
    numericRegex:/^[0-9]+$/,
    /**
    * @descrition:邮箱规则
    * 1.邮箱以a-z、A-Z、0-9开头，最小长度为1.
    * 2.如果左侧部分包含-、_、.则这些特殊符号的前面必须包一位数字或字母。
    * 3.@符号是必填项
    * 4.右则部分可分为两部分，第一部分为邮件提供商域名地址，第二部分为域名后缀，现已知的最短为2位。最长的为6为。
    * 5.邮件提供商域可以包含特殊字符-、_、.
    */
    email:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    /**
     * [ip ipv4、ipv6]
     * "192.168.0.0"
     * "192.168.2.3.1.1"
     * "235.168.2.1"
     * "192.168.254.10"
     * "192.168.254.10.1.1"
     */
    ip:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/,
    /**
    * @descrition:判断输入的参数是否是个合格的固定电话号码。
    * 待验证的固定电话号码。
    * 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)
    **/
    fax:/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
    /**
    *@descrition:手机号码段规则
    * 13段：130、131、132、133、134、135、136、137、138、139
    * 14段：145、147
    * 15段：150、151、152、153、155、156、157、158、159
    * 17段：170、176、177、178
    * 18段：180、181、182、183、184、185、186、187、188、189
    */
    phone:/^(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/,
    /**
     * @descrition 匹配 URL
     */
    url:/[a-zA-z]+:\/\/[^\s]/
}
```


## 参考

借鉴这些优秀的库，撸出此玩意儿。

- [chriso/validator.js](https://github.com/chriso/validator.js)一个字符串验证器和转换类型的库
- [rickharrison/validate.js](https://github.com/rickharrison/validate.js) validate.js是一个轻量级的JavaScript表单验证库灵感来源[CodeIgniter](http://codeigniter.org.cn/user_guide/libraries/form_validation.html)。