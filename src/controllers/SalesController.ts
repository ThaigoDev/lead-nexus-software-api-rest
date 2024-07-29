const Product = require("../models/ProductAndServiceModel.ts")
const { Leads } = require("../models/LeadModel.ts");
const Category = require("../models/CategoryMOdel.ts");
const { SignUp } = require("../models/SignupModelAndLoginModel.ts");
const Process = require("../models/ProcessModel.ts");
const Sales = require("../models/SalesModel.ts");
abstract class SalesController {
    public static async getSales(req: any, res: any) {
        try {
            if (req.session.user && req.session.user.office === "Administrador") {
                const SalesModel = new Sales(req.body);
                const allSales = await SalesModel.getAllSales();
                res.status(200).json(allSales);
            } else {
                res.status(401).json({
                    status: 'failed',
                    error: "Bad! You not have Permission!"
                })
            }
        } catch (e: any) {
            res.status(500).json({
                status: "failed", 
                message: "Internal server error", 
                error: e.message
            })
        }

    }
    public static async createSales(req: any, res: any) {
        try {
            const SalesModel = new Sales(req.body);
            await SalesModel.create();
            res.status(201).json({
                status: "success",
                message: "A new Sale has been Created!",
                sale: SalesModel.sale,
            })
        } catch (e: any) {
            res.status(500).json({
                status: "failed",
                message: "Internal server error",
                error: e.message
            })
        }

    }
    public static async deleteSales(req: any, res: any) {
        try {
            const SalesModel = new Sales(req.body);
            await SalesModel.delete(req.params.id);
            res.status(204).json({
                status: 'success',
                message: `A Sale was Deleted!: ID: ${req.params.id}`
            })
        } catch (e: any) {
            res.status(500).json({
                status: "failed",
                message: "Internal server error",
                error: e.message
            })
        }

    }

    public static async editSales(req: any, res: any) {
        try {
            const SalesModel = new Sales(req.body);
            await SalesModel.edit(req.params.id);
            res.status(201).json({
                status: 'success',
                message: `A Sale of your base has been Edited! ID:${req.params.id}`,
                sale: SalesModel.sale,
            })
        } catch (e: any) {
            res.status(500).json({
                status: "failed",
                message: "Internal server error",
                error: e.message
            })
        }

    }
}
module.exports = SalesController;


