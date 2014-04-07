var https = require('https');
var beautify = require('js-beautify').js_beautify;
var fs = require('fs');

var options = {
	hostname: 'docs.google.com',
    path: '/spreadsheet/pub?key=0AnRyC36d2KeKdGppOHNjeHpENWNMVm5UbTdMWnZkMkE&single=true&gid=0&output=txt'
}

var request = https.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
	
	res.on('end', function () {
		var filename = "translations.js";
	
		var mydata = data.split('\n');

		for (row in mydata) {
			mydata[row] = (mydata[row].split('\t'));
		}	 
		
		var headers = mydata.shift();
		headers.shift(); // horrible side effect operation 
		
		var translations = {};
		
		for (row in mydata) {
		    var rowData = {};
		    var keyval = mydata[row].shift();
			
			for (header in headers) {
					rowData[headers[header]] = mydata[row][header]; 
			}
		    translations[keyval] = rowData;
		}

		var jsFile = [
		    "/* ========================================== */;"
		,	"/* created : " + new Date() + " */"
		,	"/* keys : " + mydata.length + " */"
		,	"/* ========================================== */;"
		,	""
		,	"var translations = " + beautify(JSON.stringify(translations)) + ";"
		];
		
		fs.writeFile(filename, jsFile.join('\n'), function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log(filename + " saved!");
			}
		}); 

		fs.readFile('index.template', 'utf8', function (err,data) {
			if (err) {
    			return console.log(err);
  			}

			headers.shift();
			for (var target_language in headers) {
				var copydata = data;
				
				var indexFile = "index." + headers[target_language] + ".html";
				console.log("generating " + indexFile);
				for (var key in translations) {
					var re = new RegExp("##"+key+"##", "g");
					copydata = copydata.replace(re, translations[key][headers[target_language]]);
				}
				fs.writeFile(indexFile, copydata, function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log(filename + " saved!");
					}
				}); 
			};
		});
    });
});

request.on('error', function (e) {
    console.log(e.message);
});


request.end();
