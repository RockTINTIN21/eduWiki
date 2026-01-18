import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const getMailConfig = async (
  configService: ConfigService,
): Promise<any> => {
  const transport = configService.getOrThrow<string>('MAIL_TRANSPORT');
  const mailFromName = configService.getOrThrow<string>('MAIL_FROM_NAME');
  const mailFromAddress = transport.split(':')[1].split('//')[1];

  return {
    transport,
    defaults: {
      from: `"${mailFromName}" <${mailFromAddress}>`,
    },
    template: {
      dir: join(process.cwd(), 'src', 'mail', 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: false,
      },
    },
  };
};
