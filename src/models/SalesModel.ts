const mongoose = require("mongoose");


const SalesSchema = mongoose.Schema({
    client: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: true },
    productCategory: { type: String, required: true },
    productOurService: { type: String, required: true },
    price: { type: String, required: true },
    descount: { type: String, required: true },
    subtotal: { type: String, required: true },
    code: { type: String, required: true },
    payment: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
    saller: { type: String, required: true },

})

const SalesModel = mongoose.model("SalesModel", SalesSchema);
class Sales { 
    private body: any; 
    public erros: Array<any>  
    private sale : any; 
    constructor(body:any) {
        this.body = body;
        this.erros = [];
        this.sale = null;
    }
    async create() : Promise<any>{
        try {
            this.sale = SalesModel.create(this.body);
        } catch (e:any) {
            throw new Error(e)
        }
    }
    async getAllSales() : Promise<any> {
        try {
            const sales = await SalesModel.find();
            return sales;
        } catch (e:any) {
            throw new Error(e);
        }

    }
    async delete(id:string) : Promise<any>{
        try {
            this.sale = await SalesModel.findByIdAndDelete({ _id: id });
        } catch (e:any) {

            throw new Error(e);
        }
    }
    async edit(id:string) : Promise<any>{
        try {
            this.sale = await SalesModel.findByIdAndUpdate({ _id: id }, this.body);
        } catch (e:any) {
            throw new Error(e);
        }
    }
    async getAllSalesValue()  : Promise<any>{
        try {
            const sales = await SalesModel.find();
            const values = sales.filter((sale: any) => { if (sale.status === "Concluída") return sale.subtotal });
            console.log(values)
            let convertedValues = values.map((val:any) =>  parseFloat(val.subtotal)); 
            const total = convertedValues.reduce((totalValue:any, actual:any) => totalValue + actual, 0);
            return total;
        } catch (e:any) {
            throw new Error(e);
        }

    }
    async getAllSalesFinished(): Promise<any> {
    const sales = await SalesModel.find({status: "Concluída"});  
    return sales.length; 
        
    }
}
module.exports = Sales; 