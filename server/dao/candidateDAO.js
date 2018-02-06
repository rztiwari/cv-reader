var fs = require('fs');
var _ = require('lodash');

const NO_RESULT_MESSAGE = 'No Results Found';

const CandidateDAO = {

    readCandidateByJobId: function(candidateid, jobid, callback){
        this.getAllCandidatesByJobId(jobid, function(response){
            if(response.status ==='SUCCESS'){
                var data = response.result.data;
                if(data && data.length > 0){
                    var res = {};
                    var d = _.find(data, function(item){
                        return item['candidateId'] === candidateid;
                    });
                    if(d && d['candidateId']){
                        res.status = 'SUCCESS';
                        res.result = d;
                    }else {
                        res.status = 'ERROR';
                        res.error = NO_RESULT_MESSAGE;
                    }
                    callback(res);
                }
            }else{
                callback(response);
            }
        });
    },

    getAllCandidatesByJobId: function(jobid, callback){
        readData(function(response){
            if(response.status === 'SUCCESS'){
                var data = response.result.data;
                if(data && data.length > 0){
                    var res = {};
                    var d = _.find(data, function(item){
                        return item['jobId'] === jobid;
                    });
                    if(d && d['jobId']){
                        res.status = 'SUCCESS';
                        res.result = d;
                    }else {
                        res.status = 'ERROR';
                        res.error = NO_RESULT_MESSAGE;
                    }
                    callback(res);
                }
            }else{
                callback(response);
            }
        });
    },

    getAllJobIds: function(callback){
        readData(function(response){
            if(response.status === 'SUCCESS'){
                var data = response.result.data;
                var result = [], res= {};
                if(data && data.length > 0){
                   _.forEach(data, function(item){
                        result.push({"jobId": item.jobId});
                   });
                }
                if(result && result.length > 0){
                    res.status = 'SUCCESS';
                    res.result  = result;
                }else{
                    res.status = 'ERROR';
                    res.error = NO_RESULT_MESSAGE;
                }
            }else{
                callback(response);
            }
        });
    },

    insertNewCandidateByJobId: function(jobId, candidate, callback){

    },

    deleteCandidateInJobId: function(jobId, candidateId, callback){

    },

    deleteJobId: function(jobId, callBack){
        
    }


}

var readData  = function(callback){
    var response = {};
    fs.readFile(__dirname + '/candidates.json', 'utf8', function(err, data){
        var jsonData;
        if(err){
            if(callback && typeof callback === 'function'){
                response.status = 'ERROR';
                response.error = err;
                callback(respone);
            }else{
                console.error('Write call failed')
            }
        }
        if(data){
            jsonData = JSON.parse(data);
            if(callback && typeof callback === 'function'){
                response.status = 'SUCCESS';
                response.result = jsonData;
                callback(response);
            }
        }
    });
}

var writeData = function(jsonData, callback){
    var response = {};
    fs.writeFile(__dirname + '/candidates.json', JSON.stringify(jsonData), function(err){
        if(err){
            response.status = 'ERROR';
            response.error = err;
            if(callback && typeof callback === 'function'){
                callback(response);
            }else{
                console.error(err);
            }
        }
        if(callback && typeof callback === 'function'){
            response.status = 'SUCCESS';
            response.result = {};
            callback(response);
        }
    });
}

module.exports = {CandidateDAO, writeData, readData};