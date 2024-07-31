import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}

  async sendEmail(data, emailTemplate) {
    try {
      // return emailTemplate;
      const response = await this.mailService.sendMail({
        to: data.to,
        from: data.from,
        subject: emailTemplate.subject,
        template: emailTemplate.template,
        // attachments: [
        //   {
        //     filename: 'logo.png',
        //     path: 'dist/utils/emailTemplates/logo.png',
        //     cid: 'imageName',
        //   },
        // ],
        context: {
          data: data,
        },
      });
      return response;
    } catch (e) {
      console.log(e);
      throw new HttpException('Cannot find template', HttpStatus.NOT_FOUND);
    }
  }

  create(createEmailDto: CreateEmailDto) {
    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
