var fs = require('fs');
var { CandidateDAO, writeData, readData } = require('../../server/dao/candidateDAO');

var assert = require('assert');


describe('Check Write DAO functions', function () {
    before(function (done) {
        writeData({},  function (response) { done();});
    });
    describe('insertNewCandidateByJobId()', function () {
        it('should insert a new record in blank file', function (done) {
            CandidateDAO.insertNewCandidateByJobId("JOB1", { "candidateId": 1, "candidateName": "Candidate 1", "step": "step1" }, function (response) {
                assert.equal(response.status, 'SUCCESS');
                done();
            });
        });
        it('should return 1 jobId', function (done) {
            readData(function (response) {
                assert.equal(response.status, 'SUCCESS');
                assert.equal(response.result.data.length, 1);
                done();
            });
        });
        it('should return same object as inserted', function (done) {
            readData(function (response) {
                assert.equal(response.status, 'SUCCESS');
                assert.deepEqual(response.result, { "data": [{ "jobId": "JOB1", "data": [{ "candidateId": 1, "candidateName": "Candidate 1", "step": "step1" }] }] });
                done();
            });
        });
        it('should be able to insert new data with same jobId', function (done) {
            CandidateDAO.insertNewCandidateByJobId("JOB1", { "candidateId": 2, "candidateName": "Candidate 2", "step": "step2" }, function (response) {
                assert.equal(response.status, 'SUCCESS');
                done();
            });
        });
        it('should return 1 jobId 2 candidates data', function (done) {
            readData(function (response) {
                assert.equal(response.status, 'SUCCESS');
                assert.equal(response.result.data.length, 1);
                assert.equal(response.result.data[0].data.length, 2);
                done();
            });
        });
        it('should be able to insert new data with different jobId', function (done) {
            CandidateDAO.insertNewCandidateByJobId("JOB2", { "candidateId": 2, "candidateName": "Candidate 2", "step": "step2" }, function (response) {
                assert.equal(response.status, 'SUCCESS');
                done();
            });
        });
        it('should return 2 jobIds 2/1 candidates data for each jobId', function (done) {
            readData(function (response) {
                assert.equal(response.status, 'SUCCESS');
                assert.equal(response.result.data.length, 2);
                assert.equal(response.result.data[0].data.length, 2);
                assert.equal(response.result.data[1].data.length, 1);
                done();
            });
        });
        it('should be able to insert new data with different jobId', function (done) {
            CandidateDAO.insertNewCandidateByJobId("JOB3", { "candidateId": 2, "candidateName": "Candidate 2", "step": "step2" }, function (response) {
                assert.equal(response.status, 'SUCCESS');
                done();
            });
        });
        it('should return 3 jobIds 2/1/1 candidates data for each jobId', function (done) {
            readData(function (response) {
                assert.equal(response.status, 'SUCCESS');
                assert.equal(response.result.data.length, 3);
                assert.equal(response.result.data[0].data.length, 2);
                assert.equal(response.result.data[1].data.length, 1);
                assert.equal(response.result.data[1].data.length, 1);
                done();
            });
        });
    });
});