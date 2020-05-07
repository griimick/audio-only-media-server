const config      = require('./config');
const express     = require('express');
const https       = require('https');
const fs          = require('fs');
const mediaServer = require('./media-server');

const app = express();
app.use(express.static(__dirname));

async function main() {
	console.log('starting mediasoup');
	mediaServer.start();

	console.log('starting express');
	try {
		const tls = {
			cert: fs.readFileSync(config.sslCrt),
			key: fs.readFileSync(config.sslKey),
		};
		httpsServer = https.createServer(tls, app);
		httpsServer.on('error', (e) => {
			console.error('https server error,', e.message);
		});
		await new Promise((resolve) => {
			httpsServer.listen(config.httpPort, config.httpIp, () => {
				console.log(`server is running and listening on ` +
					`https://${config.httpIp}:${config.httpPort}`);
					resolve();
				});
		});
	} catch (e) {
		if (e.code === 'ENOENT') {
			console.error('no certificates found (check config.js)');
			console.error('could not start https server ... trying http');
		} else {
			err('could not start https server', e);
		}
		app.listen(config.httpPort, config.httpIp, () => {
			console.log(`http server listening on port ${config.httpPort}`);
		});
	}

}

main();
