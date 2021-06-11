import {validate} from './validation-engine/validate'; 
import { JSONParam } from './validation-engine/param';


export function check(json_object:any , param:JSONParam[]){
    return validate(json_object,param);
}
