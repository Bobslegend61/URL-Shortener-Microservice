// Import necessary modules
const mongoose = require("mongoose");
const config = require("../config/database");
const func = require("../func/func");

// connect to database
mongoose.connect(config.database);

// Handle successfull connection
mongoose.connection.on("connected", () => {
    console.log("Connected to database");
});

// Handle error
mongoose.connection.on("error", (err) => {
    console.log("Database error "+ err);
});

// Define schema
const urlSchema = mongoose.Schema({
    original: String,
    shortCode: {
        type: Number,
        index: true
    }
});

urlSchema.index({shortCode: 1});

// Define model
let Url = module.exports = mongoose.model("urlShortener", urlSchema);

module.exports.getShortCode = (callback) => {
    Url.find({}, "shortCode", {
        sort: {
            shortCode: -1
        },
        limit: 1,
    }, (err, doc) => {
        if(err){
            return callback(err);
        }else{
            callback(null, doc);
        }
    });
}

module.exports.saveUrl = (url, callback) => {
    if(func.confirmUrl(url)){
        Url.findOne({original: url}, (err, doc) => {
            if(err){
                return callback("Error: "+ err);
            }
            
            if(doc){
                console.log(doc);
                callback(null, {
                    msg: "Url already exists in the database.",
                    doc: doc
                });
            }else{
                Url.getShortCode((err, doc) => {
                    if(err){
                        callback(err);
                    }

                    let newCode = doc.length === 1 ? doc[0].shortCode + 1 : 1;
                    let newUrl = new Url({original: url, shortCode: newCode});
                    newUrl.save(callback);
                });
            }
        });
    }else{
        callback( "Invalid URL format. Input URL must comply to the following: http(s)://(www.)domain.ext(/)(path)");
    }
}

module.exports.getUrl = (hostName, id, callback) => {
    if(func.checkId(id)){
        Url.findOne({shortCode: id}, callback);
    }else{
        callback("Invalid shortened url. format: "+hostName+"/(Number)");
    }        
}


