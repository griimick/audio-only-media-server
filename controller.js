const room = require('./room-state');

let controller = {};

controller.pingPong = async function (req, res) {

	let { peerId } = req.body;
	try {
		if (room.hasPeer(peerId)) {
			throw new Error('not connected');
		}

		room.markPeer(peerId);

		res.send({
			peers: room.getPeerList(),
		});
	} catch (e) {
		console.error(e.message);
		res.send({ error: e.message });
	}
}

module.exports = controller;
