
export function isNumber(value:any):boolean{

    let type_ret = true;

    type_ret = typeof value === 'number'; 

    return type_ret;
}