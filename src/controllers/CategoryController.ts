const Category = require("../models/CategoryMOdel.ts");

abstract class CategoryController {
   public static async getAllCategory(req: any, res: any) {
      try {
         if (!req.session.user) {
            res.status(401).json({
               status: 'failed',
               error: "Bad! You not have Permission!"
            })
         } else {
            const category = new Category(req.body);
            const categories = await category.getAllCategory();
            res.status(200).json(categories);
         }
      } catch (e: any) {
         res.status(500).json({
            status: "failed",
            message: "Internal server error",
            error: e.message
         })
      }

   }

   public static async createCategory(req: any, res: any) {
      try {
         if (!req.session.user) {
            res.status(401).json({
               status: 'failed',
               error: "Bad! You not have Permission!"
            })
         } else {
            const category = new Category(req.body);
            await category.create();
            res.status(201).json({
               status: "success",
               message: "A new Category has been Created!",
               process: category.name,
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
   public static async deleteCategory(req: any, res: any) {
      try {
         if (!req.session.user) {
            res.status(401).json({
               status: 'failed',
               error: "Bad! You not have Permission!"
            })
         } else {
            const category = new Category(req.body);
            await category.delete(req.params.id);
            res.status(201).json({
               status: "success",
               message: `A Category has been Deleted! ID:${req.params.id}`,
               category: category.name,
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
}
module.exports = CategoryController;
