const createError = require("http-errors");
const { login,updateLogoutStatus,updateLoginStatus } = require("../Models/auth.Model");
const {signAccessToken} = require("../Services/jwt_helper")

module.exports = {
    login: async (req, res, next) => {
        try {
          const user = req.body.user;
          const pass = req.body.pass;
          if (!user) throw createError.BadRequest();
    
          const result = await login(user,pass);
    
          if (result.length === 0) throw createError.NotFound("DATA NOT FOUND!");
    
          const data = ({
            user_id, user_name, user_position, user_fullname, user_profession, user_email
          } = result["rows"]);

          const idToken = ({
            id
          } = result["rows"]);
          console.log(data[0].user_id);

          await updateLoginStatus(data[0].user_id)
          // const {
          //   id, zone_name, province_name, agency_name, hospital_code, hospital_level, login_code, position_name, full_name, department, office_phone, phone, email, line_id, status
          // } = result;
    
          const token = await signAccessToken({
            idToken
          });
    
          const dataToken = ({
            token,
            Data:data
          });
    
          res.send({
            status: 200,
            message: "login success",
            user: dataToken,
            // token: req.token,
          });
        } catch (error) {
          next(error);
        }
      },
      logout: async (req, res, next) => {
        try {
          const id = parseInt(req.params.id);
          if (!id) throw createError.BadRequest();
    
          await updateLogoutStatus(id);
    
          res.send({ status: 204, message: "logout success" });
        } catch (error) {
          next(error);
        }
      },
}