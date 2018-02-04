var mammoth = require('mammoth');

var DOCXParser = {
    readData: function(buf, callBack){
            mammoth.extractRawText({buffer: buf})
            .then(function(result){
                var text = result.value;
                callBack(text);
            })
            .done();
    }
}   

module.exports = DOCXParser;

