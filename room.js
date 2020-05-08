class Room {
	constructor() {
		this.peers      = {};
		this.transports = {};
		this.producers  = [];
		this.consumers  = [];

		this.cleanupInterval = 1000;

		/* Cleanup job */
		this.cleanupJob = setInterval(this.cleanup, this.cleanupInterval);
	}

	markPeer(peerId) {
		this.peers[peerId].lastSeenTs = Date.now();
	}

	hasPeer(peerId) {
		if (this.peers[peerId])
			return true;
		else return false;
	}

	getPeerList() {
		return { peers: this.peers };
	}

	cleanup() {
		let now = Date.now();
		Object.entries(this.peers).forEach(([id, p]) => {
			if ((now - p.lastSeenTs) > config.httpPeerStale) {
				console.log(`removing stale peer ${id}`);
				this.closePeer(id);
			}
		});
	}
	
	closePeer(peerId) {
		console.log('closing peer', peerId);

		for (let [id, transport] of Object.entries(this.transports)) {
			if (transport.appData.peerId === peerId) {
				this.closeTransport(transport);
			}
		}
		delete roomState.peers[peerId];
	}	

	closeTransport(transport) {
		console.log('closing transport', transport.id, transport.appData);
		try {
			await transport.close();

			delete this.transports[transport.id];
		} catch (e) {
			console.error(e);
		}
	}

	closeProducer(producer) {
		console.log('closing producer', producer.id, producer.appData);
		try {
			await producer.close();

			this.producers = roomState.producers
				.filter((p) => p.id !== producer.id);
			}
		} catch (e) {
			console.error(e);
		}
	}

	closeConsumer(consumer) {
		console.log('closing consumer', consumer.id, consumer.appData);
		await consumer.close();

		this.consumers = this.consumers.filter((c) => c.id !== consumer.id);
	}
}

const room = new Room();

module.exports = room;
