import {expect} from 'chai'; 
import { JSONParam } from '../validation-engine/JSONParam';
import { validate } from '../validation-engine/validate';

import {validatit} from '../index'


describe("requiredChecker for a nested object",()=>{
 
 

    context("validate()",async ()=>{
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

 
        it("Should return true when required is enabled ",async ()=>{
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
            let ret =await validate(json_body,param); 
            
            //assert
            expect(ret.success).to.be.true;
        });
        it("Should validate children when parent is not required but available ",async ()=>{
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
             let ret =await validate(json_body,param);  
             //assert
             //capacity is required but unavailable
             expect(ret.success).to.be.false;




             json_body.school["capacity"]=1200;
             ret =await validate(json_body,param);  
             //assert
             //capacity is required and available
             expect(ret.success).to.be.true;
         });



         it("Should validate doubly nested objects",async ()=>{
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
             let ret =await validate(json_body,param);  
             //assert
             //school.principal.last_name is required 
             expect(ret.success).to.be.true;

             json_body.school["principal"]["last_name"]=undefined;



             json_body.school["capacity"]=1200;
             ret =await validate(json_body,param);  
             //assert
             //school.principal.last_name is required but undefined
             expect(ret.success).to.be.false;
         });



         it("Should validate if parent object is not required",async ()=>{
            let json_object= 
            {
                first_name:"zig",
                last_name:"zag",
                address:{
                    street:"1 yonge st",
                    city:"toronto",
                    province:"on"
                }
            } ;
            let params= 
            [
                {
                    name:"first_name",
                    required:true
                },
                {
                    name:"last_name",
                    required:true
                },
                {
                    name:"address",
                    params:[
                        {
                            name:"street",
                            required:true
                        },
                        {
                            name:"city",
                            required:true
                        },
                        {
                            name:"province",
                            required:true
                        }

                    ]
                } 
            ];
            //act 
            let ret =await validate(json_object,params);  
            //assert
            //all fields are provided 
            expect(ret.success).to.be.true;



            let json_object2= 
            {
                first_name:"zig",
                last_name:"zag",
                address:{ 
                    city:"toronto",
                    province:"on"
                }
            } ;
 
            ret =await validate(json_object2,params);  
            //assert
            //address.street is required but undefined
            expect(ret.success).to.be.false;

            json_object.address=undefined;
 
            ret =await validate(json_object,params);  
            //assert
            //address children are required but address itself is undefined
            expect(ret.success).to.be.true;
        });

         it("Should return only 1 error after multiple executions",async ()=>{
 
           param =  [{
                name:"city",
                required: true 
            }]; 
            //act 
            let ret = await validatit(json_body,param);  
            //assert
            //school.principal.last_name is required 
            expect(ret.error[0].error.length).to.eq(1);
 

            ret = await validatit(json_body,param);  
            //assert
            //school.principal.last_name is required 
            expect(ret.error[0].error.length).to.eq(1);
        });
    });
 

});


describe("simplified version",()=>{
    context("required",()=>{
        it("should mark it as required if name has a * at the beginning",async ()=>{
            let json = {
                first_name:"jamie",
                last_name:"Holmes",
                address:{
                    street:""
                }
            };
            let params=[
                {name:"*first_name"},
                {name:"*last_name"},
                {name:"*address"},

            ];
            let res = await validatit(json,params);

            expect(res.success).to.be.true;


            let json2 = {
                first_name:"jamie",
                last_name:"Holmes" 
            }; 
            res = await validatit(json2,params);

            expect(res.success).to.be.false;
        })
    });

    context("type",()=>{
        it("should check type if there is a name:type format",async ()=>{
            let json = {
                first_name:"jamie",
                phone:"+18889203388",
                address:{
                    street:""
                }
            };
            let params=[
                {name:"first_name:STRING"},
                {name:"phone:PHONE"} 

            ];
            let res = await validatit(json,params);

            expect(res.success).to.be.true;


            let json2 = {
                first_name:"jamie",
                phone:"na" 
            }; 
            res = await validatit(json2,params);

            expect(res.success).to.be.false;


            params=[
                {name:"first_name:STRING:NUMBER"},
                {name:"phone:PHONE:"} 

            ];
            res = await validatit(json,params);

            expect(res.success).to.be.true;

 
        })
    });

    context("combination",()=>{
        it("should check type and regired if there is a *name:type format",async ()=>{
            let json = {
                first_name:"jamie",
                phone:"+18889203388",
                address:{
                    street:""
                }
            };
            let params=[
                {name:"*first_name:STRING"},
                {name:"*phone:PHONE"} 

            ];
            let res = await validatit(json,params);

            expect(res.success).to.be.true;

            params=[
                {name:"*first_name:STRING"},
                {name:"*phone:PHONE"} ,
                {name:"*last_name"} 
            ];
            res = await validatit(json,params); 
            expect(res.success).to.be.false; 


            params=[
                {name:"*first_name:NUMBER"},
                {name:"*phone:PHONE"}  
            ];
            res = await validatit(json,params);

            expect(res.success).to.be.false;
 
        })
    });
});
 