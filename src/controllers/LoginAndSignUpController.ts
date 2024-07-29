const { Leads } = require("../models/LeadModel.ts");
const { SignUp } = require("../models/SignupModelAndLoginModel.ts");

 abstract class LoginAndSignUpController { 
   public static async createAccount(req:any, res:any):Promise<any> {   
    try{
      req.body.office = "Colaborador";
      const singUp = new SignUp(req.body);
      await singUp.register();
      if (singUp.errors.length > 0) {
         res.status(400).json({
            errors:singUp.errors
         })
         
      } else {
           res.status(201).json({
            status:"success",  
            message: "A new Account has been Created!",
            user:req.session.user
           })
     } 
    }catch(e:any) {  
      res.status(500).json({
         status: "failed", 
         message: "Internal server error", 
         error: e.message
       }
      )
    }
    
   } 
    public static  async login (req:any, res:any) :Promise<any> { 
      try { 
          if(req.session.user) {
            res.status(200).json({
               status:"success", 
               user:req.session.user
            })
          }
         const singup = new SignUp(req.body);
         await singup.login();
         if (singup.errors.length > 0) {
            res.json({
               errors: singup.errors
            })
        } else {
            req.session.user = singup.user;  
             return res.json({
               status: "sucess", 
               profile: req.session.user, 
             })
         }
       }catch(e:any) {
         res.status(500).json({
            status: "failed", 
            message: "Internal server error", 
            error: e.message
          }
         )
      }
   }
}

module.exports = LoginAndSignUpController; 

