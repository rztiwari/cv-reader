var chrono = require('chrono-node');

const TagParser = {
    parseData: function (tagList, text) {
        var previousIndex = 0,
            tagValues,
            range;
        var dateArray = chrono.parse(text);
        console.log(tagList);
        for (var prop in dateArray) {
            if (parseInt(dateArray[prop].index, 10) >= (previousIndex + 100)) {
                tagValues = getTagInfo(tagValues, tagList, text.substring(previousIndex, parseInt(dateArray[prop].index, 10)), range );
                // console.log(range, text.substring(previousIndex, parseInt(dateArray[prop].index, 10)));
                console.log('Intermediate', tagValues);
                range = [];
                range.push(dateArray[prop].start.knownValues);
                previousIndex = parseInt(dateArray[prop].index, 10);
            } else {
                range.push(dateArray[prop].start.knownValues);
            }
        }

        console.log(tagValues);
    }
}

const getTagInfo = function(tagValues, tagList, text, range){
    console.log('Inside getTagInfo');
    if(!tagValues ||  !Object.keys(tagValues).length > 0){
        tagValues = {};
    }
    console.log(text);
        for(let tag of tagList){
            console.log(tag);
            if(tag && text && text.indexOf(tag) > -1){
                if(!tagValues[tag]){ 
                    tagValues[tag] = [];
                }
                tagValues[tag].push(range);
            }
        }
        return tagValues;
    }

module.exports = { TagParser };