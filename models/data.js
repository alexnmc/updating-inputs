const mongoose = require("mongoose");  
const Schema = mongoose.Schema;

const dataSchema = new Schema({  
    moh: {
        type: Number,
    },

    boh:{
        type: Number
    },

    total: {
        type: Number,
        
    },

})
    


module.exports = mongoose.model("Data", dataSchema); 