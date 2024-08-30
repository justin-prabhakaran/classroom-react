export default interface Usecase<ReturnType,Params>{
    execute( params : Params) : ReturnType;
}