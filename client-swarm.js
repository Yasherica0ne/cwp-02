let N = process.argv[2];
const childProcess = require('child_process').exec;
for(let i =0;i<N;i++){
    childProcess('node client.js', (err, sout, serr) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(`Client: ${i}`);
        console.log(sout);
    });
}