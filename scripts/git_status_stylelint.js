const gitStatus = require('git-status');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
gitStatus( (err, data) => {
     let files = [];
    for(let i = 0, len = data.length; i < len; i++){
        const item = data[i],
            to = item.to;
        if(to.startsWith('build') || to.startsWith('dist') || to.startsWith('test') || to.startsWith('scripts')) continue;
        if(!/\.css$/.test(to) && !/\.scss/.test(to)) continue;
        files.push(to);
    }
    if(files.length === 0) return;
    console.log(files);
    const cmd = spawn('node_modules/.bin/stylelint', files, { stdio: [0,1,2] });
    cmd.on('exit', (code) => {
        if(code == 0){
            console.log('It is OK');
            return;
        }
        console.log('Something is error');
    })
})