
import { JSONParam } from "./param"; 
import { paramErrorManager } from "./paramErrorManager"; 
import { IChecker } from "./checkers/IChecker";
import { RegexChecker } from "./checkers/RegexChecker";
import { TypeChecker } from "./checkers/TypeChecker";
import { DynamicChecker } from "./checkers/DynamicChecker";

/**
 * 
 * @param json_object  
 * JSON object to validate
 * @param valication_params 
 * an array of validation parameters
 * 
 * @see JSONParam object
 */
export function validate(json_object:any , validation_params:JSONParam[]){

    let ret = true; 
    let errors= new paramErrorManager(); 

    //ist of checkers to check. More checkers will be added in the future
    let checkers:IChecker[]=[
        new RegexChecker(),
        new TypeChecker(),
        new DynamicChecker()
    ];
    
    validation_params.forEach(p=>{

        //check for mandatory fields. if not available, add  the field to error list
        let {mandatory_and_available,available} = isMandatoryFieldAvailable(json_object,p); 
        if(!mandatory_and_available){
            //if not available add field name to the list of errors
            errors.add(p.name, p.name+' is mandatory');
            ret = false;
        }
        //is parameter available but not mandatory? if yes, check for the rest of the conditions 
        else if(available){


            checkers.forEach(validator=>{
                let validation_result = validator.check(json_object,p);
                if(!validation_result){
                    ret = false;
                    errors.add(p.name , validator.error(p),validator.code);
                }
            });

        }
        else{ 
            //not much to do
        }
            
        
    }); 
    return {success:ret,params:errors.invalid_params};
}

function isMandatoryFieldAvailable(json_object:any , param:JSONParam){
    return {
        mandatory_and_available :  param.mandatory? json_object[param.name]!==undefined : true
        ,
        available: json_object[param.name]!==undefined
    }
}
