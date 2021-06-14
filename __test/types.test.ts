import { expect } from "chai";
import {isObject} from '../validation-engine/checkers/types/object'
import { isCreditCard } from "../validation-engine/checkers/types/creditcard";
describe("object",()=>{
    
    context("is_object()",()=>{
 
        it("should return true when input is an object",()=>{
            //arrage
            const input = {};
            //act 
            let res = isObject(input);
            //assert  
            expect(res,'object').to.be.true;



            //arrage
            const null_input = null;
            //act 
            res = isObject(null_input);
            //assert  
            expect(res,'null').to.be.true;

 
        }); 


        it("should return false when input is not an object",()=>{
            //arrage
            const input = {
                string:"name",
                number:12,
                phone:"+18889990033",
                array:[],
                date:"1/1/1999",
                email:"x@gmail.com",
                boolean:true,
                function :function(fn_input) {
                    
                }
            };
            //act 
            let res = isObject(input.array);
            //assert  
            expect(res,"array is not object type").to.be.false;


            res = isObject(input.boolean);
            //assert  
            expect(res,"boolean is not object type").to.be.false;


            res = isObject(input.date);
            //assert  
            expect(res,"date is not object type").to.be.false;


            res = isObject(input.email);
            //assert  
            expect(res,"email is not object type").to.be.false;


            res = isObject(input.function);
            //assert  
            expect(res,"function is not object type").to.be.false;


            res = isObject(input.number);
            //assert  
            expect(res,"number is not object type").to.be.false;


            res = isObject(input.phone);
            //assert  
            expect(res,"phone is not object type").to.be.false;

 
            res = isObject(input.string);
            //assert  
            expect(res,"string is not object type").to.be.false;


            res = isObject(undefined);
            //assert  
            expect(res,"undefined is not object type").to.be.false;
 
        }); 

    });
});

describe("credit card",()=>{
    
    context("is_object()",()=>{
 
        it("should return true when input is a credit card",()=>{
            //arrage
            const input = {
                visa:{
                    1:"4111111111111111",
                    2:"4012888888881881"
                },
                master:{
                    1:"5555555555554444",
                    2:"5105105105105100",
                    3:"2222630000001125"
                },
                amex:{
                    1:"378282246310005",
                    2:"371449635398431"
                },
            };
            //act 
            let res = isCreditCard(input.visa[1]);
            //assert  
            expect(res ,'visa 1 ').to.be.true;

            //act 
            res = isCreditCard(input.visa[2]);
            //assert  
            expect(res ,'visa 2').to.be.true;




            //act 
            res = isCreditCard(input.master[1]);
            //assert  
            expect(res ,'master 1').to.be.true;

            //act 
            res = isCreditCard(input.master[2]);
            //assert  
            expect(res ,'master 2').to.be.true;

   


                        
            //act 
            res = isCreditCard(input.amex[1]);
            //assert  
            expect(res ,'amex 1').to.be.true;

            //act 
            res = isCreditCard(input.amex[2]);
            //assert  
            expect(res ,'amex 2').to.be.true;
 
  
 
        }); 

 
    });
});
