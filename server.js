const net = require('net');
const fs = require('fs');
const port = 8124;

const clientStartStr = 'QA';
const serverAcceptStr = 'ACK';
const serverDeclineStr = 'DEC';
let seed = 0;

function GetAnswer()
{
    return Math.random() > 0.5 ? 'good' : 'bad';
}

const logger = fs.createWriteStream('client_id.txt');

const server = net.createServer((client) => {
    client.id = Date.now() + seed++;
    logger.write('Client connected id: ' + client.id + '\n');
    let isStartingConnection = true;
    client.setEncoding('utf8');

    client.on('data', (data) => {
        if(isStartingConnection)
        {
            if(data === clientStartStr)
            {
                client.write(serverAcceptStr);
                isStartingConnection = false;
            }
            else
            {
                client.write(serverDeclineStr);
                client.write('close');
            }
        }
        else
        {
            logger.write(data + '\n');
            client.write(GetAnswer());
        }
  });

  client.on('end', () => logger.write(`Client ${client.id} disconnected\n`));

});

server.listen(port, () => {
    logger.write(`Server listening on localhost:${port}\n`);
});