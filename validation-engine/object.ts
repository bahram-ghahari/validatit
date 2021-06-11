import { JSONParam } from "./param";

/**
 * Summary. Representing JSON schema 
 */
export class JSONObject{
    /**
     * List of JSON Parameter validators
     */
    params:JSONParam[];

    constructor(params:JSONParam[]){
        this.params = params;
    }
}