

export interface paramError{
    name:string;
    error:ErrorInfo[];
}
export interface ErrorInfo{
    error_message:string;
    error_code?:string;
}