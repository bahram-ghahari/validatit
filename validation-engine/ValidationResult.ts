import { paramError } from "./paramError";


export class ValidationResult{
    
    constructor(){
        this.success=true;
        this.error=[];
    }
    private success : boolean;
    public get Success() : boolean {
        return this.success;
    }
    public set Success(v : boolean) {
        this.success = v;
    }


    
    private error : paramError[];
    public get Params() : paramError[] {
        return this.error;
    }
    public set Params(v : paramError[]) {
        this.error = v;
    }
    
    
}