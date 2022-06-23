
const { generateAndUploadToS3 } = require('./utils/ReportS3Uploader')
generateAndUploadToS3((workbook) => {
    let worksheet = workbook.getWorksheet('occupancy')

    let days = worksheet.getColumn('B')
    let values = [];
    for (let row = 1; row < 44; row++) {
        if (row >= 13) {
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