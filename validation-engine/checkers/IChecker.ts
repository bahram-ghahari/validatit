import { JSONParam } from "../param";

/**
 * Validation checker interface
 */
export interface IChecker{
    /**
     * Summary. Check the provided object based on the parameter validator  
     * @param {json_object} any object to validate
     * @param {param} JSONParam parameter validator 
     */
    check(json_object:any, param:JSONParam):boolean;

    /**
     * Summary. Provide custom errr message for failed validations
     * @param {param} JSONParam parameter validator 
     */
    error(param:JSONParam):string;
    /**
     * custom error code.
     */
    code:string;
    
}