
export function isCreditCard(value:any):boolean{
    const cc_regex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    
    let type_ret = true; 
    type_ret = cc_regex.exec(value)!==null;

    if(type_ret){
        type_ret = type_ret && is_card_valid(value)
    }
    return type_ret;
}


/*
 * JavaScript implementation of the Luhn algorithm, with calculation and validation functions
 */

/* luhn_checksum
 * Implement the Luhn algorithm to calculate the Luhn check digit.
 * Return the check digit. 
 */
 function luhn_checksum(card_number:string):number {
    var len = card_number.length
    var parity = len % 2
    var sum = 0
    for (var i = len-1; i >= 0; i--) {
        var d = parseInt(card_number.charAt(i))
        if (i % 2 == parity) { d *= 2 }
        if (d > 9) { d -= 9 }
        sum += d
    }
    return sum % 10
}

/* luhn_caclulate
 * Return a full code (including check digit), from the specified partial code (without check digit).
 */
 function luhn_caclulate(card_number:string):number {
    var checksum = luhn_checksum(card_number )
    return checksum == 0 ? 0 : 10 - checksum
}
 function is_card_valid(card_number :string) {
    return luhn_caclulate(card_number) == 0; 
}