
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









/**
 * 
 * @param json_object  
 * JSON object to validate
 * @param valication_params 
 * an array of validation parameters
 * 
 * @see JSONParam object
 */
export async  function validate(json_object:any , validation_params:JSONParam[]) { 
   
    //check root
    const result = await validatePath(json_object,validation_params,'');  
 
    return result;
 
}
 
 
async function   validatePath(json_object:any , validation_params:JSONParam[],path:string=""):Promise<ValidationResult>{

    const result: ValidationResult={
        success:true,
        error:[]
    }
    const errors:paramErrorManager = new paramErrorManager(); 
 
    for (let i = 0; i < validation_params.length; i++) {
        const p = validation_params[i];


        //validate each parameter 
        let field_check_result = await validateField(json_object,p,path);  
         
        field_check_result.error.forEach(err=>errors.addParamError(err));
        result.success = result.success && field_check_result.success; 
 

        if(result.success){
            //validate childrens
            if(p.params!==undefined && json_object[p.name]!==undefined){  
                
                //for example: address.[children_parameter]
                path +=`${p.name}.`;
                const internal_result = await validatePath(json_object[`${p.name}`],p.params,path);
                result.success = result.success && internal_result.success; 
                internal_result.error.forEach(e=>errors.addParamError(e));
            }
        }

    }  
    result.error = errors.invalid_params; 
      
    return result;
}
async function validateField(json_object:any, p:JSONParam,path:string):Promise <ValidationResult>{
 
    const result: ValidationResult={
        success:true,
        error:[]
    }
    const errors:paramErrorManager = new paramErrorManager(); 

    if(p.name!==undefined){
        if(p.name.startsWith('*')){
            p.name = p.name.substring(1);
            p.required=true;

        }
        if(p.name.indexOf(":")!==-1)//has type
        {
            const arr_name = p.name.split(":");
            p.type = arr_name[1];
            p.name=arr_name[0];
        }
    } 


    const required_checker = new requiredChecker();
    const availability_checker = new AvailabilityChecker();
    //List of checkers to check. More checkers will be added in the future
    const checkers:IChecker[]=[
        new RegexChecker(),
        new TypeChecker(),
        new ParamsChecker(),
        new DynamicChecker()
    ];

    
    //check for required fields. if not available, add  the field to error list 
    const field_is_required = await required_checker.check(json_object,p);
    const field_is_available = await availability_checker.check(json_object,p); 
 
    
    //if required field is not available add field name to the list of errors
    if(field_is_required && !field_is_available){
        errors.add(`${path}${p.name}`, required_checker.error(p ,json_object[p.name]));
        result.success = false; 
    }



    //is parameter available but not required? if yes, check for the rest of the conditions 
    
    if(field_is_available){

        //itirate though all checkers to find validation errors
        for (let checker_i = 0; checker_i < checkers.length; checker_i++) {
            const validator = checkers[checker_i];
        
            //check
            let validation_result = await validator.check(json_object,p);
 
            //if unsuccessful, add errors to error list
            if(!validation_result){
                result.success = false;
                errors.add(`${path}${p.name}`, validator.error(p,json_object[p.name]),validator.code);
            }
        }  
    }  
     
    result.error = errors.invalid_params; 
    return result;
}