export default () => ({
  DB: 'mongodb+srv://Arwaabdelrahem:qUIqRK0nuE7OjiWi@cluster1.bgufy1w.mongodb.net/online-judge?retryWrites=true&w=majority',
  slackWebhooks:
    'https://hooks.slack.com/services/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',
  jwtSecret: 'secretKey',
  google: {
    clientID:
      '822381817215-monsk018pophl5kgduhgru8t5sbt46kb.apps.googleusercontent.com',
    clientSecret: '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',
    url: ' https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
  },

  facebook: {
    appID: '360583746056838',
    appSecret: '23e15e8079696bfb8649274b0c8ab0df',
    url: 'https://graph.facebook.com/me',
  },

  admin: {
    name: 'admin',
    email: 'admin@flowers.com',
    password: 'flowers@5',
  },

  aws: {
    accessKeyId: 'AKIA5W5XQAXEJGEMSSKG',
    secretAccessKey: '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',
  },

  kafka: {
    brokers: ['localhost:29092'],
  },
});
