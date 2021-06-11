import { IChecker } from "./IChecker";
import { JSONParam } from "../JSONParam";
import  { ARRAY, OBJECT, BOOLEAN, STRING, NUMBER, FUNCTION, DATE, CREDIT_CARD, EMAIL, PHONE, ANY }  from "../paramType";
import { isObject } from "./types/object";

export class TypeChecker implements IChecker{
    check(json_object:any,param:JSONParam):boolean{

        if(json_object===undefined)throw Error("json_object is undefined");
        if(param===undefined)throw Error("param is undefined"); 


        const value = json_object[param.name];
        const phone_regex = /^\+[1-9]\d{1,14}$/;
        const email_regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        const cc_regex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    
        let type_ret = true;
        if(param.type!==undefined){
            switch(param.type){
                case ARRAY:
                    type_ret = value.constructor == [].constructor;
                    break;
                case OBJECT:
                    type_ret = isObject(value);
                    break;        
                case BOOLEAN:
                    type_ret = typeof value === 'boolean';
                    break;
                case STRING:
                    type_ret = typeof value === 'string';
                    break;
                case NUMBER:
                    type_ret = typeof value === 'number'; 
                    break;
                case FUNCTION:
                    type_ret = typeof value === 'function' ; 
                    break;
                case DATE:
                    let date_str = value.toString();
                    let date_number = Date.parse(date_str);
                    type_ret = !isNaN(date_number);
                    break;
                case CREDIT_CARD:
                    type_ret = cc_regex.exec(value)!==null;
                    break;
                case EMAIL:
                    type_ret = email_regex.exec(value)!==null;
                    break;
                case PHONE:
                    type_ret = phone_regex.exec(value)!==null;
                    break;
                case ANY:
                    type_ret = true;
                    break;
                default:
                    throw  `
                    Type "${param.type}" is unsupported. 
                    Use one of the following: ARRAY, OBJECT, BOOLEAN, STRING, NUMBER, FUNCTION, DATE, CREDIT_CARD, EMAIL, PHONE, ANY 
                    `;
            }
        }
        return type_ret;
    
    }

    error(param:JSONParam):string{
        const param_type_error:string = "$param.$name has an invalid type.";
    
        let error_message = param_type_error.replace("$param.$name",param.name);
        return error_message;
    }
    code:string;
}