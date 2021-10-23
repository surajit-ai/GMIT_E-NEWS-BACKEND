// IMPORT MONGOOSE 
const model_mongoose = require('mongoose');

//CREATE MODEL Employee means Employee Information
let EmployeeModel = model_mongoose.model('emp_model_collection', 
{
    empname: { type: String },
    empemail: { type: String },
    empmobile: { type: String },
    emppass: { type: String },
    empimg: { type: String }
    // empgender: { type: String },
    // empcountry: { type: String },
    // empaddress: { type: String },
	// regdatetime: { type: Date, default: Date.now }
});

//EXPORT MODULE Employee using BINDING
module.exports = EmployeeModel ;
