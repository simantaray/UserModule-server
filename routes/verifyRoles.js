const verifyRoles=(req,res,next)=>{
    const roleHeader=req.headers.role
    if(roleHeader){
        if(roleHeader=="admin"){
            req.userRole= "admin"
            next();
        }else{
            return res.status(401).json("u are not admin")
        }
    }else{
        return res.status(401).json("u dont have any role")
    }
}

module.exports ={
    verifyRoles
}