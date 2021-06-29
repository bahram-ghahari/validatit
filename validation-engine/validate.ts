
import { JSONParam } from "./JSONParam"; 
import { paramErrorManager } from "./paramErrorManager"; 
import { IChecker } from "./checkers/IChecker";
import { RegexChecker } from "./checkers/RegexChecker";
import { TypeChecker } from "./checkers/TypeChecker";
import { DynamicChecker } from "./checkers/DynamicChecker";
import { requiredChecker } from "./checkers/MandatoryChecker";
import { AvailabilityChecker } from "./checkers/AvailabilityChecker";
import { ParamsChecker } from "./checkers/ParamsChecker";
import { ValidationResult } from "./ValidationResult";






const required_checker = new requiredChecker();
const availability_checker = new AvailabilityChecker();
//List of checkers to check. More checkers will be added in the future
const checkers:IChecker[]=[
    new RegexChecker(),
    new TypeChecker(),
    new ParamsChecker(),
    new DynamicChecker()
];




/**
 * 
 * @param json_object  
 * JSON object to validate
 * @param valication_params 
 * an array of validation parameters
 * 
 * @see JSONParam object
 */
export function validate(json_object:any , validation_params:JSONParam[]) { 
    //check root
    const result =  validatePath(json_object,validation_params,''); 
    return result;
}
 
 
function  validatePath(json_object:any , validation_params:JSONParam[],path:string=""):ValidationResult{

    
    const result = new ValidationResult(); 
    const errors= new paramErrorManager(); 


    
    for (let i = 0; i < validation_params.length; i++) {
        const p = validation_params[i];


        //validate each parameter
        let field_check_result = validateField(json_object,p,path); 
        result.Success = result.Success && field_check_result.Success;
        field_check_result.Params.forEach(x=>errors.addParamError(x));
        if(result.Success){
            //validate childrens
            if(p.params!==undefined){
                //for example: address.[children_parameter]
                path +=`${p.name}.`;
                const internal_result = validatePath(json_object[`${p.name}`],p.params,path);
                result.Success = result.Success && internal_result.Success; 
                internal_result.Params.forEach(e=>errors.addParamError(e));
            }
        }

    }  
    result.Params = errors.invalid_params;   
    return result;
}
function validateField(json_object:any, p:JSONParam,path:string):ValidationResult{

    const errors= new paramErrorManager(); 
    const result = new ValidationResult(); 
    //check for required fields. if not available, add  the field to error list 
    const field_is_required = required_checker.check(json_object,p);
    const field_is_available = availability_checker.check(json_object,p); 
 
    
    //if required field is not available add field name to the list of errors
    if(field_is_required && !field_is_available){
        errors.add(`${path}${p.name}`, required_checker.error(p));
        result.Success = false; 
    }



    //is parameter available but not required? if yes, check for the rest of the conditions 
    
    if(field_is_available){

        //itirate though all checkers to find validation errors
        for (let checker_i = 0; checker_i < checkers.length; checker_i++) {
            const validator = checkers[checker_i];
        
            //check
            let validation_result = validator.check(json_object,p);

            //if unsuccessful, add errors to error list
            if(!validation_result){
                result.Success = false;
                errors.add(`${path}${p.name}`, validator.error(p),validator.code);
            }
        }  
    }  
     
    result.Params = errors.invalid_params; 
    return result;
}