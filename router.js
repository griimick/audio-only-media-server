const express = require('express')
const router  = express.Router()
const controller = require('./controller');

/* Polling endpoint */
router.post('/ping', controller.pingPong);

/* Room */
/* For now only one room
router.post('/room/create', controller.createRoom);
router.post('/room/delte', controller.deleteRoom);
*/

/* Peer */
router.post('/peer/join', controller.joinPeer);
router.post('/peer/leave', controller.leavePeer);

/* Transport */
router.post('/transport/create', controller.createTransport);
router.post('/transport/connect', controller.connectTransport);
router.post('/transport/close', controller.closeTransport);

/* Producer for peers who send media */
router.post('/producer/create', controller.createProducer);
router.post('/producer/pause', controller.pauseProducer);
router.post('/producer/resume', controller.resumeProducer);
router.post('/producer/close', controller.closeProducer);

/* Consumer for peers who recv media */
router.post('/consumer/create', controller.createConsumer);
router.post('/consumer/pause', controller.pauseConsumer);
router.post('/consumer/resume', controller.resumeConsumer);
router.post('/consumer/close', controller.closeConsumer);

module.exports = router;
