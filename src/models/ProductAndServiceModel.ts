const mongoose = require('mongoose');

const ProductAndServiceSchema = mongoose.Schema({

  name: { type: String, required: true }, 
  productPhoto:{type:String,required:false}, 
  category: { type: String, required: true },
  sku: { type: String, required: false },
  price: { type: String, required: true },
  brand: { type: String, required: false },
  description: { type: String, required: true },
  date: { type: String, required: true },

});
const ProductAndServiceModel = mongoose.model("ProductAndServiceModel", ProductAndServiceSchema);
class Product { 
  private body:any ;
  public errors: Array<any> 
  private product:any;
  constructor(body:any) {
    this.body = body;
    this.errors = [];
    this.product = null;
  }
  async create() : Promise<any>{
    try {
      this.product = await ProductAndServiceModel.create(this.body);
    } catch (e:any) {
      throw new Error(e);
    }
  }
  async getProducts() : Promise<any>{
    try {
      const products = await ProductAndServiceModel.find();
      return products;

    } catch (e:any) {
      throw new Error(e);
    }
  }
  async getProductById(id:string) :  Promise<any> {
    try {
      const product = await ProductAndServiceModel.findById(id);
      return product;
    } catch (e:any) {
      throw new Error(e);
    }

  }
  async getPorductByIdAndUpate(id:string) : Promise<any>{
    try {
      this.product = await ProductAndServiceModel.findByIdAndUpdate(id, this.body);
    } catch (e:any) {
      throw new Error(e);
    }
  }
  async getProductByIdAndDelete(id:string) : Promise<any> {
    try {
      this.product = await ProductAndServiceModel.findByIdAndDelete({ _id: id });
    } catch (e:any) {
      throw new Error(e);
    }
  }
}
module.exports = Product;