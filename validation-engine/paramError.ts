

export class paramError{
    name:string;
    error:ErrorInfo[]=[];
}
export class ErrorInfo{
    error_message:string;
    error_code?:string;
}