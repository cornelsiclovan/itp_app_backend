const express = require('express');
const fs = require('fs');
const path = require('path');
const watch = require('node-watch');
const htmlPdf = require('html-pdf');
const utf8 = require('utf8');

const gas_bun_03 = [
    {
        "co_1": "0.00",
        "co_2": "0.00",
        "co2_1": "14.9",
        "co2_2": "14.8",
        "hc_1": "0",
        "hc_2" : "0",
        "o2_1" : "0.36",
        "o2_2" : "0.67",
        "lambda_1": "1.02",
        "lambda_2": "1.03",
        "coc_1": "0.00",
        "coc_2": "0.00",
        "afr_1": "15.10",
        "afr_2": "15.24"
    },
    {
        "co_1": "0.16",
        "co_2": "0.04",
        "co2_1": "14.3",
        "co2_2": "14.5",
        "hc_1": "73",
        "hc_2" : "47",
        "o2_1" : "0.80",
        "o2_2" : "0.63",
        "lambda_1": "1.03",
        "lambda_2": "1.03",
        "coc_1": "0.16",
        "coc_2": "0.04",
        "afr_1": "15.24",
        "afr_2": "15.24"
    },
    {
        "co_1": "0.13",
        "co_2": "0.25",
        "co2_1": "14.8",
        "co2_2": "14.6",
        "hc_1": "44",
        "hc_2" : "69",
        "o2_1" : "0.33",
        "o2_2" : "0.27",
        "lambda_1": "1.01",
        "lambda_2": "1.00",
        "coc_1": "0.13",
        "coc_2": "0.25",
        "afr_1": "14.95",
        "afr_2": "14.80"
    },
    {
        "co_1": "0.19",
        "co_2": "0.23",
        "co2_1": "14.5",
        "co2_2": "14.5",
        "hc_1": "32",
        "hc_2" : "29",
        "o2_1" : "0.31",
        "o2_2" : "0.27",
        "lambda_1": "1.01",
        "lambda_2": "1.00",
        "coc_1": "0.19",
        "coc_2": "0.23",
        "afr_1": "14.95",
        "afr_2": "14.80"
    },
    {
        "co_1": "0.19",
        "co_2": "0.09",
        "co2_1": "14.9",
        "co2_2": "15.1",
        "hc_1": "98",
        "hc_2" : "31",
        "o2_1" : "0.27",
        "o2_2" : "0.31",
        "lambda_1": "1.00",
        "lambda_2": "1.01",
        "coc_1": "0.19",
        "coc_2": "0.09",
        "afr_1": "14.80",
        "afr_2": "14.95"
    },
    {
        "co_1": "0.02",
        "co_2": "0.03",
        "co2_1": "14.9",
        "co2_2": "14.9",
        "hc_1": "32",
        "hc_2" : "33",
        "o2_1" : "0.31",
        "o2_2" : "0.44",
        "lambda_1": "1.01",
        "lambda_2": "1.02",
        "coc_1": "0.02",
        "coc_2": "0.03",
        "afr_1": "14.95",
        "afr_2": "15.10"
    },
    {
        "co_1": "0.02",
        "co_2": "0.02",
        "co2_1": "14.7",
        "co2_2": "14.7",
        "hc_1": "0",
        "hc_2" : "0",
        "o2_1" : "0.75",
        "o2_2" : "0.71",
        "lambda_1": "1.03",
        "lambda_2": "1.03",
        "coc_1": "0.02",
        "coc_2": "0.02",
        "afr_1": "15.24",
        "afr_2": "15.24"
    },
    {
        "co_1": "0.08",
        "co_2": "0.05",
        "co2_1": "14.6",
        "co2_2": "14.6",
        "hc_1": "37",
        "hc_2" : "24",
        "o2_1" : "0.47",
        "o2_2" : "0.38",
        "lambda_1": "1.02",
        "lambda_2": "1.01",
        "coc_1": "0.08",
        "coc_2": "0.05",
        "afr_1": "15.10",
        "afr_2": "14.95"
    },
    {
        "co_1": "0.03",
        "co_2": "0.00",
        "co2_1": "14.8",
        "co2_2": "14.8",
        "hc_1": "45",
        "hc_2" : "30",
        "o2_1" : "0.58",
        "o2_2" : "0.58",
        "lambda_1": "1.02",
        "lambda_2": "1.03",
        "coc_1": "0.03",
        "coc_2": "0.00",
        "afr_1": "15.10",
        "afr_2": "15.24"
    },
    {
        "co_1": "0.04",
        "co_2": "0.02",
        "co2_1": "14.9",
        "co2_2": "15.1",
        "hc_1": "55",
        "hc_2" : "67",
        "o2_1" : "0.62",
        "o2_2" : "0.43",
        "lambda_1": "1.02",
        "lambda_2": "1.02",
        "coc_1": "0.04",
        "coc_2": "0.02",
        "afr_1": "15.10",
        "afr_2": "15.10"
    },
    {
        "co_1": "0.03",
        "co_2": "0.00",
        "co2_1": "15.1",
        "co2_2": "15.2",
        "hc_1": "36",
        "hc_2" : "20",
        "o2_1" : "0.40",
        "o2_2" : "0.30",
        "lambda_1": "1.02",
        "lambda_2": "1.01",
        "coc_1": "0.03",
        "coc_2": "0.00",
        "afr_1": "15.10",
        "afr_2": "14.95"
    },
    {
        "co_1": "0.16",
        "co_2": "0.06",
        "co2_1": "15.0",
        "co2_2": "15.1",
        "hc_1": "0",
        "hc_2" : "0",
        "o2_1" : "0.46",
        "o2_2" : "0.26",
        "lambda_1": "1.02",
        "lambda_2": "1.01",
        "coc_1": "0.16",
        "coc_2": "0.06",
        "afr_1": "15.10",
        "afr_2": "14.95"
    },
    {
        "co_1": "0.00",
        "co_2": "0.00",
        "co2_1": "15.2",
        "co2_2": "15.2",
        "hc_1": "0",
        "hc_2" : "0",
        "o2_1" : "0.54",
        "o2_2" : "0.38",
        "lambda_1": "1.02",
        "lambda_2": "1.02",
        "coc_1": "0.00",
        "coc_2": "0.00",
        "afr_1": "15.10",
        "afr_2": "15.10"
    },
    {
        "co_1": "0.00",
        "co_2": "0.00",
        "co2_1": "15.1",
        "co2_2": "15.1",
        "hc_1": "0",
        "hc_2" : "0",
        "o2_1" : "0.35",
        "o2_2" : "0.27",
        "lambda_1": "1.02",
        "lambda_2": "1.01",
        "coc_1": "0.00",
        "coc_2": "0.00",
        "afr_1": "15.10",
        "afr_2": "14.95"
    },
    {
        "co_1": "0.02",
        "co_2": "0.01",
        "co2_1": "15.1",
        "co2_2": "15.1",
        "hc_1": "4",
        "hc_2" : "0",
        "o2_1" : "0.57",
        "o2_2" : "0.34",
        "lambda_1": "1.03",
        "lambda_2": "1.01",
        "coc_1": "0.02",
        "coc_2": "0.01",
        "afr_1": "15.24",
        "afr_2": "14.95"
    },
    {
        "co_1": "0.02",
        "co_2": "0.04",
        "co2_1": "15.3",
        "co2_2": "15.3",
        "hc_1": "9",
        "hc_2" : "0",
        "o2_1" : "0.41",
        "o2_2" : "0.32",
        "lambda_1": "1.02",
        "lambda_2": "1.01",
        "coc_1": "0.02",
        "coc_2": "0.04",
        "afr_1": "15.10",
        "afr_2": "14.95"
    },
    {
        "co_1": "0.10",
        "co_2": "0.00",
        "co2_1": "14.7",
        "co2_2": "14.8",
        "hc_1": "7",
        "hc_2" : "0",
        "o2_1" : "0.55",
        "o2_2" : "0.70",
        "lambda_1": "1.02",
        "lambda_2": "1.03",
        "coc_1": "0.10",
        "coc_2": "0.00",
        "afr_1": "15.10",
        "afr_2": "15.24"
    },
    {
        "co_1": "0.07",
        "co_2": "0.05",
        "co2_1": "14.7",
        "co2_2": "14.8",
        "hc_1": "14",
        "hc_2" : "7",
        "o2_1" : "0.70",
        "o2_2" : "0.56",
        "lambda_1": "1.03",
        "lambda_2": "1.02",
        "coc_1": "0.07",
        "coc_2": "0.05",
        "afr_1": "15.24",
        "afr_2": "15.10"
    },
    {
        "co_1": "0.10",
        "co_2": "0.10",
        "co2_1": "14.6",
        "co2_2": "14.4",
        "hc_1": "1",
        "hc_2" : "6",
        "o2_1" : "0.79",
        "o2_2" : "0.87",
        "lambda_1": "1.03",
        "lambda_2": "1.03",
        "coc_1": "0.10",
        "coc_2": "0.10",
        "afr_1": "15.24",
        "afr_2": "15.39"
    },
    {
        "co_1": "0.00",
        "co_2": "0.03",
        "co2_1": "14.9",
        "co2_2": "15.0",
        "hc_1": "44",
        "hc_2" : "50",
        "o2_1" : "0.59",
        "o2_2" : "0.49",
        "lambda_1": "1.02",
        "lambda_2": "1.02",
        "coc_1": "0.00",
        "coc_2": "0.03",
        "afr_1": "15.10",
        "afr_2": "15.10"
    }
];

const gas_bun_05 = [
    {
        "co_1": "0.15",
        "co_2": "0.19",
        "co2_1": "14.6",
        "co2_2": "14.5",
        "hc_1": "38",
        "hc_2" : "88",
        "o2_1" : "0.65",
        "o2_2" : "0.42",
        "lambda_1": "1.03",
        "lambda_2": "1.01",
        "coc_1": "0.15",
        "coc_2": "0.19",
        "afr_1": "15.24",
        "afr_2": "14.95"
    },
    {
        "co_1": "0.08",
        "co_2": "0.17",
        "co2_1": "14.6",
        "co2_2": "14.7",
        "hc_1": "26",
        "hc_2" : "23",
        "o2_1" : "0.76",
        "o2_2" : "0.72",
        "lambda_1": "1.03",
        "lambda_2": "1.03",
        "coc_1": "0.08",
        "coc_2": "0.17",
        "afr_1": "15.24",
        "afr_2": "15.24"
    },
    {
        "co_1": "0.10",
        "co_2": "0.12",
        "co2_1": "15.0",
        "co2_2": "15.0",
        "hc_1": "10",
        "hc_2" : "28",
        "o2_1" : "0.63",
        "o2_2" : "0.53",
        "lambda_1": "1.03",
        "lambda_2": "1.02",
        "coc_1": "0.10",
        "coc_2": "0.12",
        "afr_1": "15.24",
        "afr_2": "15.10"
    },
    {
        "co_1": "0.18",
        "co_2": "0.27",
        "co2_1": "14.8",
        "co2_2": "14.8",
        "hc_1": "33",
        "hc_2" : "72",
        "o2_1" : "0.74",
        "o2_2" : "0.50",
        "lambda_1": "1.03",
        "lambda_2": "1.02",
        "coc_1": "0.18",
        "coc_2": "0.27",
        "afr_1": "15.24",
        "afr_2": "15.10"
    },
    {
        "co_1": "0.26",
        "co_2": "0.22",
        "co2_1": "14.8",
        "co2_2": "14.8",
        "hc_1": "31",
        "hc_2" : "33",
        "o2_1" : "0.21",
        "o2_2" : "0.33",
        "lambda_1": "1.00",
        "lambda_2": "1.01",
        "coc_1": "0.26",
        "coc_2": "0.22",
        "afr_1": "14.80",
        "afr_2": "14.95"
    },
    {
        "co_1": "0.28",
        "co_2": "0.26",
        "co2_1": "14.3",
        "co2_2": "14.4",
        "hc_1": "58",
        "hc_2" : "40",
        "o2_1" : "0.59",
        "o2_2" : "0.41",
        "lambda_1": "1.02",
        "lambda_2": "1.01",
        "coc_1": "0.28",
        "coc_2": "0.26",
        "afr_1": "15.10",
        "afr_2": "14.95"
    },
    {
        "co_1": "0.05",
        "co_2": "0.21",
        "co2_1": "14.7",
        "co2_2": "14.6",
        "hc_1": "14",
        "hc_2" : "19",
        "o2_1" : "0.66",
        "o2_2" : "0.32",
        "lambda_1": "1.03",
        "lambda_2": "1.01",
        "coc_1": "0.05",
        "coc_2": "0.21",
        "afr_1": "15.24",
        "afr_2": "14.95"
    },
    {
        "co_1": "0.12",
        "co_2": "0.14",
        "co2_1": "14.6",
        "co2_2": "14.7",
        "hc_1": "26",
        "hc_2" : "23",
        "o2_1" : "0.76",
        "o2_2" : "0.72",
        "lambda_1": "1.03",
        "lambda_2": "1.03",
        "coc_1": "0.12",
        "coc_2": "0.14",
        "afr_1": "15.24",
        "afr_2": "15.24"
    },
    {
        "co_1": "0.10",
        "co_2": "0.18",
        "co2_1": "15.0",
        "co2_2": "15.0",
        "hc_1": "10",
        "hc_2" : "0",
        "o2_1" : "0.63",
        "o2_2" : "0.53",
        "lambda_1": "1.03",
        "lambda_2": "1.02",
        "coc_1": "0.10",
        "coc_2": "0.18",
        "afr_1": "15.24",
        "afr_2": "15.10"
    },
    {
        "co_1": "0.09",
        "co_2": "0.19",
        "co2_1": "14.8",
        "co2_2": "14.8",
        "hc_1": "30",
        "hc_2" : "22",
        "o2_1" : "0.74",
        "o2_2" : "0.50",
        "lambda_1": "1.03",
        "lambda_2": "1.02",
        "coc_1": "0.09",
        "coc_2": "0.19",
        "afr_1": "15.24",
        "afr_2": "15.10"
    }
];

const gas_bun_35 = [
    {
        "co_1": "2.19",
        "co_2": "",
        "co2_1": "9.6",
        "co2_2": "",
        "hc_1": "507",
        "hc_2" : "",
        "o2_1" : "5.4",
        "o2_2" : "",
        "lambda_1": "1.21",
        "lambda_2": "",
        "coc_1": "2.79",
        "coc_2": "",
        "afr_1": "17.91",
        "afr_2": ""
    },
    {
        "co_1": "0.92",
        "co_2": "",
        "co2_1": "9.7",
        "co2_2": "",
        "hc_1": "550",
        "hc_2" : "",
        "o2_1" : "6.2",
        "o2_2" : "",
        "lambda_1": "1.33",
        "lambda_2": "",
        "coc_1": "1.30",
        "coc_2": "",
        "afr_1": "19.68",
        "afr_2": ""
    },
    {
        "co_1": "0.90",
        "co_2": "",
        "co2_1": "9.8",
        "co2_2": "",
        "hc_1": "487",
        "hc_2" : "",
        "o2_1" : "6.6",
        "o2_2" : "",
        "lambda_1": "1.36",
        "lambda_2": "",
        "coc_1": "1.26",
        "coc_2": "",
        "afr_1": "20.13",
        "afr_2": ""
    },
    {
        "co_1": "0.90",
        "co_2": "",
        "co2_1": "9.9",
        "co2_2": "",
        "hc_1": "404",
        "hc_2" : "",
        "o2_1" : "6.2",
        "o2_2" : "",
        "lambda_1": "1.34",
        "lambda_2": "",
        "coc_1": "1.25",
        "coc_2": "",
        "afr_1": "19.83",
        "afr_2": ""
    },
    {
        "co_1": "0.90",
        "co_2": "",
        "co2_1": "9.3",
        "co2_2": "",
        "hc_1": "512",
        "hc_2" : "",
        "o2_1" : "6.8",
        "o2_2" : "",
        "lambda_1": "1.39",
        "lambda_2": "",
        "coc_1": "1.32",
        "coc_2": "",
        "afr_1": "20.57",
        "afr_2": ""
    }
];

const gas_bun_45 = [ 
    {
        "co_1": "0.92",
        "co_2": "",
        "co2_1": "9.6",
        "co2_2": "",
        "hc_1": "436",
        "hc_2" : "",
        "o2_1" : "6.7",
        "o2_2" : "",
        "lambda_1": "1.37",
        "lambda_2": "",
        "coc_1": "1.31",
        "coc_2": "",
        "afr_1": "20.28",
        "afr_2": ""
    },
    {
        "co_1": "0.97",
        "co_2": "",
        "co2_1": "11.2",
        "co2_2": "",
        "hc_1": "396",
        "hc_2" : "",
        "o2_1" : "4.7",
        "o2_2" : "",
        "lambda_1": "1.21",
        "lambda_2": "",
        "coc_1": "1.20",
        "coc_2": "",
        "afr_1": "17.91",
        "afr_2": ""
    },
    {
        "co_1": "1.04",
        "co_2": "",
        "co2_1": "11.0",
        "co2_2": "",
        "hc_1": "354",
        "hc_2" : "",
        "o2_1" : "4.8",
        "o2_2" : "",
        "lambda_1": "1.22",
        "lambda_2": "",
        "coc_1": "1.30",
        "coc_2": "",
        "afr_1": "18.06",
        "afr_2": ""
    },
    {
        "co_1": "1.49",
        "co_2": "",
        "co2_1": "9.8",
        "co2_2": "",
        "hc_1": "701",
        "hc_2" : "",
        "o2_1" : "5.8",
        "o2_2" : "",
        "lambda_1": "1.24",
        "lambda_2": "",
        "coc_1": "2.22",
        "coc_2": "",
        "afr_1": "18.35",
        "afr_2": ""
    },
    {
        "co_1": "2.29",
        "co_2": "",
        "co2_1": "9.7",
        "co2_2": "",
        "hc_1": "433",
        "hc_2" : "",
        "o2_1" : "5.0",
        "o2_2" : "",
        "lambda_1": "1.18",
        "lambda_2": "",
        "coc_1": "2.86",
        "coc_2": "",
        "afr_1": "17.46",
        "afr_2": ""
    },
    {
        "co_1": "2.16",
        "co_2": "",
        "co2_1": "9.9",
        "co2_2": "",
        "hc_1": "432",
        "hc_2" : "",
        "o2_1" : "5.1",
        "o2_2" : "",
        "lambda_1": "1.19",
        "lambda_2": "",
        "coc_1": "2.69",
        "coc_2": "",
        "afr_1": "17.61",
        "afr_2": ""
    }
];


const getGasData = async (req, res, next) => {    

    if(req.params.type === "30") {
        res.json(gas_bun_03[req.params.id]);
    } else if (req.params.type === "50") {
        res.json(gas_bun_05[req.params.id]);
    } else if (req.params.type === "35") {
        res.json(gas_bun_35[req.params.id]);
    } else if (req.params.type === "45") {
        res.json(gas_bun_45[req.params.id]);
    }
}

const patchGasData = async (req, res, next) => {

    let filePath = req.params.filename.replaceAll('xxx', '\\');

    const { lambda_1, lambda_2, hc_1, hc_2, 
            o2_1, o2_2, co2_1, co2_2, co_1, co_2, 
            coc_1, coc_2, afr_1, afr_2, tur_rpm_1, tur_rpm_2, 
            temp_c_1, temp_c_2} = req.body;

    fs.readFile(filePath, async(err, data) => {
        let htmlString;

        if(data != undefined) {
            htmlString = data.toString();

            var resArray = htmlString.split("|");

            resArray[14] = "&nbsp;&nbsp;&nbsp;" + co_1 + "&nbsp;&nbsp;";
            resArray[15] = "&nbsp;&nbsp;&nbsp;" + co_2 + "&nbsp;&nbsp;";
            
            if(co2_1.length === 3) {
                resArray[18] = "&nbsp;&nbsp;&nbsp;&nbsp;" + co2_1 + "&nbsp;&nbsp;"; 
            } else {
                resArray[18] = "&nbsp;&nbsp;&nbsp;" + co2_1 + "&nbsp;&nbsp;";
            }

            //resArray[18] = "&nbsp;&nbsp;&nbsp;" + co2_1 + "&nbsp;&nbsp;";
            resArray[19] = "&nbsp;&nbsp;&nbsp;" + co2_2 + "&nbsp;&nbsp;";

            let nbsp = await getNbsp(hc_1, 4, 3);

            resArray[22] = nbsp + hc_1 + "&nbsp;&nbsp;";

            nbsp = await getNbsp(hc_2, 4, 3);

            resArray[23] = nbsp + hc_2 + "&nbsp;&nbsp;";

            if(o2_1.length === 3) {
                resArray[26] = "&nbsp;&nbsp;&nbsp;&nbsp;" + o2_1 + "&nbsp;&nbsp;";
            } else {
                resArray[26] = "&nbsp;&nbsp;&nbsp;" + o2_1 + "&nbsp;&nbsp;";
            }

            resArray[26] = "&nbsp;&nbsp;&nbsp;" + o2_1 + "&nbsp;&nbsp;";
            resArray[27] = "&nbsp;&nbsp;&nbsp;" + o2_2 + "&nbsp;&nbsp;";
        
            resArray[30] = "&nbsp;&nbsp;&nbsp;" + lambda_1 + "&nbsp;&nbsp;";
            resArray[31] = "&nbsp;&nbsp;&nbsp;" + lambda_2 + "&nbsp;&nbsp;";

            resArray[34] = "&nbsp;&nbsp;&nbsp;" + coc_1 + "&nbsp;&nbsp;";
            resArray[35] = "&nbsp;&nbsp;&nbsp;" + coc_2 + "&nbsp;&nbsp;";
        
            resArray[38] = "&nbsp;&nbsp;" + afr_1 + "&nbsp;&nbsp;";
            resArray[39] = "&nbsp;&nbsp;" + afr_2 + "&nbsp;&nbsp;";

            if(parseInt(tur_rpm_1) < 1000) {
                tur_string = "&nbsp;" + tur_rpm_1;
            } else {
                tur_string = tur_rpm_1;
            }

            resArray[42] = "&nbsp;&nbsp;&nbsp;" + tur_string + "&nbsp;&nbsp;";

            if(parseInt(tur_rpm_2) < 1000) {
                tur_string = "&nbsp;" + tur_rpm_2;
            } else {
                tur_string = tur_rpm_2;
            }


            if(tur_rpm_2 != 0)
                resArray[43] = "&nbsp;&nbsp;&nbsp;" + tur_string + "&nbsp;&nbsp;";

            resArray[46] = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + temp_c_1 + "&nbsp;&nbsp;";
            
            if(temp_c_2 != 0)
                resArray[47] = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + temp_c_2 + "&nbsp;&nbsp;";

            htmlString = resArray.join("|");
        
            await fs.writeFile(filePath, htmlString, (error) => {
                if(error) return console.log(error);
            });

            
               
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

const getNbsp = async (string, initialSize, customSize) => {
    let nbspString = '';
    let nbspSize   = initialSize + customSize - string.length;

    for (let i=0; i<nbspSize; i++) {
        nbspString += "&nbsp;";
    }    

    return nbspString;
}

exports.getGasData = getGasData;
exports.patchGasData = patchGasData;