#!/usr/bin/env node
var os = require('os');
var spawn = require('child_process').spawn;

var platform = os.platform();


if(platform == 'linux'){
    run('npm install images@2.1.8',{
        cwd: require('path').resolve(__dirname, '../..')
    })
}else{
    run('npm' + (platform == 'win32' ? '.cmd' : '') + ' install images',{
        cwd: require('path').resolve(__dirname, '../..')
    })
}

function run(command, opt) {
    var parts = command.split(/\s+/);
    var cmd = parts[0];
    var args = parts.slice(1);
    opt = opt || {};
    opt.stdio = 'inherit';

    spawn(cmd, args, opt);
}