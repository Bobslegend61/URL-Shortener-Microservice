// Setting up express app and other required modules 
const express = require("express");
const Url = require("../models/url");
const routes = express.Router();

// route for post url shortener
routes.get("/new/:url(*)", (req, res, next) => {
    console.log(req.headers.host);
   Url.saveUrl(req.params.url, (err, doc) => {
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

// route for get shortened url
routes.get("/:id", (req,res,next) => {
    Url.getUrl(req.headers.host, req.params.id, (err, doc) => {
        if(err){
            return res.json({
                error: err
            });
        }

        if(doc){
            res.redirect(doc.original);
        }else{
            res.json({
                error: "Shortened url not found"
            })
        }
    });
});

// export routes
module.exports = routes;