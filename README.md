<h1 align="center">Welcome to validatit 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/validatit" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/validatit.svg">
  </a>
  <a href="https://github.com/bahram-ghahari/validatit#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/bahram-ghahari/validatit/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/bahram-ghahari/validatit/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/bahram-ghahari/validatit" />
  </a>
</p>

> Validatit helps you to validate JSON objects.

### 🏠 [Homepage](https://github.com/bahram-ghahari/validatit#readme)

## Install

```sh
npm i validatit@latest
```


## Usage

```node
import {validatit} from 'validatit'
```

Call validatit function

```node
let json = {
    first_name:"jamie",
    phone:"+18889203388",
    address:{
        street:""
    }
};
let params=[
    {name:"*first_name:STRING"},
    {name:"*phone:PHONE"} ,
    {
    name:"address",
    params:[
      {name:"*street"}
    ]
    }

];
let res = await validatit(json,params);

```


## Params

Parameter name | description | example | notes
--- | --- | ---  | ---
name | name of the parameter to ve validated | name:"first_name"  | 
required | indicates that the parameter is mandatory | {name:"first_name" ,required:true} | you can use {name:"*first_name"} instead to have smaller validators
type | parameter type. Current types are :ARRAY, OBJECT, BOOLEAN, STRING, NUMBER, FUNCTION, DATE, CREDIT_CARD, EMAIL, PHONE, ANY | {name:"first_name" ,type:"STRING"} | you can use {name:"first_name:STRING"} instead to have smaller validators
 pattern | custom regular expression | {name:"first_name",pattern:/^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/}  | 
 dynamicValidation | used for custom runtime validations | {name:"first_name",dynamicValidation:asyc(body)=>return {success:true,error_message:""}}  |  
 



## Run tests

```sh
npm run test
```

## Author

👤 **Bahram Ghahari**

* Github: [@bahram-ghahari](https://github.com/bahram-ghahari)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/bahram-ghahari/validatit/issues). You can also take a look at the [contributing guide](https://github.com/bahram-ghahari/validatit/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright &copy; 2021 [Bahram Ghahari](https://github.com/bahram-ghahari).<br />
This project is [MIT](https://github.com/bahram-ghahari/validatit/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_