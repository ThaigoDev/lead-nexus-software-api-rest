exports.globalMiddleware = (req:any,res:any,next:any) =>{ 
     res.locals.erros = req.flash("erros");
     res.locals.sucess = req.flash("sucess");  
     res.locals.user = req.session.user; 
    next();  
    
} 
 /* 
 xports.checkCsrfError = (err,req, res,next) =>{
    if(err && err.code === 'EBADCSRFTOKEN') {
        return res.send("BAD CSRF")

    }
    
} 
exports.csrfMiddleware= (req,res,next) =>{
    res.locals.csrf = req.csrfToken(); 
    next(); 
}  */