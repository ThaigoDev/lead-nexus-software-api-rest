const { Leads } = require("../models/LeadModel.ts");
const Product = require("../models/ProductAndServiceModel.ts");

abstract class HomeController {
  public static async getAllLeads(req: any, res: any) {
    try {
      if (req.session.user) {
        const leads = new Leads(req.body, req.session.user);
        const allLeads = await leads.getLeads();
        res.status(201).json(allLeads);
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
  public static async create(req: any, res: any) {
    try {
      let body = {};

      if (!req.file) {
        body = { ...req.body };
      } else {
        body = { ...req.body, photoLead: req.file.filename };
      }
      const leads = new Leads(body, req.session.user);
      await leads.createLead();
      if (leads.errors.length > 0) {
        res.status(400).json({
          title: "Dados enviados incorretamente!",
          erros: leads.errors.length,
          status: "failed",
        });
      } else {
        res.status(200).json({
          title: "Cadastro criado com Sucesso!",
          status: "success",
          lead: leads.lead,
        });
      }
    } catch (e: any) {
      res.status(500).json({
        title: "Houve um erro no Servidor!",
        status: "failed",
        error: e.message,
      });
    }
  }
  public static async deleteLead(req: any, res: any) {
    try {
      const leads = new Leads(req.body, req.session.user);
      const deleted = await leads.deleteLead(req.params.id);
      req.session.save(() => {
        res.status(201).json({
          status: "success",
          message: `Lead deletada com sucesso! Id:${req.params.id} `,
          deleted: deleted,
        });
      });
    } catch (e: any) {
      res.status(500).json({
        status: "failed",
        message: "Internal server error",
        error: e.message,
      });
    }
  }
  public static async upate(req: any, res: any) {
    try {
      let body = {};
      if (!req.file) {
        body = { ...req.body };
      } else {
        body = { ...req.body, photoLead: req.file.filename };
      }
      const leads = new Leads(body, req.session.user);
      await leads.edit(req.params.id);
      res.status(201).json({
        status: "success",
        message: `Está Lead foi Editada! ID: ${req.params.id}`,
        lead: leads.lead,
      });
    } catch (e: any) {
      res.status(500).json({
        status: "failed",
        message: "Internal server error",
        error: e.message,
      });
    }
  }
  public static async logout(req: any, res: any) {
    req.session.destroy();
    res.redirect("/");
  }
  public static async indexTest(req: any, res: any) {
    const productModel = new Product(req.body);
    const allProducts = await productModel.getProducts();
    res.json(allProducts);
  }
}

module.exports = HomeController;
