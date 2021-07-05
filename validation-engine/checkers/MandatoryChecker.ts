import { IChecker } from "./IChecker";
import { JSONParam } from "../JSONParam";
import { ParamsChecker } from "./ParamsChecker";

export class requiredChecker implements IChecker{
    
    async check(json_object:any, param:JSONParam):Promise<boolean>{
        if(json_object===undefined)throw Error("json_object is undefined");
        if(param===undefined)throw Error("param is undefined"); 
        if(param.name===undefined || param.name.trim() ==='')throw Error("name is undefined"); 
        
        return param.required===true ;
    }
    error(param:JSONParam,value:any){
        const required_param_error:string = param.required_error_message===undefined? "$param.$name is a required field." : param.required_error_message;
    
        let error_message = required_param_error
        .replace("$param.$name",param.name) 
        .replace("$param.$value",value)

        ;
        return error_message;
    }
    code:string;

}