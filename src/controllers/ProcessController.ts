const Process = require("../models/ProcessModel.ts");
abstract class ProcessController {  
  
  public static async getAllProcess (req:any,res:any) : Promise<any> {
    try { 
      if(req.session.user) {
        const process = new Process(req.body);  
        res.status(201).json(process);
      }else  {
        res.status(401).json({
           status: 'failed',
           error: "Bad! You not have Permission!"
        })
      }
      
    }catch(e:any){
      res.status(500).json({
          status: "failed", 
          message: "Internal server error", 
          error: e.message
      })
    }

  } 
  public static  async createProcess (req:any, res:any) { 
    try { 
      if(req.session.user) {
        const process = new Process(req.body);
      await process.create();
      res.status(201).json({
        status: "success",
        message: "A new Process has been Created!",
        process: process.name,
      })
      }else  {
        res.status(401).json({
          status: 'failed',
          error: "Bad! You not have Permission!"
       })
      }
    }catch(e:any) {
      res.status(500).json({
        status: "failed", 
        message: "Internal server error", 
        error: e.message
    })
  }
  } 

public static async deleteProcess (req:any, res:any)  { 
  try {
    if(req.session.user) {
      const process = new Process(req.body);
      await process.delete(req.params.id);
      res.status(201).json({
        status: "success",
        message: `A  Process  has been Deleted ! ID: ${req.params.id}`,
        process: process.name,
      })
    }else  {
      res.status(401).json({
        status: 'failed',
        error: "Bad! You not have Permission!"
     })
    }
  }catch(e:any)  {
    res.status(500).json({
      status: "failed", 
      message: "Internal server error", 
      error: e.message
   })
  }

}
}
module.exports = ProcessController; 