// const  asynHandler=() =>{

// }

export {asyncHandler}
const  asyncHandler=(fn) =>{(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).reject((error)=>next(err))
}
}
