// Setting up express app and other required modules 
const express = require("express");
const Url = require("../models/url");
const routes = express.Router();


// route for post url shortener
routes.post("/", (req, res, next) => {
    Url.saveUrl(req.body.url, (err, doc) => {
        if (err) {
            return res.json({
                error: err,
            });
        };

        if(doc.msg){
            return res.json({
                        error: doc.msg,
                        shortCode: doc.doc.shortCode
                    });
        }else{
            res.json({
                original: doc.original,
                shortCode: doc.shortCode
            });
        }
    });
});


// route for post shortened url
routes.post("/check", (req,res,next) => {
    Url.getUrl(req.headers.host, req.body.id, (err, doc) => {
        if(err){
            return res.json({
                error: err
            });
        }

        if(doc){
            res.json(doc);
        }else{
            res.json({
                error: "Shortened url not found"
            })
        }
    });
});

// export routes
module.exports = routes;