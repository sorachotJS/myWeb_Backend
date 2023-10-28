const createError = require("http-errors");
const { getUser,insertUser } = require("../Models/user.Model");


module.exports = {
    getUserManage: async (req, res, next) => {
        try {
        //   if (!user) throw createError.BadRequest();
          const result = await getUser();
    
          if (result.length === 0) throw createError.NotFound("DATA NOT FOUND!");
    
          const data = ({
            user_id, user_name, user_position, user_fullname, user_profession, user_email
          } = result["rows"]);
    
          const dataResult = ({
            Data:data
          });
    
          res.send({
            status: 200,
            message: "get data success",
            data: dataResult,
            // token: req.token,
          });
        } catch (error) {
          next(error);
        }
      },
      insertUserManagement: async (req, res, next) => {
        try {
          const user_name = req.body.user_name;
          const user_password = req.body.user_password;
          const user_position = req.body.user_position;
          const user_fullname = req.body.user_fullname;
          const user_profession = req.body.user_profession;
          const user_email = req.body.user_email;
          const user_loginstatus = 0;

          if (!user_name) throw createError.BadRequest();
          console.log(user_name);
    
          const result = await insertUser(user_name,user_password,user_position,user_fullname,user_profession,user_email,user_loginstatus);
    
          if (result.length === 0) throw createError.NotFound("DATA NOT FOUND!");
    
       
    
          res.send({
            status: 200,
            message: "insert data success",
            data: result,
            // token: req.token,
          });
        } catch (error) {
          next(error);
        }
          
      },
}