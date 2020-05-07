module.exports = {
	httpIp: '0.0.0.0',
	httpPort: 3000,
	httpPeerStale: 15000,
	sslCrt: 'local.crt',
	sslKey: 'local.key',
	mediasoup: {
		worker: {
			rtcMinPort: 40000,
			rtcMaxPort: 49999,
			logLevel: 'debug',
			logTags: [
				'info',
				'ice',
				'dtls',
				'rtp',
				'srtp',
				'rtcp',
				// 'rtx',
				// 'bwe',
				// 'score',
				// 'simulcast',
				// 'svc'
			],
		},
		router: {
			mediaCodecs:
			[
				{
					kind: 'audio',
					mimeType: 'audio/opus',
					clockRate: 48000,
					channels: 2
				},
			]
		},
		webRtcTransport: {
			listenIps: [
				{ ip: '127.0.0.1', announcedIp: null },
				//{ ip: '10.10.23.101', announcedIp: null },
			],
			initialAvailableOutgoingBitrate: 800000,
		}
	}
};
