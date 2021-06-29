import { IChecker } from "./IChecker";
import { JSONParam } from "../JSONParam";

export class MandatoryChecker implements IChecker{
    
    check(json_object:any, param:JSONParam):boolean{
        if(json_object===undefined)throw Error("json_object is undefined");
        if(param===undefined)throw Error("param is undefined"); 

        return param.mandatory===true ;
    }
    error(param:JSONParam){
        const mandatory_param_error:string = "$param.$name is a mandatory field.";
    
        let error_message = mandatory_param_error.replace("$param.$name",param.name);
        return error_message;
    }
    code:string;

}