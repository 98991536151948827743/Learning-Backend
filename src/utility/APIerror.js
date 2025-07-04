class apiErorr extends Error {
    constructor(
        statusCode,
        massage='Something went wrong',
        error =[],
        stack=""

    ){
        super(massage)
        this.statusCode= statusCode
        this.data =null
        this.massage=massage
        this.error=this.error
        this.success=false

        if(stack){
            this.stack= stack
        } else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {apiErorr}