import {ANY} from './paramType'  



/**
 * @author Bahram Ghahari
 * Summary. Contains validators for a JSON parameter
 */
export class JSONParam{

    /**
     * parameter name. 
     * @example 
     * JSON_OBJECT = {
     *      success:true
     * }
     * param.name = "success"
     */
    name:string;




    /**
     * is this parameter required?
     */
    required?:boolean;

    /**
     * custom error message for required field 
    */
   required_error_message?:string;

    /** 
     * Custom regular expression validator. 
     */
    pattern?:RegExp;

    /**
     * Regex custom error message.
     */
    pattern_error_message?:string;


    /**
     * Parameter's type. 
     * Available Types:
     * ARRAY, OBJECT, BOOLEAN, STRING, NUMBER, FUNCTION, DATE, CREDIT_CARD, EMAIL, PHONE, ANY 
     */
    type?:string;

    /**
     * Custom error message for type errors.
     */
    type_error_message?:string;


    /**
     * Custom function to validate.
     * 
     * @example
     * JSON_Object = 
     * {
     *      from:1,
     *      to:100
     * }
     * this validator make sure that 'from' is smaller than 'to'
     * param = 
     * {
     *      name:'from',
     *      required:true,
     *      dynamicValidation:function(body){
     *           if(body.from< body.to){
     *               return {success:true};
     *           }else
     *               return {success:false,error_message:"from should be smaller than to"};
     *      }
     * }
     */
    dynamicValidation?:(body:any)=>Promise<dynamicValidationResult>;

 
    /**
     * List of parameters for the nested object
     * **Important:type has to be either undefined of set to OBJECT
     */
    params?:JSONParam[]=[];


    /**
     * 
     * @param {name} string name of the parameter
     * @param {type} string parameter type
     * @param {type_error_message} string  custom message for type errors
     * @param {required} boolean is it required?
     * @param {required_error_message} string  custom error message for required fields
     * @param {pattern} RegExp custom regular expression
     * @param {pattern_error_message} string  custom regex message
     * @param {dynamicValidation} function custom validation
     */
    constructor(
        name:string , 
        type?:string , 
        type_error_message?:string, 
        required?:boolean ,
        required_error_message?:string, 
        pattern?:RegExp , 
        pattern_error_message?:string , 
        dynamicValidation?:(any)=>Promise<dynamicValidationResult>)
    {
        this.name = name;
        this.required = required===null? false:required; 
        this.type = type===null? ANY:type;
        this.pattern = pattern===null? /./:pattern;  
        this.pattern_error_message = pattern_error_message;
        this.type_error_message = type_error_message; 
        this.required_error_message=required_error_message;
        this.dynamicValidation = dynamicValidation ===null? 
        
            async (body) => {
                let res:dynamicValidationResult={success:true,error_message:""};
                return res;
            }
            :
            dynamicValidation;
    }




}


export interface dynamicValidationResult{
    success:boolean;
    error_message?:string;
}