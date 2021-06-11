
export function isObject(value:any):boolean{

    let type_ret = true;
    const is_object = typeof value === 'object';

    //if value is object, make sure it is not an array.
    if(is_object){
        if(value===null)
            type_ret=true;
        else{
            const is_array =value.constructor == [].constructor;
            type_ret = !is_array;
        }
    }
    else 
    {
        type_ret = false;
    }





    return type_ret;
}