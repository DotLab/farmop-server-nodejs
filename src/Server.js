const debug = require('debug')('thmix:Server');

const Session = require('./Session');

const VERSION = 0;

module.exports = class Server {
  constructor(io, storage, tempPath) {
    /** @type {import('socket.io').Server} */
    this.io = io;
    this.storage = storage;
    this.tempPath = tempPath;

    this.bucketName = 'thmix-static';
    /** @type {import('@google-cloud/storage').Bucket} */
    this.bucket = storage.bucket(this.bucketName);

    /** @type {Object.<string, Session>} */
    this.sessions = {};
    this.version = VERSION;

    io.on('connection', (socket) => {
      debug('onConnection', socket.id);
      this.sessions[socket.id] = new Session(this, socket);
    });
  }

  /**
   * @param {string} socketId
   */
  endSession(socketId) {
    if (typeof this.sessions[socketId] === 'object') {
      this.sessions[socketId].socket.disconnect();
    } else debug('ending mal-formed session', socketId);
    delete this.sessions[socketId];
  }

  bucketUploadPublic(file, destination) {
    return this.bucket.upload(file, {
      destination,
      metadata: {
        gzip: true,
        cacheControl: 'public, max-age=31536000',
        acl: [{entity: 'allUsers', role: this.storage.acl.READER_ROLE}],
      },
    });
  }

  bucketUploadPrivate(file, destination) {
    return this.bucket.upload(file, {destination});
  }

  bucketGetPublicUrl(path) {
    return 'https://storage.googleapis.com/' + this.bucketName + path;
  }
};
