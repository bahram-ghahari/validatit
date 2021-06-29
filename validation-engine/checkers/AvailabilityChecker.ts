import { IChecker } from "./IChecker";
import { JSONParam } from "../JSONParam";

export class AvailabilityChecker implements IChecker{
    
    check(json_object:any, param:JSONParam):boolean{
        if(json_object===undefined)throw Error("json_object is undefined");
        if(param===undefined)throw Error("param is undefined"); 

        return json_object[param.name]!==undefined;
    }
    error(param:JSONParam){
        const required_param_error:string = "$param.$name is not available.";
    
        let error_message = required_param_error.replace("$param.$name",param.name);
        return error_message;
    }
    code:string;

}