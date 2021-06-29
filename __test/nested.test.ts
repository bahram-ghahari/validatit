import {expect} from 'chai'; 
import { JSONParam } from '../validation-engine/JSONParam';
import { validate } from '../validation-engine/validate';




describe("requiredChecker for a nested object",()=>{
 
 

    context("validate()",()=>{
        //arrange
        const json_body={
            first_name:"James" ,
            school:{
                name:"Maxwell High",
                age:120,
                address:"2 BAyview"
            }
        }; 
        let param:JSONParam[];  

 
        it("Should return true when required is enabled ",()=>{
           param =  [{
                name:"school",
                required:true , 
                params:[
                    {
                        name:"name",
                        required:true
                    },
                    {
                        name:"address",
                        required:true ,
                        type:"STRING"

                    }
                    ,{
                        name:"age",
                        type:"NUMBER"
                    }
                ]
            }];
            //act 
            let ret = validate(json_body,param); 
            
            //assert
            expect(ret.Success).to.be.true;
        });
        it("Should validate children when parent is not required but available ",()=>{
            param =  [{
                 name:"school",
                 required:false , 
                 params:[
                     {
                         name:"name",
                         required:true
                     },
                     {
                         name:"capacity",
                         required:true  
                     } 
                 ]
             }];
             //act 
             let ret = validate(json_body,param);  
             //assert
             //capacity is required but unavailable
             expect(ret.Success).to.be.false;




             json_body.school["capacity"]=1200;
             ret = validate(json_body,param);  
             //assert
             //capacity is required and available
             expect(ret.Success).to.be.true;
         });



         it("Should validate doubly nested objects",()=>{
             json_body.school["principal"]={
                first_name:"michael",
                last_name:"allen" 
             };
            param =  [{
                 name:"school",
                 required:false , 
                 params:[
                     {
                         name:"name",
                         required:true
                     },
                     {
                         name:"capacity",
                         required:true  
                     },
                     {
                         name:"principal",
                         required:true,
                         params:[
                             {
                                 name:"last_name",
                                 required:true
                             }
                         ]
                     }
                 ]
             }];
             //act 
             let ret = validate(json_body,param);  
             //assert
             //school.principal.last_name is required 
             expect(ret.Success).to.be.true;

             json_body.school["principal"]["last_name"]=undefined;



             json_body.school["capacity"]=1200;
             ret = validate(json_body,param);  
             //assert
             //school.principal.last_name is required but undefined
             expect(ret.Success).to.be.false;
         });
    });
 

});

 