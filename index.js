// var S3 = require('aws-sdk/clients/s3');
// const Excel = require('exceljs')
// const s3 = new S3({
//     accessKeyId: 'AKIATRQYVIN2RNZL5TMR',
//     secretAccessKey: '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',
//     apiVersion: '2006-03-01',
//     region: 'ap-southeast-1'
// })
// const workbook = new Excel.Workbook();
// const TEMPLATES = {
//     LOCAL_OVERNIGHT_GUEST_REPORT: './templates/monthly_overnight_occupancy_report.xlsx'
// }

// workbook
//     .xlsx
//     .readFile(TEMPLATES.LOCAL_OVERNIGHT_GUEST_REPORT)
//     .then(async (workbook) => {
//         let date = new Date()
//         let worksheet = workbook.getWorksheet('occupancy')
//         let establishmentName = worksheet.getCell('B5');
//         establishmentName.value = 'Icon events place';

//         let days = worksheet.getColumn('B')
//         let values = [];
//         for(let row = 1; row < 44; row ++) {
//             if(row >= 13) {
//                 values.push(Math.floor(Math.random() * 100))
//             }
//             else {
//                 values.push('');
//             }
                
//         }

//         days.values = values;
        
//         let buffer = await workbook.xlsx.writeBuffer()
//         return new Promise(async (resolve, reject) => {
//             s3.upload({
//                 Bucket: 'tourism-reports-s3-bucket',
//                 Key: date.getTime() + ".xlsx",
//                 Body: buffer,
//             }, function(err, data) {
//                 if(err) {
//                     return reject(err)
//                 }
//                 else {
//                     return resolve({
//                         payload: data,
//                         message: "upload success!"
//                     })
//                 }
                
//             })
//         })
//     })
//     .then((res) => console.log(res))
//     .catch(err => console.log('Error: ', err))

const { generateAndUploadToS3 } = require('./utils/ReportS3Uploader')
generateAndUploadToS3((workbook) => {
    let worksheet = workbook.getWorksheet('occupancy')

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

    let establishmentName = worksheet.getCell('B5');
    establishmentName.value = 'Venue 88';
    
    return workbook
})