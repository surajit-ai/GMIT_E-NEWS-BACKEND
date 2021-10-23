const schema_mongoose = require('mongoose');

const NewsSchema = schema_mongoose.Schema(
    {
        authorid: { type: String },
        authorname: { type: String },
        authoremail: { type: String },
        nname: { type: String },
        nnews: { type: String },
        ncat: { type: String },
        ntitle: { type: String },
        ndesp: { type: String },
        nimg: { type: String },
        regdatetime: { type: Date, default: Date.now },
        status:{type: String}
    }, 
    {
       timestamps: true
    }
    );

module.exports = schema_mongoose.model('news', NewsSchema);