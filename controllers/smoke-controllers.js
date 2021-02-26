const express = require('express');
const fs = require('fs');
const path = require('path');
const watch = require('node-watch');
const htmlPdf = require('html-pdf');
const utf8 = require('utf8');


const patchSmokeData = async (req, res, next) => {

    let filePath = req.params.filename.replaceAll('xxx', '\\');
    const { k_m, ral_rpm, reg_rpm, tbaza_s} = req.body;

    fs.readFile(filePath, async(err, data) => {
        let htmlString;
 
        if(data != undefined) {
            htmlString = data.toString();

            var resArray = htmlString.split("|");

            console.log(resArray[23]);

            resArray[23] = "&nbsp;"+k_m+"*";

            htmlString = resArray.join("|");


            let admisArray = htmlString.split("<BR>");

            let kmediuArray = admisArray[41].split("=");
            let addNbspString = "";
            let startString = "&nbsp;";
            startString += k_m;
            startString += "&nbsp;/m&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*";

            for(let i = 0; i < 3 - k_m.length; i++) {
                addNbspString += "&nbsp;";
            }

            startString += addNbspString;

            kmediuArray[1] = startString;

            admisArray[41] = kmediuArray.join("="); 

            htmlString = admisArray.join("<BR>");

                // const htmlContent = fs.readFileSync(filePath, 'utf8');

                // console.log(htmlContent);
            const htmlContent = utf8.encode(htmlString);
            
            const pdfFilePath = filePath.split(".")[0] + ".pdf";

            const htmlToPdfOptions = {
                "type": "PDF",
                "height": "650px",
                "width": "850px",
                "renderDelay": 2000
            };

            htmlPdf.create(htmlContent, htmlToPdfOptions)
                .toFile(pdfFilePath, (err, res) => {
                    if (err) return console.log(err);
                    console.log(res);
                });
           
        }
    });

    res.status(200);
}

exports.patchSmokeData = patchSmokeData;