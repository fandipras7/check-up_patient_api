const createError = require('http-errors')
const { response } = require('../helper/common')
const modelCheckUp = require('../models/checkup')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

const checkupController = {
    insertData: async (req, res, next) => {
        try {
            const { name, identity_number, address, complaint, phone_number} = req.body
            // const time = new Date()
            // moment(time).format('D-mm-yy HH:mm:ss')
            const data = {
                id: uuidv4(),
                created_by: 'SYSTEM',
                created_at: new Date().getTimezoneOffset(),
                updated_at: null,
                is_deleted: false,
                name,
                identity_number,
                address,
                complaint,
                phone_number,
                status: 'DONE'
            }

            console.log(data);
    
            const result = await modelCheckUp.insert(data)
            console.log(result);
            const dataResp = {
                ...data,
                created_at: moment(data.created_at).format('D-mm-yy HH:mm:ss')
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
            const searchByStatus = status.toUpperCase() || ''
            // console.log(searchByStatus);

            const result = await modelCheckUp.select(searchByStatus)
            response(res, result.rows, 200, 'Get Data Succes')
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
        console.log(data);
        await modelCheckUp.updateData(data)
        result = await modelCheckUp.selectById(id)
        const responData = {
            ...result,
            updated_at: moment(data.updated_at).format('D-mm-yy HH:mm:ss')
        }
        response(res, responData, 201, 'Update Data Success')
        } catch (error) {
            console.log(error);
            next(createError(500, "Uknown error"))
        }
    }
}

module.exports = checkupController