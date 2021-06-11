import {expect} from 'chai'; 
import { MandatoryChecker } from '../validation-engine/checkers/MandatoryChecker';
import { AvailabilityChecker } from '../validation-engine/checkers/AvailabilityChecker';
import { RegexChecker } from '../validation-engine/checkers/RegexChecker';
import { TypeChecker } from '../validation-engine/checkers/TypeChecker';
import { ParamsChecker } from '../validation-engine/checkers/ParamsChecker';




describe("mandatoryChecker",()=>{
    const checker = new MandatoryChecker();
   
 
 
 

    context("check()",()=>{
        //arrange
        const json_body={
            name:"James"
        }; 
        let param;  

        it("should throw error when json_body is undefined",()=>{
            //arrage
            //act 
            //assert
            let fn = ()=>{
                checker.check(undefined,param);
            }
 
            expect(fn).to.throw('json_object is undefined');
        });
        it("should throw error when param is undefined",()=>{
            //arrage
            //act 
            //assert
            let fn = ()=>{
                checker.check(json_body,undefined);
            }
 
            expect(fn).to.throw('param is undefined');
        });
        it("Should return false when mandatory field not available",()=>{
           param = {
                mandatory:true,
                name:"notavail"
            };
            //act 
            let ret = checker.check(json_body,param); 
 
            //assert
            expect(ret).to.be.false;
        });

        it("Should return true when mandatory field available",()=>{
           param = {
                mandatory:true,
                name:"name"
            };
            //act 
            let ret = checker.check(json_body,param); 
 
            //assert
            expect(ret).to.be.true;
        });
        it("Should return true when param.mandatory not defined",()=>{
            param = { 
                 name:"name"
             };
             //act 
             //act 
            let ret = checker.check(json_body,param); 
 
            //assert
            expect(ret).to.be.true;
         });
    });
    context("error()",()=>{
        it("should return error text",()=>{
            let param = {
                name:"first_name"
            };
            let err = checker.error(param); 
  
            //assert
            expect(err).to.equal("first_name is a mandatory field.");
        });
    });

});



describe("availabilityChecker",()=>{
    const checker = new AvailabilityChecker();
   
 
 
 

    context("check()",()=>{
        //arrange
        const json_body={
            name:"James"
        }; 
        let param;  

        it("should throw error when json_body is undefined",()=>{
            //arrage
            //act 
            //assert
            let fn = ()=>{
                checker.check(undefined,param);
            }
 
            expect(fn).to.throw('json_object is undefined');
        });
        it("should throw error when param is undefined",()=>{
            //arrage
            //act 
            //assert
            let fn = ()=>{
                checker.check(json_body,undefined);
            }
 
            expect(fn).to.throw('param is undefined');
        });
 
        it("Should return false when field is empty",()=>{
            param = {
                 mandatory:true,
                 name:""
             };
             //act 
             let ret = checker.check(json_body,param); 
  
             //assert
             expect(ret).to.be.false;
         });
        it("Should return true when field is available",()=>{
           param = {
                mandatory:true,
                name:"name"
            };
            //act 
            let ret = checker.check(json_body,param); 
 
            //assert
            expect(ret).to.be.true;
        });
        it("Should return false when field is not available",()=>{
            param = {
                 mandatory:true,
                 name:"unavailable_name"
             };
             //act 
             let ret = checker.check(json_body,param); 
  
             //assert
             expect(ret).to.be.false;
         });
    });
    context("error()",()=>{
        it("should return error text",()=>{
            let param = {
                name:"first_name"
            };
            let err = checker.error(param); 
  
            //assert
            expect(err).to.equal("first_name is not available.");
        });
        it("should return error text",()=>{
            let param = {
                name:""
            };
            let err = checker.error(param); 
  
            //assert
            expect(err).to.equal(" is not available.");
        });
    });

});



describe("regexChecker",()=>{
    const checker = new RegexChecker();
   
 
 
 

    context("check()",()=>{
        //arrange
        let json_body={
            name:"James"
        };  

        it("should throw error when json_body is undefined",()=>{
            //arrage
            //act 
            //assert
            const param={
                name:"name"
            }
            let fn = ()=>{
                checker.check(undefined,param);
            }
 
            expect(fn).to.throw('json_object is undefined');
        });
        it("should throw error when param is undefined",()=>{
            //arrage
            //act 
            //assert
            let fn = ()=>{
                checker.check(json_body,undefined);
            }
 
            expect(fn).to.throw('param is undefined');
        });
        it("should return true when param.regex is undefined",()=>{
            //arrage
            const param = {
                name:"name",
                mandatory:true
            }
            //act 
            //assert
            //act 
            let ret = checker.check(json_body,param); 
 
            //assert
            expect(ret).to.be.true;
        });

        it("Should return true when regular expression is valid",()=>{
           const param = {
                mandatory:true,
                name:"country",
                regex:/((U|u)nited (S|s)tates)|((C|c)anada)/
            };

            const body = {
                name:"JAmes",
                country:"Canada"
            };  
            //act 
            let ret = checker.check(body,param); 
 
            //assert
            expect(ret).to.be.true;
        });
        it("Should return false when regular expression is invalid",()=>{
            const param = {
                mandatory:true,
                name:"country",
                regex:/((U|u)nited (S|s)tates)|((C|c)anada)/
            };

            const body = {
                name:"JAmes",
                country:"Denmark"
            };  
             //act 
             let ret = checker.check(body,param); 
  
             //assert
             expect(ret).to.be.false;
         });
    });
    context("error()",()=>{
        it("should return error text",()=>{
            const param = {
                name:"first_name"
            };
            let err = checker.error(param); 
  
            //assert
            expect(err).to.equal("first_name is invalid.");
        });
    });

});

describe('paramsChecker',()=>{

    const checker = new ParamsChecker();
    context('check()',()=>{

        it("Should return true when params is not null and is set to OBJECT",()=>{
            let param = {
                mandatory:true,
                name:"friends",
                type:"OBJECT",
                params:[]
            };

            const body = {
                name:"JAmes",
                friends:{
                    name:"jonny"
                }
            };  
             //act 
             let ret = checker.check(body,param); 
  
             //assert
             expect(ret).to.be.true;


             //arrange
             param.type=undefined;
             //act 
             ret = checker.check(body,param);
             //assert
             expect(ret).to.be.true; 
        });
        it("Should return false when params is not null and is not set to OBJECT",()=>{ 
            //arrange
            let param = {
                mandatory:true,
                name:"name",
                type:"STRING",
                params:[
                    {
                        mandatory:true,
                        name:"name"
                    }
                ]
            };

            const body = {
                name:"James",
                friends:{
                    name:"jonny"
                },
                date_of_birth:"1/1/1980",
                age:42,
                phone:"+18883893300",
                cars:["lambo","ford"]
            };  
             //act 
             let ret = checker.check(body,param); 
  
             //assert
             expect(ret,"param is defined but type is set to STRING").to.be.false;

             //arrange
             param.type="PHONE";
             param.name = "phone"; 
             //act 
             ret = checker.check(body,param);  
             //assert
             expect(ret,"param is defined but type is set to PHONE").to.be.false;


            //arrange
            param.type="ARRAY";
            param.name = "cars"; 
            //act 
            ret = checker.check(body,param);  
            //assert
            expect(ret,"param is defined but type is set to ARRAY").to.be.false;


            //arrange
            param.type="DATE";
            param.name = "date_of_birth"; 
            //act 
            ret = checker.check(body,param);  
            //assert
            expect(ret,"param is defined but type is set to DATE").to.be.false;


            //arrange
            param.type="NUMBER";
            param.name = "age"; 
            //act 
            ret = checker.check(body,param);  
            //assert
            expect(ret,"param is defined but type is set to NUMBER").to.be.false;


        });
        it("Should return true when params is null",()=>{ 
            //arrange
            let param = {
                mandatory:true,
                name:"name",
                type:"STRING" 
            };

            const body = {
                name:"James",
                friends:{
                    name:"jonny"
                },
                date_of_birth:"1/1/1980",
                age:42,
                phone:"+18883893300",
                cars:["lambo","ford"]
            };  
             //act 
             let ret = checker.check(body,param); 
  
             //assert
             expect(ret,"param is not defined. it should disregard type and return true").to.be.true;

        });

    });
    context("error()",()=>{
        it("should return error text",()=>{
            let param = {
                name:"first_name",
                type:"NUMBER"
            };
            let err = checker.error(param); 
  
            //assert
            expect(err).to.equal("first_name is set to NUMBER but has validator for nested object. Make sure that type is set to OBJECT.");


            param.type=undefined;
            err = checker.error(param); 
            expect(err).to.equal("first_name is set to undefined but has validator for nested object. Make sure that type is set to OBJECT.");
        });
    });
});

describe("typeChecker",()=>{
    const checker = new TypeChecker();
   
 
 
 

    context("check()",()=>{
        //arrange
        let json_body={
            name:"James"
        };  

        it("should throw error when json_body is undefined",()=>{
            //arrage
            //act 
            //assert
            const param={
                name:"name"
            }
            let fn = ()=>{
                checker.check(undefined,param);
            }
 
            expect(fn).to.throw('json_object is undefined');
        });
        it("should throw error when param is undefined",()=>{
            //arrage
            //act 
            //assert
            let fn = ()=>{
                checker.check(json_body,undefined);
            }
 
            expect(fn).to.throw('param is undefined');
        });
        it("should return true when param.type is undefined",()=>{
            //arrage
            const param = {
                name:"name",
                mandatory:true
            }
            //act 
            //assert
            //act 
            let ret = checker.check(json_body,param); 
 
            //assert
            expect(ret).to.be.true;
        });


        /**
         * NUMBER 
         */
        it("Should return true when type is number and is set to NUMBER",()=>{
           const param = {
                mandatory:true,
                name:"age",
                type:"NUMBER"
            };

            const body = {
                name:"JAmes",
                country:"Canada",
                age:152
            };  
            //act 
            let ret = checker.check(body,param); 
 
            //assert
            expect(ret).to.be.true;
        });
        it("Should return true when type is a decimal number and is set to NUMBER",()=>{
            const param = {
                mandatory:true,
                name:"amount",
                type:"NUMBER"
            };

            const body = {
                name:"JAmes",
                amount:100.2
            };  
             //act 
             let ret = checker.check(body,param); 
  
             //assert
             expect(ret).to.be.true;
        });
        it("Should return false when typtruee is null number and is set to NUMBER",()=>{
            const param = {
                mandatory:true,
                name:"date",
                type:"NUMBER"
            };

            const body = {
                name:"JAmes",
                date:null
            };  
             //act 
             let ret = checker.check(body,param); 
  
             //assert
             expect(ret).to.be.false;
        });


         /**
         * OBJECT 
         */
        it("Should return true when type is an object and is set to OBJECT",()=>{
            const param = {
                 mandatory:true,
                 name:"card",
                 type:"OBJECT"
             };
 
             const body = {
                 name:"JAmes",
                 card:{
                     holder:""
                 },
                 age:152
             };  
             //act 
             let ret = checker.check(body,param); 
  
             //assert
             expect(ret).to.be.true;
         });
         it("Should return false when type is an array and is set to OBJECT",()=>{
             const param = {
                 mandatory:true,
                 name:"books",
                 type:"OBJECT"
             };
 
             const body = {
                 name:"JAmes",
                 books:[{}]
             };  
              //act 
              let ret = checker.check(body,param); 
   
              //assert
              expect(ret).to.be.false;
         });
         it("Should return false when type is a string and is set to OBJECT",()=>{
            const param = {
                mandatory:true,
                name:"books",
                type:"OBJECT"
            };

            const body = {
                name:"JAmes",
                books:"a jungle"
            };  
             //act 
             let ret = checker.check(body,param); 
  
             //assert
             expect(ret).to.be.false;
        });
         it("Should return true when type is null   and is set to OBJECT",()=>{
             const param = {
                 mandatory:true,
                 name:"date",
                 type:"OBJECT"
             };
 
             const body = {
                 name:"JAmes",
                 date:null
             };  
              //act 
              let ret = checker.check(body,param); 
   
              //assert
              expect(ret).to.be.true;
         });

         /**
         * PHONE 
         */
        it("Should return true when type is a phone number and is set to PHONE",()=>{
            const param = {
                 mandatory:true,
                 name:"phone",
                 type:"PHONE"
             };
 
             let body = {
                 name:"JAmes", 
                 phone:'+14164837744'
             };  
            //act 
            let ret = checker.check(body,param); 
  
             //assert
             expect(ret,'usa/canada').to.be.true;


            body = {
                name:"JAmes", 
                phone:'+4402032500145'
            };  
            //act 
            ret = checker.check(body,param); 

            //assert
            expect(ret,"uk").to.be.true;


            body = {
                name:"JAmes", 
                phone:'+989128839009'
            };  
            //act 
            ret = checker.check(body,param); 

            //assert 
            expect(ret,'Iran').to.be.true;
         });
 

         it("Should return true when type is an invalid phone number and is set to PHONE",()=>{
            const param = {
                 mandatory:true,
                 name:"phone",
                 type:"PHONE"
             };
 
             let body = {
                 name:"JAmes", 
                 phone:'4164837744'
             };  
            //act 
            let ret = checker.check(body,param); 
  
             //assert
             expect(ret,'no + sign').to.be.false;


            body = {
                name:"JAmes", 
                phone:'+44 (0)203 250 0145'
            };  
            //act 
            ret = checker.check(body,param); 

            //assert
            expect(ret,"with plus sign but with spaces and brackets").to.be.false;


            body = {
                name:"JAmes", 
                phone:'(416) 238-2393'
            };  
            //act 
            ret = checker.check(body,param); 

            //assert 
            expect(ret,'no plus sign with brackets').to.be.false;


            body = {
                name:"JAmes", 
                phone:'4162382393'
            };  
            //act 
            ret = checker.check(body,param); 

            //assert 
            expect(ret,'no plus sign and no country code').to.be.false;
         });
 
    });
    context("error()",()=>{
        it("should return error text",()=>{
            const param = {
                name:"first_name",
                type:"NUMBER"
            };
            let err = checker.error(param); 
  
            //assert
            expect(err).to.equal("first_name has an invalid type.");
        });
    });

});

