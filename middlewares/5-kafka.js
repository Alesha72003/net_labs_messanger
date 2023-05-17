const { Kafka } = require("kafkajs")

const kafka = new Kafka({
  clientId: 'producer-notification',
  brokers: ['127.0.0.1:9092'],
});
const producer = kafka.producer();
producer.connect();

module.exports = app => {};
module.exports.send = async (message) => {
  return await producer.send({
    topic: "OnlineSend",
    messages: [
      { value: message}
    ]
  });
}
