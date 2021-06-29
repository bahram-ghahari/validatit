import { paramError } from "./paramError";

/**
 * Summary. Manages validation errors
 */
export class paramErrorManager{

    /**
     * An array representing validation errors
     * 
     * @example
     * 
     * [
     * {
     *      "error":"name has an invalid type."
     * },
     * {
     *      "error":"from should be smaller than to"
     * } 
     * ]
     */
    invalid_params:paramError[]=[];

    /**
     * Summary. Add an error into invalid_params.
     * @param {field} string Parameter name
     * @param {error} string Custom error message
     * @param {code}  string An optional error code
     */
    add(field:string, error:string,code?:string ){
        let field_exists = false;
        //itirate through invalid_params to find field name.
        this.invalid_params.forEach(ip=>{
            //if field already exists in invalid_params, add error message and code to existing error messages
            if(ip.name===field)
            {
                field_exists=true;
                ip.error.push({
                    error_message:error,
                    error_code:code
                });
            }
        });
        //if that field does not exists, add a new item to invalid_params.
        if(!field_exists){
            this.invalid_params.push({
                name:field,
                error:[{
                    error_message:error,
                    error_code:code
                }]
            });
        }
    }

    /**
     * summary. Add ParamError into invalid_params
     * @param p Generated ParamError 
     * 
     */
    addParamError(p:paramError){
        p.error.forEach(x=>{
            this.add(p.name,x.error_message,x.error_code);
        });
    }

}     