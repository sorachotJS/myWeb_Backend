const createError = require("http-errors");
const db = require("../Services/db");

module.exports = {
    getUser: async () => {
        return new Promise((resolve, reject) => {
          db.query(
            `
            SELECT user_id, user_name, user_position, user_fullname, user_profession, user_email
                FROM user_table 
                    `,
            (err, rows) => {
              if (err) {
                reject(createError.InternalServerError());
              } else {
                resolve(rows);
              }
            }
          );
        });
      },
      insertUser: async (user_name,user_password,user_position,user_fullname,user_profession,user_email,user_loginstatus) => {
        return new Promise((resolve, reject) => {
            if (!user_name || !user_email) {
              reject(createError.BadRequest("user_name and user_email are required."));
              return;
            }
        
            db.query(
              `
              INSERT INTO user_table (user_name,user_password, user_position, user_fullname, user_profession, user_email,user_loginstatus) 
              VALUES ($1, $2, $3, $4, $5,$6,$7)
              RETURNING *; -- This line returns the inserted data
              `,
              [user_name,user_password, user_position, user_fullname, user_profession, user_email,user_loginstatus],
              (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  if (result.rows.length === 0) {
                    reject(createError.NotFound("Insert operation failed."));
                  } else {
                    resolve(result.rows[0]);
                    console.log(result.rows[0]) // Return the inserted data
                  }
                }
              }
            );
          });
      }
}