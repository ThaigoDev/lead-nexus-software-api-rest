const mongoose = require('mongoose');

const ProcessSchema = mongoose.Schema({
    process: { type: String, required: true },

})

const ProcessModel = mongoose.model('ProcessModel', ProcessSchema);
class Process { 
    private body : any; 
    private errors: Array<string>; 
    private process: any; 
    constructor(body:any) {
        this.body = body;
        this.errors = [];
        this.process = null;
    }
    async create(): Promise<any> {
        try {
            this.process = await ProcessModel.create(this.body);
        } catch (e:any) {
            throw new Error(e);
        }
    }
    async getAllProcess():  Promise<any>{
        try {
            const allProcess = await ProcessModel.find();
            return allProcess;
        } catch (e:any) {
            throw new Error(e);
        }

    } 
    async delete(id:string) : Promise<any> {
        try {
         this.process = await ProcessModel.findByIdAndDelete({_id:id}); 
        }catch(e:any) {
            throw new Error(e); 
        }
    }
}
module.exports = Process; 
