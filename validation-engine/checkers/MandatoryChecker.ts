import { IChecker } from "./IChecker";
import { JSONParam } from "../JSONParam";
import { ParamsChecker } from "./ParamsChecker";

export class requiredChecker implements IChecker{
    
    check(json_object:any, param:JSONParam):boolean{
        if(json_object===undefined)throw Error("json_object is undefined");
        if(param===undefined)throw Error("param is undefined"); 

        return param.required===true ;
    }
    error(param:JSONParam){
        const required_param_error:string = param.required_error_message===undefined? "$param.$name is a required field." : param.required_error_message;
    
        let error_message = required_param_error.replace("$param.$name",param.name);
        return error_message;
    }
    code:string;

}