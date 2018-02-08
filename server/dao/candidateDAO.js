var fs = require('fs');
var _ = require('lodash');

const NO_RESULT_MESSAGE = 'No Results Found';
const WRITE_CALL_FAILS = 'Write call fails';
const INCORRECT_JOB_ID = "In-correct job id";
const COULD_NOT_DELETE_CANDIDATE = "Could not delete the candidate";
const CANDIDATE_NOT_PRESENT = "Candidate not found for the job id";
const JOBID_NOT_FOUND = "Job id not found";

const CandidateDAO = {

    readCandidateByJobId: function (candidateid, jobid, callback) {
        this.getAllCandidatesByJobId(jobid, function (response) {
            if (response.status === 'SUCCESS') {
                var data = response.result.data;
                if (data && data.length > 0) {
                    var res = {};
                    var d = _.find(data, function (item) {
                        return item['candidateId'] === candidateid;
                    });
                    if (d && d['candidateId']) {
                        res.status = 'SUCCESS';
                        res.result = d;
                    } else {
                        res.status = 'ERROR';
                        res.error = NO_RESULT_MESSAGE;
                    }
                    callback(res);
                }
            } else {
                callback(response);
            }
        });
    },

    getAllCandidatesByJobId: function (jobid, callback) {
        readData(function (response) {
            if (response.status === 'SUCCESS') {
                var data = response.result.data;
                if (data && data.length > 0) {
                    var res = {};
                    var d = _.find(data, function (item) {
                        return item['jobId'] === jobid;
                    });
                    if (d && d['jobId']) {
                        res.status = 'SUCCESS';
                        res.result = d;
                    } else {
                        res.status = 'ERROR';
                        res.error = NO_RESULT_MESSAGE;
                    }
                    callback(res);
                }
            } else {
                callback(response);
            }
        });
    },

    getAllJobIds: function (callback) {
        readData(function (response) {
            if (response.status === 'SUCCESS') {
                var data = response.result.data;
                var result = [], res = {};
                if (data && data.length > 0) {
                    _.forEach(data, function (item) {
                        result.push(item.jobId);
                    });
                }
                if (result && result.length > 0) {
                    res.status = 'SUCCESS';
                    res.result = result;
                } else {
                    res.status = 'ERROR';
                    res.error = NO_RESULT_MESSAGE;
                }
                callback(res);
            } else {
                callback(response);
            }
        });
    },

    insertNewCandidateByJobId: function (jobId, candidate, callback) {
        var jobData, arr, dataToLoad, res = {}, data;
        readData(function (response) {
            if (response.status === 'SUCCESS') {
                data = response.result.data;
            }

            if (!data) {
                data = [];
            }
            jobData = _.find(data, function (item) { return item['jobId'] === jobId });
            if (!jobData) {
                jobData = { "jobId": jobId };
            }
            if (!jobData.data || jobData.data.length === 0) {
                jobData.data = [];
            }
            if(jobData.data.length > 0){
                lastCondidateId = jobData.data[jobData.data.length -1]['candidateId'];
            }
            candidate.candidateId = parseInt(lastCondidateId, 10) + 1;
            jobData.data.push(candidate);
            arr = _.reject(data, function (job) { return job.jobId === jobId });
            arr.push(jobData);
            dataToLoad = { "data": arr };
            writeData(dataToLoad, function (response) {
                if (response && response.status === 'SUCCESS') {
                    callback(response);
                } else {
                    res = {};
                    res.status = 'ERROR';
                    res.error = WRITE_CALL_FAILS;
                    callback(res);
                }
            });
        });
    },

    deleteCandidateInJobId: function (jobId, candidateId, callback) {
        var jobData, candidates, candidateToDelete, arr, dataToLoad, res = {};
        readData(function (response) {
            if (response.status === 'SUCCESS') {
                var data = response.result.data;
                var result = [], res = {};
                if (data && data.length > 0) {
                    jobData = _.find(data, function (item) { return item['jobId'] === jobId });
                    if (jobData) {
                        candidateToDelete = _.find(jobData.data, function (obj) { return obj.candidateId === candidateId });
                        if (candidateToDelete) {
                            candidates = _.reject(jobData.data, function (obj) { return obj.candidateId === candidateId });
                            jobData.data = candidates;
                            arr = _.reject(data, function (job) { return job.jobId === jobId });
                            arr.push(jobData);
                            dataToLoad = { "data": arr };
                            writeData(dataToLoad, function (response) {
                                if (response && response.status === 'SUCCESS') {
                                    callback(response);
                                } else {
                                    res = {};
                                    res.status = 'ERROR';
                                    res.error = COULD_NOT_DELETE_CANDIDATE;
                                    callback(res);
                                }
                            });
                        } else {
                            res = {};
                            res.status = 'ERROR';
                            res.error = CANDIDATE_NOT_PRESENT;
                            callback(res);
                        }
                    } else {
                        res = {};
                        res.status = 'ERROR';
                        res.error = INCORRECT_JOB_ID;
                        callback(res);
                    }
                }
            } else {
                callback(response);
            }
        });
    },

    deleteJobId: function (jobId, callback) {
        var jobData, dataToDelete, dataToLoad, res = {};
        readData(function (response) {
            if (response.status === 'SUCCESS') {
                var data = response.result.data;
                var result = [], res = {};
                if (data && data.length > 0) {
                    dataToDelete = _.find(data, function (item) { return item['jobId'] === jobId });
                    if (dataToDelete) {
                        jobData = _.reject(data, function (item) { return item['jobId'] === jobId });
                        dataToLoad = { "data": jobData };
                        writeData(dataToLoad, function (response) {
                            if (response && response.status === 'SUCCESS') {
                                callback(response);
                            } else {
                                res = {};
                                res.status = 'ERROR';
                                res.error = WRITE_CALL_FAILS;
                                callback(res);
                            }
                        });
                    } else {
                        res = {};
                        res.status = 'ERROR';
                        res.error = JOBID_NOT_FOUND;
                        callback(res);
                    }
                }
            } else {
                res = {};
                res.status = 'ERROR';
                res.error = WRITE_CALL_FAILS;
                callback(res);
            }
        });
    }
}

var readData = function (callback) {
    var response = {};
    fs.readFile(__dirname + '/candidates.json', 'utf8', function (err, data) {
        var jsonData;
        if (err) {
            if (callback && typeof callback === 'function') {
                response.status = 'ERROR';
                response.error = err;
                callback(respone);
            } else {
                console.error('Write call failed')
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

var writeData = function (jsonData, callback) {
    var response = {};
    fs.writeFile(__dirname + '/candidates.json', JSON.stringify(jsonData), function (err) {
        if (err) {
            response.status = 'ERROR';
            response.error = err;
            if (callback && typeof callback === 'function') {
                callback(response);
            } else {
                console.error(err);
            }
        }
        if (callback && typeof callback === 'function') {
            response.status = 'SUCCESS';
            response.result = {};
            callback(response);
        }
    });
}

module.exports = { CandidateDAO, writeData, readData };