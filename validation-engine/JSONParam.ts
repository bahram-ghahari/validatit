import {ANY} from './paramType' 
import { validate } from './validate';



/**
 * @author Bahram Ghahari
 * Summary. Contains validators for a JSON parameter
 */
export class JSONParam{

    /**
     * is this parameter mandatory?
     */
    mandatory?:boolean;

    /**
     * parameter name. 
     * @example 
     * JSON_OBJECT = {
     *      success:true
     * }
     * name = "success"
     */
    name:string;

    /**
     * Custom regular expression validator. 
     */
    regex?:RegExp;

    /**
     * Regex custom error message.
     */
    regexErrorMessage?:string;


    /**
     * Parameter's type. 
     * Available Types:
     * ARRAY, OBJECT, BOOLEAN, STRING, NUMBER, FUNCTION, DATE, CREDIT_CARD, EMAIL, PHONE, ANY 
     */
    type?:string;

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
     *      mandatory:true,
     *      dynamicValidation:function(body){
     *           if(body.from< body.to){
     *               return {success:true};
     *           }else
     *               return {success:false,error_message:"from should be smaller than to"};
     *      }
     * }
     */
    dynamicValidation?:(body:any)=>{success:boolean,error_message?:string};

 
    /**
     * List of parameters for the nested object
     * **Important:type has to be either undefined of set to OBJECT
     */
    params?:JSONParam[]=[];


    /**
     * List of parameters for the nested object
     * **Important:type has to be either undefined of set to OBJECT
     */
    params?:JSONParam[]=[];


    /**
     * 
     * @param {name} string name of the parameter
     * @param {type} string parameter type
     * @param {mandatory} boolean is it mandatory?
     * @param {regex} RegExp custom regular expression
     * @param {regexErrorMessage} string  custom regex message
     * @param {dynamicValidation} function custom validation
     */
    constructor(
        name:string , 
        type?:string ,  
        mandatory?:boolean , 
        regex?:RegExp , 
        regexErrorMessage?:string , 
        dynamicValidation?:(any)=>{success;boolean,error_message?:string})
    {
        this.name = name;
        this.mandatory = mandatory===null? false:mandatory; 
        this.type = type===null? ANY:type;
        this.regex = regex===null? /./:regex; 
        this.regexErrorMessage =regexErrorMessage===null?'Invalid parameter':regexErrorMessage;
        this.dynamicValidation = dynamicValidation ===null? function (body:any) {return {success:true};}:dynamicValidation;
    }




}