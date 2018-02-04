var PdfReader = require('pdfreader').PdfReader; 

var PDFDataParser = {
    readData: function(buf, callBack){
        var textData = '';
        new PdfReader().parseBuffer(buf, function(err, item){
                if (err)
                    callBack(err);
                else if (!item)
                    callBack(textData);
                else if (item.text){
                    textData =  textData + ' ' + item.text;
                }

            });
        }
}   

module.exports = PDFDataParser;

