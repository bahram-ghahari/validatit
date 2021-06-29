import {expect} from 'chai'; 
import { JSONParam } from '../validation-engine/JSONParam';
import { validate } from '../validation-engine/validate';




describe("mandatoryChecker for a nested object",()=>{
 
 

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

 
        it("Should return true when mandatory is enabled ",()=>{
           param =  [{
                name:"school",
                mandatory:true , 
                params:[
                    {
                        name:"name",
                        mandatory:true
                    },
                    {
                        name:"address",
                        mandatory:true ,
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
        it("Should validate children when parent is not mandatory but available ",()=>{
            param =  [{
                 name:"school",
                 mandatory:false , 
                 params:[
                     {
                         name:"name",
                         mandatory:true
                     },
                     {
                         name:"capacity",
                         mandatory:true  
                     } 
                 ]
             }];
             //act 
             let ret = validate(json_body,param);  
             //assert
             //capacity is mandatory but unavailable
             expect(ret.Success).to.be.false;




             json_body.school["capacity"]=1200;
             ret = validate(json_body,param);  
             //assert
             //capacity is mandatory and available
             expect(ret.Success).to.be.true;
         });



         it("Should validate doubly nested objects",()=>{
             json_body.school["principal"]={
                first_name:"michael",
                last_name:"allen" 
             };
            param =  [{
                 name:"school",
                 mandatory:false , 
                 params:[
                     {
                         name:"name",
                         mandatory:true
                     },
                     {
                         name:"capacity",
                         mandatory:true  
                     },
                     {
                         name:"principal",
                         mandatory:true,
                         params:[
                             {
                                 name:"last_name",
                                 mandatory:true
                             }
                         ]
                     }
                 ]
             }];
             //act 
             let ret = validate(json_body,param);  
             //assert
             //school.principal.last_name is mandatory 
             expect(ret.Success).to.be.true;

             json_body.school["principal"]["last_name"]=undefined;



             json_body.school["capacity"]=1200;
             ret = validate(json_body,param);  
             //assert
             //school.principal.last_name is mandatory but undefined
             expect(ret.Success).to.be.false;
         });
    });
 

});

 