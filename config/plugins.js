module.exports = ({ env }) => ({
  email: {
    config: {
      provider: env("EMAIL_PROVIDER"),
      providerOptions: {
        host: env("EMAIL_SMTP_HOST", "smtp.example.com"),
        port: env("EMAIL_SMTP_PORT", 587),
        auth: {
          user: env("EMAIL_SMTP_USER"),
          pass: env("EMAIL_SMTP_PASS"),
        },
      },
    },
    settings: {
      defaultFrom: env("EMAIL_ADDRESS_FROM"),
      defaultReplyTo: env("EMAIL_ADDRESS_REPLY"),
    },
  },
  graphql: {
    config: {
      apolloServer: {
        tracing: false,
        bodyParserConfig: {
          limit: "256mb",
          formLimit: "256mb",
          jsonLimit: "256mb",
          textLimit: "256mb",
          xmlLimit: "256mb",
        },
      },
      defaultLimit: 99999999,
    },
  },
  meilisearch: {
    config: {
      // Your meili host
      host: "https://ms-678a78f5e34e-3511.sfo.meilisearch.io",
      // Your master key or private key
      apiKey: "2abc87e8860f98067bf726c6c8f828e12e328d42",
    },
  },
});
