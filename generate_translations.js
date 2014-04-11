"use strict";

var https = require("https");
var beautify = require("js-beautify").js_beautify;
var fs = require("fs");

var options = {
    hostname: "docs.google.com",
    path: "/spreadsheet/pub?key=0AnRyC36d2KeKdGppOHNjeHpENWNMVm5UbTdMWnZkMkE&single=true&gid=0&output=txt"
};

var request = https.request(options, function (res) {
    var data = "";
    res.on("data", function (chunk) {
        data += chunk;
    });

    res.on("end", function () {
        var filename = "translations.js";

        var mydata = data.split("\n");

        for (var row in mydata) {
            mydata[row] = (mydata[row].split("\t"));
        }

        var headers = mydata.shift();
        headers.shift(); // horrible side effect operation 

        var translations = {
            "language": {
                "comment": "lang"
            }
        };

        for (var header in headers) {
            translations.language[headers[header]] = headers[header];
        }

        for (row in mydata) {
            var rowData = {};
            var keyval = mydata[row].shift();

            for (header in headers) {
                rowData[headers[header]] = mydata[row][header];
            }
            translations[keyval] = rowData;
        }

        var jsFile = [
            "/* ========================================== */", "/* created : " + new Date() + " */", "/* keys : " + mydata.length + " */", "/* ========================================== */", "", "var translations = " + beautify(JSON.stringify(translations)) + ";"
        ];

        fs.writeFile(filename, jsFile.join("\n"), function (err) {
            console.log(err ? err : filename + " saved!");
        });

        fs.readFile("index.template", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }

            headers.shift();
            for (var targetLanguage in headers) {
                var copydata = data;

                var indexFile = ("index." + headers[targetLanguage] + ".html").replace(".en", "");

                for (var key in translations) {
                    var re = new RegExp("##" + key + "##", "g");
                    copydata = copydata.replace(re, translations[key][headers[targetLanguage]]);
                }

                fs.writeFile(indexFile, copydata, function (err) {
                    console.log(err ? err : indexFile + " saved!");
                });
            }

        });
    });
});

request.on("error", function (e) {
    console.log(e.message);
});

request.end();
