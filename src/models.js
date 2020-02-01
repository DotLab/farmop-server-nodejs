// @ts-nocheck

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

exports.Fan = mongoose.model('Fan', {
  room_id: ObjectId,
  equip_id: ObjectId,
  equip_type: String,
  timestamp: Date,
  unit: String,
  rel_humidity: Number,
});

exports.serializeUser = function(user) {
  const {
    id,
    name, joinedDate, seenDate, bio, avatarUrl,
    playCount, totalScores, maxCombo, accuracy,
    totalPlayTime, weightedPp, ranking, sCount, aCount, bCount, cCount, dCount, fCount,
  } = user;
  return {
    id,
    name, joinedDate, seenDate, bio, avatarUrl,
    playCount, totalScores, maxCombo, accuracy,
    totalPlayTime, weightedPp, ranking, sCount, aCount, bCount, cCount, dCount, fCount,
  };
};

exports.createDefaultUser = function() {
  return {
    name: '',
    email: '',
    salt: '',
    hash: '',
    // meta
    joinedDate: null,
    seenDate: null,
    bio: '',
    avatarUrl: '',
    avatarPath: '',
    // cached
  };
};

exports.Task = mongoose.model('Task', {
  assigner: ObjectId,
  assignee: ObjectId,

  location: String,
  date: Date,
  totalPp: Number,
  level: Number,
  title: String,
  status: String,
  type: String,
});


exports.createDefaultMidi = function() {
  return {
    uploaderId: null,
    uploaderName: '',
    uploaderAvatarUrl: '',

    name: '',
    desc: '',
    hash: '',
    path: '',
    artistName: '',
    artistUrl: '',
    // meta
    uploadedDate: null,
    approvedDate: null,
    status: 'PENDING',
    // source
    sourceArtistName: '',
    sourceAlbumName: '',
    sourceSongName: '',

    touhouAlbumIndex: -1,
    touhouSongIndex: -1,
    // comments
    comments: [],
    // cached
    records: [],

    trialCount: 0,
    upCount: 0,
    downCount: 0,
    loveCount: 0,

    avgScore: 0,
    avgCombo: 0,
    avgAccuracy: 0,

    passCount: 0,
    failCount: 0,

    sCutoff: 0,
    aCutoff: 0,
    bCutoff: 0,
    cCutoff: 0,
    dCutoff: 0,
  };
};


exports.Notification = mongoose.model('notification', {
  receiverId: ObjectId,
  title: String,
  location: String,
  status: String,
  date: Date(),
});

exports.Issue = mongoose.model('issue', {
  creatorId: ObjectId,
  title: String,
  location: String,
  status: String,
  date: Date(),
});
