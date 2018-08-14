const twilio = require('twilio');
const { object, string } = require('yup');
const getHtml = require('./client/ui');

const inputSchema = object().shape({
  user: string().required(),
  password: string().required(),
  to: string().required(),
  from: string().required(),
  message: string().required(),
});

module.exports.run = async (event = {}, context = {}, callback) => {
  const ctx = JSON.parse(context);

  if (ctx.method === 'POST') {
    const e = JSON.parse(event);
    const payload = inputSchema.cast({
      to: e.to || process.env.to,
      from: e.from || process.env.from,
      user: e.user || process.env.user,
      password: e.password || process.env.password,
      message: e.message,
    });

    try {
      await inputSchema.validate(payload)
      sendSms(payload, callback);
    } catch (err) {
      callback(err, 'there was an error');
    }

  } else {
    callback(null, getHtml());
  }
};

async function sendSms(payload = {}, callback) {
  try {
    const { to, from, user, password, message } = payload;
    const client = new twilio(user, password);

    await client.messages.create({
      to,
      from,
      body: message,
    });

    callback(null, 'message sent');
  } catch (err) {
    callback(err, 'there was an error');
  }
}
