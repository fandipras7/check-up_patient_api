const createError = require('http-errors')
const { response } = require('../helper/common')
const modelCheckUp = require('../models/checkup')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

const checkupController = {
    insertData: async (req, res, next) => {
        try {
            const { name, identity_number, address, complaint, phone_number} = req.body
            const data = {
                id: uuidv4(),
                created_by: 'SYSTEM',
                created_at: new Date(),
                updated_at: null,
                is_deleted: false,
                name,
                identity_number,
                address,
                complaint,
                phone_number,
                status: 'WAITING'
            }

            console.log(data);
    
            const result = await modelCheckUp.insert(data)
            console.log(result);
            const dataResp = {
                ...data,
                created_at: moment(data.created_at).format('D-MM-yy HH:mm:ss')
            }
            response(res, dataResp, 200, 'Add data success')
        } catch (error) {
            console.log(error);
            next(createError(500, "Uknown error"))
        }
    },
    getDataPatient: async (req, res, next) => {
        try {
            const {status} = req.query
            const searchByStatus = status || ''
            const result = await modelCheckUp.select(searchByStatus.toUpperCase())
            const respData = result.rows.map((item)=>{
                let update = item.updated_at
                if(update){let update = moment(item.updated_at).format('D-MM-yy HH:mm:ss')}
                return {
                    ...item,
                   created_at: moment(item.created_at).format('D-MM-yy HH:mm:ss'),
                   updated_at: update
                }
            })

            response(res, respData, 200, 'Get Data Succes')
        } catch (error) {
            console.log(error);
            next(createError(500, "Uknown error"))
        }
    },
    updateDataPatient: async (req, res, next)=> {
        try {
        const id = req.params.id
        const {status} = req.query

        let result = await modelCheckUp.selectById(id)
        if(!result.rowCount || status === undefined){
           return next(createError(404, 'Data not found'))
        }
       const data = {
            id,
            status: status.toUpperCase(),
            updated_at: new Date()
        }
        const time = moment(data.updated_at).format('D-MM-yy HH:mm:ss')
        console.log(time);
        await modelCheckUp.updateData(data)
        result = await modelCheckUp.selectById(id)
        const responData = {
            ...result.rows[0],
            created_at: moment(result.rows[0].created_at).format('D-MM-yy HH:mm:ss'),
            updated_at: moment(result.rows[0].updated_at).format('D-MM-yy HH:mm:ss')
        }
        response(res, responData, 201, 'Update Data Success')
        } catch (error) {
            console.log(error);
            next(createError(500, "Uknown error"))
        }
    }
}

module.exports = checkupController