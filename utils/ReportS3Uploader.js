require('dotenv').config()
var S3 = require('aws-sdk/clients/s3');
const Excel = require('exceljs')
const TEMPLATES = {
    LOCAL_OVERNIGHT_GUEST_REPORT: './templates/monthly_overnight_occupancy_report.xlsx'
}

/**
 * 
 * @param {*} templatePath 
 * @param {*} key 
 * @param {*} generateBufferCallback 
 * @returns Promise<any>
 * 
 *  generateAndUploadToS3((workbook) => {
 *      let worksheet = workbook.getWorksheet('occupancy')
        let establishmentName = worksheet.getCell('B5');
        establishmentName.value = 'Icon events place';

        let days = worksheet.getColumn('B')
        let values = [];
        for(let row = 1; row < 44; row ++) {
            if(row >= 13) {
                values.push(Math.floor(Math.random() * 100))
            }
            else {
                values.push('');
            }
                
        }

        days.values = values;
        return workbook
 *  }, 'custom_key.xlsx', TEMPLATES.LOCAL_OVERNIGHT_GUEST_REPORT)
 */
const generateAndUploadToS3 = (
    generateBufferCallback = (workbook) => {}, // return workbook instance
    key = null, 
    templatePath = TEMPLATES.LOCAL_OVERNIGHT_GUEST_REPORT, 
    ) => {
        console.log(process.env)
        const s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            apiVersion: '2006-03-01',
            region: process.env.AWS_S3_REGION
        })
    const workbook = new Excel.Workbook();
    if(!key) {
        let date = new Date()
        key = date.getTime() + ".xlsx";
    }
    return workbook
    .xlsx
    .readFile(templatePath)
    .then(async () => {
        let buffer = await generateBufferCallback(workbook).xlsx.writeBuffer();
        return new Promise(async (resolve, reject) => {
            s3.upload({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
                Body: buffer,
            }, function(err, data) {
                if(err) {
                    return reject(err)
                }
                else {
                    return resolve({
                        payload: data,
                        message: "upload success!"
                    })
                }
            })
        })
    })
}

module.exports = {
    generateAndUploadToS3
}