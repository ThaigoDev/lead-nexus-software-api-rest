const { SignUp } = require("../models/SignupModelAndLoginModel.ts");

abstract class AllUsersController {
  public static async getAllUsers(req: any, res: any) {
    try {
      if (req.session.user && req.session.user.office === "Administrador") {
        const signup = new SignUp(req.body);
        const allUsers = await signup.getAllUsers();
        res.status(200).json(allUsers);
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
  public static async editUserPermission(req: any, res: any) {
    try {
      if (!req.session.user) {
        res.status(401).json({
          status: "failed",
          error: "Bad! You not have Permission!",
        });
      } else {
        const signup = new SignUp(req.body);
        await signup.editPermissionsOfUser(req.params.id);
        if (signup.errors.length > 0) {
          res.status(401).json({
            status: "failed",
            error: signup.errors,
          });
        } else {
          res.status(201).json({
            status: "success",
            message: `A User has been Edited ! ID: ${req.params.id} `,
            user: req.body,
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

  public static async deleteUser(req: any, res: any) {
    try {
      if (!req.session.user) {
        res.status(401).json({
          status: "failed",
          error: "Bad! You not have Permission!",
        });
      } else {
        const signup = new SignUp(req.body);
        await signup.deleteUser(req.params.id);
        res.status(201).json({
          status: "success",
          message: `A User has been Deleted ! ID: ${req.params.id} `,
          user: req.body,
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

module.exports = AllUsersController;
