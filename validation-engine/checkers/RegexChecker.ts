import { IChecker } from "./IChecker";
import { JSONParam } from "../JSONParam";

export class RegexChecker implements IChecker{
    
    check(json_object:any, param:JSONParam):boolean{
        if(json_object===undefined)throw Error("json_object is undefined");
        if(param===undefined)throw Error("param is undefined"); 



        let regex_ret = true;
        if(param.regex!==undefined){
            const value = json_object[param.name];
            if(value===undefined)return regex_ret=false;
            else{
                const value_str:string = value.toString();
                regex_ret = value_str.match(param.regex)!==null;
            }
        }
        return regex_ret;
    }
    error(param:JSONParam){
        const mandatory_param_error:string = "$param.$name is invalid.";
    
        let error_message = mandatory_param_error.replace("$param.$name",param.name);
        return error_message;
    }
    code:string;

}