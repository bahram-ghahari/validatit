
import { JSONParam } from "./JSONParam"; 
import { paramErrorManager } from "./paramErrorManager"; 
import { IChecker } from "./checkers/IChecker";
import { RegexChecker } from "./checkers/RegexChecker";
import { TypeChecker } from "./checkers/TypeChecker";
import { DynamicChecker } from "./checkers/DynamicChecker";
import { MandatoryChecker } from "./checkers/MandatoryChecker";
import { AvailabilityChecker } from "./checkers/AvailabilityChecker";
import { ParamsChecker } from "./checkers/ParamsChecker";

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
    const errors= new paramErrorManager(); 
    const mandatory_checker = new MandatoryChecker();
    const availability_checker = new AvailabilityChecker();

    //ist of checkers to check. More checkers will be added in the future
    const checkers:IChecker[]=[
        new RegexChecker(),
        new TypeChecker(),
        new ParamsChecker(),
        new DynamicChecker()
    ];
    
    validation_params.forEach(p=>{

        //check for mandatory fields. if not available, add  the field to error list

        let field_is_mandatory = mandatory_checker.check(json_object,p);
        let field_is_available = availability_checker.check(json_object,p); 


        //if not available add field name to the list of errors
        if(field_is_mandatory && !field_is_available){
            errors.add(p.name, mandatory_checker.error(p));
            ret = false;
            return;
        }


        //is parameter available but not mandatory? if yes, check for the rest of the conditions 
        if(field_is_available){


            checkers.forEach(validator=>{
                let validation_result = validator.check(json_object,p);
                if(!validation_result){
                    ret = false;
                    errors.add(p.name , validator.error(p),validator.code);
                }
            });

        }
            
        
    }); 
    return {success:ret,params:errors.invalid_params};
}
 