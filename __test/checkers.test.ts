import {expect} from 'chai'; 
import { requiredChecker } from '../validation-engine/checkers/MandatoryChecker';
import { AvailabilityChecker } from '../validation-engine/checkers/AvailabilityChecker';
import { RegexChecker } from '../validation-engine/checkers/RegexChecker';
import { TypeChecker } from '../validation-engine/checkers/TypeChecker';
import { ParamsChecker } from '../validation-engine/checkers/ParamsChecker';
import { DynamicChecker } from '../validation-engine/checkers/DynamicChecker';

const expectThrowsAsync = async (method, errorMessage) => {
    let error = null
    try {
      await method()
    }
    catch (err) {
      error = err
    }
    expect(error).to.be.an('Error')
    if (errorMessage) {
      expect(error.message).to.equal(errorMessage)
    }
  }


describe("requiredChecker", async ()=>{
    const checker = new requiredChecker();
   
 
 
 

    context("check()", async ()=>{
        //arrange
        const json_body={
            name:"James"
        }; 
        let param;  

        it("should throw error when json_body is undefined", async ()=>{
            //arrage
            //act 
            //assert
            let fn = async()=>{
                await checker.check(undefined,param);
            }
 
            expectThrowsAsync(fn,'json_object is undefined');
        });
        it("should throw error when param is undefined", async ()=>{
            //arrage
            //act 
            //assert
            let fn = async()=>{
                await checker.check(json_body,undefined);
            }
 
            expectThrowsAsync(fn,'param is undefined');
        });
        it("Should return false when required field not available", async ()=>{
           param = { 
                name:"notavail"
            };
            //act 
            let ret = await checker.check(json_body,param); 
 
            //assert
            expect(ret).to.be.false;
        });

        it("Should return true when required field available", async ()=>{
           param = {
                required:true,
                name:"name"
            };
            //act 
            let ret = await checker.check(json_body,param); 
 
            //assert
            expect(ret).to.be.true;
        });
 

           
    });
    context("error()", async ()=>{
        it("should return error text", async ()=>{
            let param = {
                name:"first_name"
            };
            let err = checker.error(param , ''); 
  
            //assert
            expect(err).to.equal("first_name is a required field.");




            param["required_error_message"] = "$param.$value is outside of our covered area!";
            err = checker.error(param , 'England');  
            expect(err).to.equal("England is outside of our covered area!");





            param["required_error_message"] = "error!";
            err = checker.error(param , '');  
            expect(err).to.equal("error!");
        });
    });
});



describe("availabilityChecker", async ()=>{
    const checker = new AvailabilityChecker();
   
 
 
 

    context("check()", async ()=>{
        //arrange
        const json_body={
            name:"James"
        }; 
        let param;  

        it("should throw error when json_body is undefined", async ()=>{
            //arrage
            //act 
            //assert
            let fn = async()=>{
                await checker.check(undefined,param);
            }
            expectThrowsAsync(fn,'json_object is undefined'); 
        });
        it("should throw error when param is undefined", async ()=>{
            //arrage
            //act 
            //assert
            let fn = async ()=>{
                await checker.check(json_body,undefined);
            }
 
            expectThrowsAsync(fn,'param is undefined');
        });
 
        it("Should return false when field is empty", async ()=>{
            param = {
                 required:true,
                 name:""
             };
             //act 
             let fn = async ()=>{
                await checker.check(json_body,param);
            }
 
            expectThrowsAsync(fn,'name is undefined');
         });
        it("Should return true when field is available", async ()=>{
           param = {
                required:true,
                name:"name"
            };
            //act 
            let ret = await checker.check(json_body,param); 
 
            //assert
            expect(ret).to.be.true;
        });
        it("Should return false when field is not available", async ()=>{
            param = {
                 required:true,
                 name:"unavailable_name"
             };
             //act 
             let ret = await checker.check(json_body,param); 
  
             //assert
             expect(ret).to.be.false;
         });
    });
    context("error()", async ()=>{
        it("should return error text", async ()=>{
            let param = {
                name:"first_name"
            };
            let err = checker.error(param,''); 
  
            //assert
            expect(err).to.equal("first_name is not available.");
        });
        it("should return error text", async ()=>{
            let param = {
                name:""
            };
            let err = checker.error(param,''); 
  
            //assert
            expect(err).to.equal(" is not available.");
        });
    });

}); 

describe("regexChecker", async ()=>{
    const checker = new RegexChecker();
   
 
 
 

    context("check()", async ()=>{
        //arrange
        let json_body={
            name:"James"
        };  

        it("should throw error when json_body is undefined", async ()=>{
            //arrage
            //act 
            //assert
            const param={
                name:"name"
            }
            let fn = async()=>{
                await checker.check(undefined,param);
            }
 
            expectThrowsAsync(fn,'json_object is undefined');
        });
        it("should throw error when param is undefined", async ()=>{
            //arrage
            //act 
            //assert
            let fn = async()=>{
                await checker.check(json_body,undefined);
            }
 
            expectThrowsAsync(fn,'param is undefined');
        });
        it("should return true when param.regex is undefined", async ()=>{
            //arrage
            const param = {
                name:"name",
                required:true
            }
            //act 
            //assert
            //act 
            let ret = await checker.check(json_body,param); 
 
            //assert
            expect(ret).to.be.true;
        });

        it("Should return true when regular expression is valid", async ()=>{
           const param = {
                required:true,
                name:"country",
                pattern:/((U|u)nited (S|s)tates)|((C|c)anada)/
            };

            const body = {
                name:"JAmes",
                country:"Canada"
            };  
            //act 
            let ret = await checker.check(body,param); 
 
            //assert
            expect(ret).to.be.true;
        });
        it("Should return false when regular expression is invalid", async ()=>{
            const param = {
                required:true,
                name:"country",
                pattern:/((U|u)nited (S|s)tates)|((C|c)anada)/
            };

            const body = {
                name:"JAmes",
                country:"Denmark"
            };  
             //act 
             let ret = await checker.check(body,param); 
  
             //assert
             expect(ret).to.be.false;
         });
    });
    context("error()", async ()=>{
        it("should return error text", async ()=>{
            const param = {
                name:"first_name"
            };

            let err = checker.error(param,''); 
  
            //assert
            expect(err).to.equal("first_name is invalid.");

            param["pattern_error_message"]="error!!!";
            err = checker.error(param,'');  
            expect(err).to.equal("error!!!");

            param["pattern_error_message"] = "$param.$name no es válido o no se ha presentado."
            err = checker.error(param,'');  
            expect(err).to.equal("first_name no es válido o no se ha presentado.");


            param["pattern_error_message"] = "$param.$value no es válido o no se ha presentado."
            err = checker.error(param,'Mark');  
            expect(err).to.equal("Mark no es válido o no se ha presentado.");
 
        });
    });

});

describe('paramsChecker', async ()=>{

    const checker = new ParamsChecker();
    context('check()', async ()=>{

        it("Should return true when params is not null and is set to OBJECT", async ()=>{
            let param = {
                required:true,
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
             let ret = await checker.check(body,param); 
  
             //assert
             expect(ret).to.be.true;


             //arrange
             param.type=undefined;
             //act 
             ret = await checker.check(body,param);
             //assert
             expect(ret).to.be.true; 
        });
        it("Should return false when params is not null and is not set to OBJECT", async ()=>{ 
            //arrange
            let param = {
                required:true,
                name:"name",
                type:"STRING",
                params:[
                    {
                        required:true,
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
             let ret = await checker.check(body,param); 
  
             //assert
             expect(ret,"param is defined but type is set to STRING").to.be.false;

             //arrange
             param.type="PHONE";
             param.name = "phone"; 
             //act 
             ret = await checker.check(body,param);  
             //assert
             expect(ret,"param is defined but type is set to PHONE").to.be.false;


            //arrange
            param.type="ARRAY";
            param.name = "cars"; 
            //act 
            ret = await checker.check(body,param);  
            //assert
            expect(ret,"param is defined but type is set to ARRAY").to.be.false;


            //arrange
            param.type="DATE";
            param.name = "date_of_birth"; 
            //act 
            ret = await checker.check(body,param);  
            //assert
            expect(ret,"param is defined but type is set to DATE").to.be.false;


            //arrange
            param.type="NUMBER";
            param.name = "age"; 
            //act 
            ret = await checker.check(body,param);  
            //assert
            expect(ret,"param is defined but type is set to NUMBER").to.be.false;


        });
        it("Should return true when params is null", async ()=>{ 
            //arrange
            let param = {
                required:true,
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
             let ret = await checker.check(body,param); 
  
             //assert
             expect(ret,"param is not defined. it should disregard type and return true").to.be.true;

        });

    });
    context("error()", async ()=>{
        it("should return error text", async ()=>{
            let param = {
                name:"first_name",
                type:"NUMBER"
            };
            let err = checker.error(param,''); 
  
            //assert
            expect(err).to.equal("first_name is set to NUMBER but has validator for nested object. Make sure that type is set to OBJECT.");


            param.type=undefined;
            err = checker.error(param,''); 
            expect(err).to.equal("first_name is set to undefined but has validator for nested object. Make sure that type is set to OBJECT.");
        });
    });
});

describe("typeChecker", async ()=>{
    const checker = new TypeChecker();
   
 
 
 

    context("check()", async ()=>{
        //arrange
        let json_body={
            name:"James"
        };  

        it("should throw error when json_body is undefined", async ()=>{
            //arrage
            //act 
            //assert
            const param={
                name:"name"
            }
            let fn = async()=>{
                await checker.check(undefined,param);
            }
 
            expectThrowsAsync(fn,'json_object is undefined');
        });
        it("should throw error when param is undefined", async ()=>{
            //arrage
            //act 
            //assert
            let fn = async()=>{
                await checker.check(json_body,undefined);
            }
 
            expectThrowsAsync(fn,'param is undefined');
        });
        it("should return true when param.type is undefined", async ()=>{
            //arrage
            const param = {
                name:"name",
                required:true
            }
            //act 
            //assert
            //act 
            let ret = await checker.check(json_body,param); 
 
            //assert
            expect(ret).to.be.true;
        });


        /**
         * NUMBER 
         */
        it("Should return true when type is number and is set to NUMBER", async ()=>{
           const param = {
                required:true,
                name:"age",
                type:"NUMBER"
            };

            const body = {
                name:"JAmes",
                country:"Canada",
                age:152
            };  
            //act 
            let ret = await checker.check(body,param); 
 
            //assert
            expect(ret).to.be.true;
        });
        it("Should return true when type is a decimal number and is set to NUMBER", async ()=>{
            const param = {
                required:true,
                name:"amount",
                type:"NUMBER"
            };

            const body = {
                name:"JAmes",
                amount:100.2
            };  
             //act 
             let ret = await checker.check(body,param); 
  
             //assert
             expect(ret).to.be.true;
        });
        it("Should return false when typtruee is null number and is set to NUMBER", async ()=>{
            const param = {
                required:true,
                name:"date",
                type:"NUMBER"
            };

            const body = {
                name:"JAmes",
                date:null
            };  
             //act 
             let ret = await checker.check(body,param); 
  
             //assert
             expect(ret).to.be.false;
        });


         /**
         * OBJECT 
         */
        it("Should return true when type is an object and is set to OBJECT", async ()=>{
            const param = {
                 required:true,
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
             let ret = await checker.check(body,param); 
  
             //assert
             expect(ret).to.be.true;
         });
         it("Should return false when type is an array and is set to OBJECT", async ()=>{
             const param = {
                 required:true,
                 name:"books",
                 type:"OBJECT"
             };
 
             const body = {
                 name:"JAmes",
                 books:[{}]
             };  
              //act 
              let ret = await checker.check(body,param); 
   
              //assert
              expect(ret).to.be.false;
         });
         it("Should return false when type is a string and is set to OBJECT", async ()=>{
            const param = {
                required:true,
                name:"books",
                type:"OBJECT"
            };

            const body = {
                name:"JAmes",
                books:"a jungle"
            };  
             //act 
             let ret = await checker.check(body,param); 
  
             //assert
             expect(ret).to.be.false;
        });
         it("Should return true when type is null   and is set to OBJECT", async ()=>{
             const param = {
                 required:true,
                 name:"date",
                 type:"OBJECT"
             };
 
             const body = {
                 name:"JAmes",
                 date:null
             };  
              //act 
              let ret = await checker.check(body,param); 
   
              //assert
              expect(ret).to.be.true;
         });

         /**
         * PHONE 
         */
        it("Should return true when type is a phone number and is set to PHONE", async ()=>{
            const param = {
                 required:true,
                 name:"phone",
                 type:"PHONE"
             };
 
             let body = {
                 name:"JAmes", 
                 phone:'+14164837744'
             };  
            //act 
            let ret = await checker.check(body,param); 
  
             //assert
             expect(ret,'usa/canada').to.be.true;


            body = {
                name:"JAmes", 
                phone:'+4402032500145'
            };  
            //act 
            ret = await checker.check(body,param); 

            //assert
            expect(ret,"uk").to.be.true;


            body = {
                name:"JAmes", 
                phone:'+989128839009'
            };  
            //act 
            ret = await checker.check(body,param); 

            //assert 
            expect(ret,'Iran').to.be.true;
         });
 

         it("Should return true when type is an invalid phone number and is set to PHONE", async ()=>{
            const param = {
                 required:true,
                 name:"phone",
                 type:"PHONE"
             };
 
             let body = {
                 name:"JAmes", 
                 phone:'4164837744'
             };  
            //act 
            let ret = await checker.check(body,param); 
  
             //assert
             expect(ret,'no + sign').to.be.false;


            body = {
                name:"JAmes", 
                phone:'+44 (0)203 250 0145'
            };  
            //act 
            ret = await checker.check(body,param); 

            //assert
            expect(ret,"with plus sign but with spaces and brackets").to.be.false;


            body = {
                name:"JAmes", 
                phone:'(416) 238-2393'
            };  
            //act 
            ret = await checker.check(body,param); 

            //assert 
            expect(ret,'no plus sign with brackets').to.be.false;


            body = {
                name:"JAmes", 
                phone:'4162382393'
            };  
            //act 
            ret = await checker.check(body,param); 

            //assert 
            expect(ret,'no plus sign and no country code').to.be.false;
         });
 
    });
    context("error()", async ()=>{
        it("should return error text", async ()=>{
            const param = {
                name:"first_name",
                type:"NUMBER"
            };
            let err = checker.error(param,''); 
  
            //assert
            expect(err).to.equal("first_name has an invalid type.");
        });
    });

});


describe('dynamicChecker',()=>{
    const checker = new DynamicChecker();
    context('check()',()=>{
        it('Should return true after fetching data',async ()=>{
            
            let json ={
                handle:"bahram-ghahari",
                min_repos:5
            }
            let fn = async (body:any)=>{

                        const axios = require('axios').default;
                        const json = await axios.get(`https://api.github.com/users/${body.handle}`);  
                        let claimed_repos = +body.min_repos;
                        let public_repos = +json.data.public_repos;
                        let success = claimed_repos<public_repos;
                        
                        return {success };
                    };
            let params= {   
                    name:"repos",
                    dynamicValidation:fn
                } ;


            let res = await checker.check(json,params);
            expect(res).to.be.true;
        });
    });
});
 