import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const MailConfig = {
  transport: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    auth: {
      user: 'nepalguideapp@gmail.com',
      pass: 'uyzltjjbtfqifewl',
    },
  },
  defaults: {
    from: '"No Reply" <no-reply@localhost>',
  },
  template: {
    dir: 'dist/utils/emailTemplates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};

export default MailConfig;
