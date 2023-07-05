export default () => ({
  DB: 'mongodb+srv://Arwaabdelrahem:AOlKUPBeQqrPHpOr@cluster1.bgufy1w.mongodb.net/flowers?retryWrites=true&w=majority',
  // DB: 'mongodb://localhost:27017/online-judge',
  jwtSecret: 'secretKey',
  kafka: {
    brokers: ['localhost:29092'],
  },

  RMQ: {
    urls: [
      'amqps://rapqgxps:q-ksczNI3rVXuwiJg0BbnfkUNabqySYk@toad.rmq.cloudamqp.com/rapqgxps',
    ],
  },
});
