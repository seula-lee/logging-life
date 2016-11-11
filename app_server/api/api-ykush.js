var express = require('express');
var http = require('http');
var exec = require('child_process').exec; // 시스템 명령을 동작시키기 위한 객체 선언.
var cmd = '';

module.exports.exec = function(){
  http.createServer(function(req,res){
          cmd = 'ls';
          res.writeHead(200,{'Content-Type':'text/plain'});

          exec(cmd, function(error, stdout, stderr) {
                  res.end(stdout);
          });
  }).listen(8000);//8000 포트를 연다.
}
