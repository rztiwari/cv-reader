var fs = require('fs');
var _ = require('lodash');

const NO_RESULT_MESSAGE = 'No Results Found';
const WRITE_CALL_FAILS = 'Write call fails';
const INCORRECT_JOB_ID = "In-correct job id";
const COULD_NOT_DELETE_CANDIDATE = "Could not delete the candidate";
const CANDIDATE_NOT_PRESENT = "Candidate not found for the job id";
const JOBID_NOT_FOUND = "Job id not found";

const StepsDAO = {

    getAllSteps: function (callback) {
        readData(function (response) {
            if (response.status === 'SUCCESS') {
                var data = response.result.data;
                if (data && data.length > 0) {
                    var res = {};
                    res.status = 'SUCCESS';
                    res.result = data;
                    callback(res);
                }
            } else {
                callback(response);
            }
        });
    }
}

var readData = function (callback) {
    var response = {};
    fs.readFile(__dirname + '/steps.json', 'utf8', function (err, data) {
        var jsonData;
        if (err) {
            if (callback && typeof callback === 'function') {
                response.status = 'ERROR';
                response.error = err;
                callback(respone);
            } else {
                console.error(NO_RESULT_MESSAGE);
            }
        }
        if (data) {
            jsonData = JSON.parse(data);
            if (callback && typeof callback === 'function') {
                response.status = 'SUCCESS';
                response.result = jsonData;
                callback(response);
            }
        }
    });
}

module.exports = { StepsDAO };