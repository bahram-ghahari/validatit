import { IChecker } from "./IChecker";
import { JSONParam } from "../JSONParam"; 

export class DynamicChecker implements IChecker{
    
    error_message:string;
    check(json_object:any, param:JSONParam):boolean{

        let success = true;
        if(param.dynamicValidation!==undefined){
            let res = param.dynamicValidation(json_object);
            success = res.success;
            this.error_message=res.error_message;
        }
        return success;
    }
    error(param:JSONParam,value:any){ 
        return  this.error_message
        .replace("$param.$name",param.name)
        .replace("$param.$value",value)
        
        ;
    }
    code:string;

}