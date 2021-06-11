import { IChecker } from "./IChecker";
import { JSONParam } from "../param"; 

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
    error(param:JSONParam){ 
        return this.error_message;
    }
    code:string;

}