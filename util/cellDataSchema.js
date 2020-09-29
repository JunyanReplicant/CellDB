const mongoose = require("mongoose");

const cellData = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    job: {
        type: String,
    },
    exp: {
        machine: { type: String },
        //this is the vessel id/or other unique id on the S3/ZOOM/BIOTEK
        id: {
            type: String,
        },
        startDate: { type: Date },
        extLink: { type: String },
        dataType: { type: String }, //confluence or cell number
        cellType: { type: String, lowercase: true },
        treatmentType: { type: String, lowercase: true },
        dosage: { type: String },
    },

    //this is the account who submit data to this database
    account: {
        type: String,
        lowercase: true,
    },
    Details: {
        type: String,
    },
    dataInString: { type: String },
    dataInFile: { fileName: String, bucketName: String },
});

const CellData = mongoose.model("CellData", cellData);

module.exports = CellData;
