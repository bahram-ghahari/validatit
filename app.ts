import { run } from "./index";
import { STRING,NUMBER, CREDIT_CARD } from "./validation-engine/paramType";


const validatit = run(
    {
        name:"nam",
        age:13,
        from:100,
        to:new Date("1/1/2020") 
    },
    [
        {
            name:"name",
            mandatory:true , 
            type:STRING
        },
        {
            name:"age",
            mandatory:true , 
            type:NUMBER
        },
        {
            name:"to",
            mandatory:true,
            type:"DATE"
        },
        {
            name:"card",
            mandatory:true , 
            type:CREDIT_CARD
        },
        {
            name:"from",
            mandatory:true,
            dynamicValidation:function(body){ 
                if(body.from< body.to){
                    return {success:true};
                }else
                    return {success:false,error_message:"from should be smaller than to"};
            },
            type:NUMBER
        }
    ]
);

console.log(JSON.stringify( validatit ));
