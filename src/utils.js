
const {RECAPTCHA_SECRET, TEST_RECAPTCHA_SECRET, MAILGUN_API_KEY} = require('./secrets');

const axios = require('axios');
const mongoose = require('mongoose');

const mailgun = require('mailgun-js')({apiKey: MAILGUN_API_KEY, domain: 'mail.thmix.org'});

const env = process.env.NODE_ENV;

exports.verifyRecaptcha = async function(recaptcha, ip) {
  // @ts-ignore
  const res = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
    params: {
      secret: env === 'development' ? TEST_RECAPTCHA_SECRET : RECAPTCHA_SECRET,
      response: recaptcha,
      remoteip: ip,
    },
  });
  return res.data.success;
};

exports.verifyObjectId = function(objectId) {
  return (typeof objectId === 'string') && mongoose.Types.ObjectId.isValid(objectId);
};

exports.emptyHandle = () => {};

const sendEmail = function(fromName, fromAddr, toAddr, subject, text) {
  return mailgun.messages().send({
    from: `${fromName} <${fromAddr}>`,
    to: toAddr,
    subject, text,
  });
};

exports.sendCodeEmail = function(userName, userEmail, action, code) {
  const text = `Dear ${userName},

Here is the Code you need to ${action}:

${code}

This email was generated because of an attempt from your account.

The Code is required to complete the action. No one can complete the action using your account without also accessing this email.

If you are not attempting to ${action}, please change your password and consider changing your email password to ensure account security.

Sincerely,
The Touhou Mix Team

https://thmix.org/help`;

  return sendEmail('Touhou Mix Support', 'no-reply@mail.thmix.org', userEmail, 'Your Touhou Mix account: Attempt to ' + action, text);
};

exports.filterUndefinedKeys = function(obj) {
  return Object.keys(obj).reduce((acc, cur) => {
    if (obj[cur] !== undefined) acc[cur] = obj[cur];
    return acc;
  }, {});
};
