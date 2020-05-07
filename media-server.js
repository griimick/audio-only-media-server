const config      = require('./config');
const mediasoup   = require('mediasoup');

const mediaCodecs = config.mediasoup.router.mediaCodecs;

let worker, router;

/* Create one worker and a router in it for now */
async function start() {
	worker = await mediasoup.createWorker({
		logLevel: config.mediasoup.worker.logLevel,
		logTags: config.mediasoup.worker.logTags,
		rtcMinPort: config.mediasoup.worker.rtcMinPort,
		rtcMaxPort: config.mediasoup.worker.rtcMaxPort,
	});

	worker.on('died', () => {
		console.error('mediasoup worker died (Fatal error. Kill server.)');
		process.exit(1);
	});

	let router = await worker.createRouter({ mediaCodecs });
}


module.exports = { 
	start
};
