const pool = require("../config/db");

const modelCheckUp = {
  insert: ({ id, created_by, created_at, updated_at, is_deleted, name, identity_number, address, complaint, phone_number, status }) => {
    return pool.query(
      `INSERT INTO patient
        ( 
          id, created_by, created_at, updated_at, is_deleted,
          name, identity_number, address, complaint, phone_number, status
        ) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [id, created_by, created_at, updated_at, is_deleted, name, identity_number, address, complaint, phone_number, status]
    );
  },

  select: ( search ) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * from patient`;
      if (search) {
        sql += ` where status = '${search}'`;
      }

      pool.query(sql, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },

  selectById: (id) => {
    return pool.query('select * from patient where id = $1', [id])
  },

  updateData: ({id, status, updated_at}) => {
    return pool.query(`UPDATE patient SET status = '${status}', updated_at = '${updated_at}' where id = '${id}'`)
  }
};

module.exports = modelCheckUp;
