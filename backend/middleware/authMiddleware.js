import jwt from 'jsonwebtoken'

export const verifyToken = (req , res ,next)=>{
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({msg:"No Token , Authorization Denied"});

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
       
        req.user= decoded
        next();
    }catch(err){
        res.status(401).json({msg:"Invalid Token"})
    }
}



