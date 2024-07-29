const { SignUp } = require("../models/SignupModelAndLoginModel.ts");

abstract class SettingsController {
  public static async updateProfile(req: any, res: any) {
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
          body = { ...req.body, userPhoto: req.file.filename };
        }
        const profile = new SignUp(body);
        const profileUpdated = await profile.updateProfile(req.params.id);
        req.session.user = profileUpdated;
        res.status(201).json({
          status: "success",
          message: "A new Sale has been Created!",
          user: req.session.user,
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
module.exports = SettingsController;
