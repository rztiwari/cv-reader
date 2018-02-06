var fs = require('fs');
var {CandidateDAO, writeData, readData} = require('../../server/dao/candidateDAO');

var assert = require('assert');

before(function(done = function(response){}) {
   writeData({"data":[{"jobId":"JOB12","data":[{"candidateId":1,"candidateName":"Candidate 1","step":"step1"},{"candidateId":1,"candidateName":"Candidate 1","step":"step1"},{"candidateId":2,"candidateName":"Candidate 10","step":"step2"},{"candidateId":3,"candidateName":"Candidate 2","step":"step3"},{"candidateId":4,"candidateName":"Candidate 3","step":"step4"},{"candidateId":5,"candidateName":"Candidate 4","step":"step1"},{"candidateId":6,"candidateName":"Candidate 5","step":"step2"},{"candidateId":7,"candidateName":"Candidate 6","step":"step3"},{"candidateId":8,"candidateName":"Candidate 7","step":"step4"},{"candidateId":9,"candidateName":"Candidate 8","step":"step1"},{"candidateId":10," candidateName":"Candidate 9","step":"step2"},{"candidateId":11,"candidateName":"Candidate 11","step":"step1"}]},{"jobId":"JOB13","data":[{"candidateId":1,"candidateName":"Candidate 1","step":"step1"},{"candidateId":1,"candidateName":"Candidate 1","step":"step1"},{"candidateId":2,"candidateName":"Candidate 10","step":"step2"},{"candidateId":3,"candidateName":"Candidate 2","step":"step3"},{"candidateId":4,"candidateName":"Candidate 3","step":"step4"},{"candidateId":5,"candidateName":"Candidate 4","step":"step1"},{"candidateId":6,"candidateName":"Candidate 5","step":"step2"},{"candidateId":7,"candidateName":"Candidate 6","step":"step3"},{"candidateId":8,"candidateName":"Candidate 7","step":"step4"},{"candidateId":9,"candidateName":"Candidate 8","step":"step1"},{"candidateId":10," candidateName":"Candidate 9","step":"step2"},{"candidateId":11,"candidateName":"Candidate 11","step":"step1"}]},{"jobId":"JOB14","data":[{"candidateId":1,"candidateName":"Candidate 1","step":"step1"},{"candidateId":1,"candidateName":"Candidate 1","step":"step1"},{"candidateId":2,"candidateName":"Candidate 10","step":"step2"},{"candidateId":3,"candidateName":"Candidate 2","step":"step3"},{"candidateId":4,"candidateName":"Candidate 3","step":"step4"},{"candidateId":5,"candidateName":"Candidate 4","step":"step1"},{"candidateId":6,"candidateName":"Candidate 5","step":"step2"},{"candidateId":7,"candidateName":"Candidate 6","step":"step3"},{"candidateId":8,"candidateName":"Candidate 7","step":"step4"},{"candidateId":9,"candidateName":"Candidate 8","step":"step1"},{"candidateId":10," candidateName":"Candidate 9","step":"step2"},{"candidateId":11,"candidateName":"Candidate 11","step":"step1"}]},{"jobId":"JOB15","data":[{"candidateId":1,"candidateName":"Candidate 1","step":"step1"},{"candidateId":1,"candidateName":"Candidate 1","step":"step1"},{"candidateId":2,"candidateName":"Candidate 10","step":"step2"},{"candidateId":3,"candidateName":"Candidate 2","step":"step3"},{"candidateId":4,"candidateName":"Candidate 3","step":"step4"},{"candidateId":5,"candidateName":"Candidate 4","step":"step1"},{"candidateId":6,"candidateName":"Candidate 5","step":"step2"},{"candidateId":7,"candidateName":"Candidate 6","step":"step3"},{"candidateId":8,"candidateName":"Candidate 7","step":"step4"},{"candidateId":9,"candidateName":"Candidate 8","step":"step1"},{"candidateId":10," candidateName":"Candidate 9","step":"step2"},{"candidateId":11,"candidateName":"Candidate 11","step":"step1"}]},{"jobId":"JOB16","data":[{"candidateId":1,"candidateName":"Candidate 1","step":"step1"},{"candidateId":1,"candidateName":"Candidate 1","step":"step1"},{"candidateId":2,"candidateName":"Candidate 10","step":"step2"},{"candidateId":3,"candidateName":"Candidate 2","step":"step3"},{"candidateId":4,"candidateName":"Candidate 3","step":"step4"},{"candidateId":5,"candidateName":"Candidate 4","step":"step1"},{"candidateId":6,"candidateName":"Candidate 5","step":"step2"},{"candidateId":7,"candidateName":"Candidate 6","step":"step3"},{"candidateId":8,"candidateName":"Candidate 7","step":"step4"},{"candidateId":9,"candidateName":"Candidate 8","step":"step1"},{"candidateId":10," candidateName":"Candidate 9","step":"step2"},{"candidateId":11,"candidateName":"Candidate 11","step":"step1"}]}]}, done);
});
  
after(function() {

});

describe('Check Read DAO functions', function() {
    describe('getAllJobIds()', function() {
      it('return all jobIds', function(done = function(response){
        assert.equal(response.status, 'SUCCESS');
        assert.equal(response.result.length, 5);
      }) {
        CandidateDAO.getAllJobIds(done);
      });

      it('return all jobIds is an array', function(done = function(response){
        assert.equal(response.status, 'SUCCESS');
        assert.typeOf(response.result, 'array');
      }) {
        CandidateDAO.getAllJobIds(done);
      });

      it('return all jobIds is an array of type number', function(done = function(response){
        assert.equal(response.status, 'SUCCESS');
        assert.typeOf(response.result[0], 'number');
      }) {
        CandidateDAO.getAllJobIds(done);
      });

      it('return all candiates for a jobId', function(done = function(response){
        assert.equal(response.status, 'SUCCESS');
        assert.equal(response.result.data.length, 12);
      }) {
        CandidateDAO.getAllCandidatesByJobId("JOB12", done);
      });

      it('return correct candiate for jobid and candiateid', function(done = function(response){
        assert.equal(response.status, 'SUCCESS');
        assert.equal(response.result.candidateName, "Candidate 11");
      }) {
        CandidateDAO.readCandidateByJobId("JOB12", 11, done);
      });

      it('returns error candiate for correct jobid and wrong candiateid', function(done = function(response){
        assert.equal(response.status, 'ERROR');
        assert.equal(response.result.error, "No Results Found");
      }) {
        CandidateDAO.readCandidateByJobId("JOB12", 15, done);
      });

      it('returns error candiate for wrong jobid and candiateid', function(done = function(response){
        assert.equal(response.status, 'ERROR');
        assert.equal(response.result.error, "No Results Found");
      }) {
        CandidateDAO.readCandidateByJobId("JOB17", 11, done);
      });
    });
});