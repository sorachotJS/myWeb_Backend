const createError = require("http-errors");
const db = require("../Services/db");

module.exports = {
    getTag : async () => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT id, category_name, category_type, status
                FROM t_category`,
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
    insertTag : async (category_name,category_type,status) => {
        return new Promise((resolve, reject) => {
            if (!category_name || !category_type) {
                reject(createError.BadRequest("category_name and category_type are required."));
                return;
            }
        
            db.query(
                `
                INSERT INTO t_category (category_name,category_type,status) 
                VALUES ($1, $2, $3)
                RETURNING *; -- This line returns the inserted data
                `,
                [category_name,category_type,status],
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
    },
    updateTag : async (id,category_name,category_type,status) => {
        return new Promise((resolve, reject) => {
            if (!id || !category_name || !category_type) {
                reject(createError.BadRequest("id,category_name and category_type are required."));
                return;
            }
        
            db.query(
                `
                UPDATE t_category SET category_name = $2, category_type = $3, status = $4
                WHERE id = $1
                RETURNING *; -- This line returns the inserted data
                `,
                [id,category_name,category_type,status],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.rows.length === 0) {
                            reject(createError.NotFound("Update operation failed."));
                        } else {
                            resolve(result.rows[0]);
                            console.log(result.rows[0]) // Return the inserted data
                        }
                    }
                }
            );
        });
    },
    deleteTag : async (id) => {
        return new Promise((resolve, reject) => {
            if (!id) {
                reject(createError.BadRequest("id is required."));
                return;
            }
        
            db.query(
                `
                DELETE FROM t_category 
                WHERE id = $1
                RETURNING *; -- This line returns the inserted data
                `,
                [id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.rows.length === 0) {
                            reject(createError.NotFound("Delete operation failed."));
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