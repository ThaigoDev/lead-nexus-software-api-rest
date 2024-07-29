const Product = require("../models/ProductAndServiceModel.ts");
const Category = require("../models/CategoryMOdel.ts");
const { SignUp } = require("../models/SignupModelAndLoginModel.ts");
const Process = require("../models/ProcessModel.ts");

abstract class ProductsController {
  public static async getAllProducts(req: any, res: any): Promise<any> {
    try {
      if (req.session.user) {
        const productModel = new Product(req.body);
        const allProducts = await productModel.getProducts();
        res.status(201).json(allProducts);
      } else {
        res.status(401).json({
          status: "failed",
          error: "Bad! You not have Permission!",
        });
      }
    } catch (e: any) {
      res.status(500).json({
        status: "failed",
        message: "Internal server error",
        error: e.message,
      });
    }
  }
  public static async createProduct(req: any, res: any): Promise<any> {
    try {
      if (!req.session.user) {
        res.status(401).json({
          status: "failed",
          error: "Bad! You not have Permission!",
        });
      } else {
        let body: object = {};
        if (!req.file) {
          body = { ...req.body };
        } else {
          body = { ...req.body, productPhoto: req.file.filename };
        }
        const productModel = new Product(body);
        await productModel.create();
        if (productModel.errors.length > 0) {
          res.status(400).json({
            status: "failed",
            message: productModel.errors,
            in: req.body,
          });
        } else {
          res.status(201).json({
            status: "success",
            message: "A new Product has been Created!",
            product: productModel.product,
          });
        }
      }
    } catch (e: any) {
      res.status(500).json({
        status: "failed",
        message: "Internal server error",
        error: e.message,
      });
    }
  }
  public static async editProduct(req: any, res: any): Promise<any> {
    try {
      if (!req.session.user) {
        res.status(401).json({
          status: "failed",
          error: "Bad! You not have Permission!",
        });
      } else {
        let body = {};
        if (!req.file) {
          body = { ...req.body };
        } else {
          body = { ...req.body, productPhoto: req.file.filename };
        }
        const productModel = new Product(body);
        await productModel.getPorductByIdAndUpate(req.params.id);
        if (productModel.errors.length > 0) {
          res.status(400).json({
            status: "failed",
            message: productModel.errors,
            in: req.body,
          });
        } else {
          res.status(201).json({
            status: "success",
            message: `A Product has been Edited! ID: ${req.params.id} `,
            product: productModel.product,
          });
        }
      }
    } catch (e: any) {
      res.status(500).json({
        status: "failed",
        message: "Internal server error",
        error: e.message,
      });
    }
  }
  public static async deleteProduct(req: any, res: any): Promise<any> {
    try {
      if (!req.session.user) {
        res.status(401).json({
          status: "failed",
          error: "Bad! You not have Permission!",
        });
      } else {
        const productModel = new Product(req.body);
        await productModel.getProductByIdAndDelete(req.params.id);
        res.status(201).json({
          status: "success",
          message: `A Product has been Deleted! ID: ${req.params.id} `,
          product: productModel.product,
        });
      }
    } catch (e: any) {
      res.status(500).json({
        status: "failed",
        message: "Internal server error",
        error: e.message,
      });
    }
  }
}

module.exports = ProductsController;
