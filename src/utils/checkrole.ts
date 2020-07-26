import { Request,Response, NextFunction} from "express";

function checkrole(req: Request,res: Response, next: NextFunction){
    if(req.user.username === "admin"){
        next();
    }else{
        res.redirect("/auth/login");
    }
}
export default checkrole;