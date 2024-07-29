const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: { type: String, required: true },
})

const CategoryModel = mongoose.model("CategoryModel", CategorySchema);

class Category { 
    private body: any; 
    public errors: Array<string>; 
    private category : any; 
    constructor(body:any) {
        this.body = body;
        this.errors = [];
        this.category = null;
    }
    async create(): Promise<any> {
        try {
            this.category = await CategoryModel.create(this.body);
        } catch (e:any) {
            throw new Error(e);
        }
    } 
    async delete(id:any):  Promise<any> {
        try {
            this.category = await CategoryModel.findByIdAndDelete({_id: id});

        }catch(e:any){
            throw new Error(e); 
        }
    }
    async getAllCategory() :  Promise<any> {
        try {
            const categories = await CategoryModel.find();
            return categories;
        } catch (e: any) {
            throw new Error(e);
        }
    }
    
}
module.exports = Category; 