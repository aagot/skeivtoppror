// Credit: http://techslides.com/convert-csv-to-json-in-javascript
// Source: https://gist.github.com/iwek/7154578#file-csv-to-json-js
// Modifications done:
// - function name
// - separator
function csv2json(csv){
  const sep = ";";
  var lines = csv.split("\n");
  var result = [];
  var headers=lines[0].split(sep);
  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(sep);
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  return result;
}
