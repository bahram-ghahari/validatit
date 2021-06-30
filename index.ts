import {validate} from './validation-engine/validate'; 
import { JSONParam } from './validation-engine/JSONParam';
 
   export function validatit(json_object:any , param:JSONParam[]){
        return validate(json_object,param);
    }   
 

