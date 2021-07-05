import { JSONParam } from "../JSONParam";

/**
 * Validation checker interface
 */
export interface IChecker{
    /**
     * Summary. Check the provided object based on the parameter validator  
     * @param {json_object} any object to validate
     * @param {param} JSONParam parameter validator 
     */
    check(json_object:any, param:JSONParam):Promise< boolean >;

    /**
     * Summary. Provide custom errr message for failed validations
     * @param {param} JSONParam parameter validator 
     * @param {value} JSONParam parameter's actual value'
     * 
     */
    error(param:JSONParam,value:any):string;
    /**
     * custom error code.
     */
    code:string;
    
}