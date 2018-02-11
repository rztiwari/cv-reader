// var express = require('express');
// var app = express();
// var inspect = require('util').inspect;
// var bodyParser = require('body-parser');
// var Busboy = require('busboy');
// var fs = require('fs');
// var request = require('request');
// var WordExtractor = require('word-extractor');

// var PDFDataParser = require('./pdf-reader');
// var DOCXParser = require('./word-docx-parser');
// var { CandidateDAO } = require('./dao/candidateDAO');

// // app.use('/static', express.static(__dirname + '/build/static'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get('/main', function (req, res) {
//   res.sendFile(__dirname + '/build/index.html');
// });

// app.post('/upload/cv', function (req, res) {

//   var tags = ['Java', 'Javascript', 'React', 'Redux', 'PMP', 'Agile', 'FE', 'Full Stack', 'JSP', 'Servlet', 'Spring'],
//     name, jobid, client, role, tagList = '', response;

//   if (req.method === 'POST') {
//     var writeStream, buffs = [];
//     var busboy = new Busboy({ headers: req.headers });
//     var parser;
//     busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
//       switch (fieldname) {
//         case 'name':
//           name = val;
//           break;
//         case 'jobid':
//           jobid = val;
//           break;
//         case 'client':
//           client = val;
//           break;
//         case 'role':
//           role = val;
//           break;
//       }
//     });
//     busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
//       if (filename) {
//         if (filename.toLowerCase().endsWith('.pdf')) {
//           parser = PDFDataParser;
//         } else if (filename.toLowerCase().endsWith('.docx')) {
//           parser = DOCXParser;
//         }
//       }

//       var dir = __dirname + '/uploads';
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, 0744);
//       }

//       writeStream = fs.createWriteStream(__dirname + '/uploads/' + filename);
//       file.on('data', function (data) {
//         buffs.push(data);
//       });
//       file.on('end', function () {
//         var buf = Buffer.concat(buffs);
//         if (parser) {
//           parser.readData(buf, function (text) {
//             if (text) {
//               for (var i = 0, l = tags.length; i < l; i++) {
//                 if (text.toLowerCase().indexOf(tags[i].toLocaleLowerCase()) > 0) {
//                   tagList = tagList + (tagList ? ' #' : '#') + tags[i];
//                 }
//               };
//             }
//             var dataToSend = {
//               'name': name,
//               'role': role,
//               'jobid': jobid, 
//               'client': client,
//               'skillsTag': tagList
//             }
//             var newUrl = req.protocol + '://' + req.get('host') + '/candidate/' + jobid;
//             request({
//               method: 'POST',
//               url: newUrl,
//               json: dataToSend
//             }, function (error, response, body) {
//               if (!error && response.statusCode == 200) {
//                 res.json(body);
//               }
//             });
//           });
//         }
//         if (writeStream) {
//           writeStream.write(buf);
//           writeStream.close();
//         }
//       });
//     });
//     busboy.on('finish', function () {
//     });
//     req.pipe(busboy);
//   }

// });

// app.get('/candidate/:jobid/:candidateid', function (req, res) {
//   CandidateDAO.readCandidateByJobId(parseInt(req.params.candidateid, 10), req.params.jobid, function (response) {
//     if (response.status === 'SUCCESS') {
//       var candidate = response.result;
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(candidate));
//     } else {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify({ error: response.error }));
//     }
//   });
// });

// app.delete('/candidate/:jobid/:candidateid', function (req, res) {
//   CandidateDAO.deleteCandidateInJobId(req.params.jobid, parseInt(req.params.candidateid, 10), function (response) {
//     if (response.status === 'SUCCESS') {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify({ status: 'SUCCESS' }));
//     } else {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify({ error: response.error }));
//     }
//   });
// });

// app.delete('/job/:jobid/', function (req, res) {
//   CandidateDAO.deleteJobId(req.params.jobid, function (response) {
//     if (response.status === 'SUCCESS') {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify({ status: 'SUCCESS' }));
//     } else {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify({ error: response.error }));
//     }
//   });
// });

// app.post('/candidate/:jobid/', function (req, res) {
//   var candidate = req.body;
//   if (candidate && typeof candidate === 'object') {
//     CandidateDAO.insertNewCandidateByJobId(req.params.jobid, candidate, function (response) {
//       if (response.status === 'SUCCESS') {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(JSON.stringify(candidate));
//       } else {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(JSON.stringify({ error: response.error }));
//       }
//     });
//   }
// });

// app.listen(4000, () => console.log('Example app listening on port 3000!'));