const createError = require("http-errors");
const { getTag,insertTag,updateTag,deleteTag } = require("../Models/tag.Model");

module.exports = {
    getTagCon: async (req, res, next) => {
        try {
            const result = await getTag();
    
            if (result.length === 0) throw createError.NotFound("DATA NOT FOUND!");
      
            const data = ({
              id, category_name, category_type, status
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
    insertTagCon: async (req, res, next) => {
        try {
            const category_name = req.body.category_name;
            const category_type = req.body.category_type;
            const status = req.body.status;
    
            if (!category_name) throw createError.BadRequest();
            console.log(category_name);
      
            const result = await insertTag(category_name,category_type,status);
      
            if (result.length === 0) throw createError.NotFound("DATA NOT FOUND!");
      
            // const data = ({
            //   category_name,category_type,status
            // } = result["rows"]);
      
            // const dataResult = ({
            //   Data:data
            // });
      
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
    updateTagCon : async (req, res, next) => {
        try {
            const id = req.body.id;
            const category_name = req.body.category_name;
            const category_type = req.body.category_type;
            const status = req.body.status;
    
            if (!id || !category_name || !category_type) throw createError.BadRequest();
            console.log(id);
      
            const result = await updateTag(id,category_name,category_type,status);
      
            if (result.length === 0) throw createError.NotFound("DATA NOT FOUND!");
      
            // const data = ({
            //   category_name,category_type,status
            // } = result["rows"]);
      
            // const dataResult = ({
            //   Data:data
            // });
      
            res.send({
              status: 200,
              message: "update data success",
              data: result,
              // token: req.token,
            });
          } catch (error) {
            next(error);
          }
    },
    deleteTagCon : async (req, res, next) => {
        try {
            const id = req.body.id;
    
            if (!id) throw createError.BadRequest();
            console.log(id);
      
            const result = await deleteTag(id);
      
            if (result.length === 0) throw createError.NotFound("DATA NOT FOUND!");
      
          
      
            res.send({
              status: 200,
              message: "delete data success",
              data: result,
              // token: req.token,
            });
          } catch (error) {
            next(error);
          }
    }
    
}