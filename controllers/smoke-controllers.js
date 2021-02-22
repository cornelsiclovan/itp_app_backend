const express = require('express');
const fs = require('fs');
const path = require('path');
const watch = require('node-watch');
const htmlPdf = require('html-pdf');
const utf8 = require('utf8');


const getSmokeData = async (req, res, next) => {    

    if(req.params.type === "30") {
        res.json(gas_bun_03[req.params.id]);
    } else if (req.params.type === "50") {
        res.json(gas_bun_05[req.params.id]);
    } else if (req.params.type === "35") {
        res.json(gas_bun_35[req.params.id]);
    } else if (req.params.type === "40") {
        res.json(gas_bun_40[req.params.id]);
    }
}

const patchSmokeData = async (req, res, next) => {

    let filePath = req.params.filename.replaceAll('xxx', '\\');


    fs.readFile(filePath, async(err, data) => {
        let htmlString;

        if(data != undefined) {
            htmlString = data.toString();

            var resArray = htmlString.split("|");

            resArray[14] = "&nbsp;&nbsp;" + co + "&nbsp;&nbsp;";
            
            resArray[18] = "&nbsp;&nbsp;" + co2 + "&nbsp;&nbsp;";
          
            resArray[22] = "&nbsp;&nbsp;" + hc + "&nbsp;&nbsp;";

            resArray[26] = "&nbsp;&nbsp;" + o2 + "&nbsp;&nbsp;";
        
            resArray[30] = "&nbsp;&nbsp;" + lambda + "&nbsp;&nbsp;";

            resArray[34] = "&nbsp;&nbsp;" + coc + "&nbsp;&nbsp;";
        
            resArray[38] = "&nbsp;&nbsp;" + afr + "&nbsp;&nbsp;";

            htmlString = resArray.join("|");
        
            await fs.writeFile(filePath, htmlString, (error) => {
                if(error) return console.log(error);
            });

            
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

}

exports.getSmokeData = getSmokeData;
exports.patchSmokeData = patchSmokeData;