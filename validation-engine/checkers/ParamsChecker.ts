import { IChecker } from "./IChecker";
import { JSONParam } from "../JSONParam"; 

export class ParamsChecker implements IChecker{
    
    check(json_object:any, param:JSONParam):boolean{
        if(json_object===undefined)throw Error("json_object is undefined");
        if(param===undefined)throw Error("param is undefined"); 

        //params has value! make sure that type is either undefined or set to OBJECT
        if(param.params!==undefined){
            return (param.type===undefined || param.type==="OBJECT");
        }
        else{//params is undefined! let it slide
            return true;
        }
        
    }
    error(param:JSONParam){
        const required_param_error:string = "$param.$name is set to $param.$type but has validator for nested object. Make sure that type is set to OBJECT.";
    
        let error_message = required_param_error
        .replace("$param.$name",param.name)
        .replace("$param.$type",param.type)
        ; 
        
        return error_message;
    }
    code:string;

}