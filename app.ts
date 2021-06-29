import { run } from "./index";
import { STRING,NUMBER, CREDIT_CARD } from "./validation-engine/paramType";


const validatit = run(
    {
        name:"nam",
        age:13,
        from:100,
        school:{
            name:'Max Junior',
            grade:11 
        },
        to:new Date("1/1/2020") 
    },
    [
        {
            name:"name",
            required:true , 
            type:STRING
        },
        {
            name:"age",
            required:true , 
            type:NUMBER
        },
        {
            name:"to",
            required:true,
            type:"DATE"
        },
        {
            name:"card",
            required:true , 
            type:CREDIT_CARD
        },
        {
            name:"from",
            required:true,
            dynamicValidation:function(body){ 
                if(body.from< body.to){
                    return {success:true};
                }else
                    return {success:false,error_message:"from should be smaller than to"};
            },
            type:NUMBER 
        },
        {
             name:"school",
             required:true,
             params:[
                 {
                     name:"name",
                     required:true 
                 },
                 {
                     name:"grade",
                     required:true
                 },
                 {
                     name:"address",
                     required:true
                 }
             ]
        }
          
    ]
);

console.log(JSON.stringify( validatit ));
