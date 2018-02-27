var chrono = require('chrono-node');

const TagParser = {
    parseData: function (tagList, text) {
        var previousIndex = 0,
            tagValues,
            range,
            sanitizedText;

        if(text){
            sanitizedText = text.replace(/Till Date|till date|Till date|till now|Till now/g, 'Today');
        }

        var dateArray = chrono.parse(sanitizedText);
        for (var prop in dateArray) {
            if (parseInt(dateArray[prop].index, 10) >= (previousIndex + 100)) {
                tagValues = getTagInfo(tagValues, tagList, sanitizedText.substring(previousIndex, parseInt(dateArray[prop].index, 10)), range );
                range = [];
                range.push(dateArray[prop].start.knownValues);
                previousIndex = parseInt(dateArray[prop].index, 10);
            } else {
                range.push(dateArray[prop].start.knownValues);
            }
        }
       return combineExperience(tagValues);
    }
}

const combineExperience = function(tagValues){
    var exp = {};
    for(let prop in tagValues){
            // let previous, next;
        let experience = 0;
        tagValues[prop].forEach(element => {
            if(element &&  Array.isArray(element)){
                let years, months, start = element[0],
                end = element[1];

                if(start && end && end.year && start.year){
                    years = end.year - start.year;
                    months = end.month - start.month;
                }
                if(!isNaN(years) && !isNaN(months)){
                    experience = parseInt(experience, 10) + parseInt(years, 10) * 12 + parseInt(months, 10);
                }
            }
        });
        exp[prop] = experience
    }
    return exp;
}

const getTagInfo = function(tagValues, tagList, text, range){
    if(!tagValues ||  !Object.keys(tagValues).length > 0){
        tagValues = {};
    }
        for(let tag of tagList){
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