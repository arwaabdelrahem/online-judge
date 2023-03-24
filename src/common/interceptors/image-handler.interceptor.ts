// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { S3 } from 'aws-sdk';
// import { ManagedUpload } from 'aws-sdk/clients/s3';
// import * as crypto from 'crypto';
// import { extname } from 'path';

// @Injectable()
// export class ImageHandler implements NestInterceptor {
//   constructor(private _configService: ConfigService) {}

//   async intercept(context: ExecutionContext, next: CallHandler) {
//     const request = context.switchToHttp().getRequest();

//     // const appUrl = this.getUrl(request);
//     // const uploadsFolder = path.join('uploads');

//     // console.log('request.files ====>', request.files);
//     if (request.file || request.files?.length) {
//       for (const file in request.files) {
//         const originalImgUrl = await this.upload(request.files[file]);
//         // this.imageFileFilter(request.files[file]);

//         // const fileName = this.editFileName(request.files[file]);

//         // const originalImgUrl = `${appUrl}${uploadsFolder}/${fileName}`;

//         request.files = [
//           {
//             original: originalImgUrl,
//             thumbnail: originalImgUrl,
//           },
//         ];
//       }

//       // console.log('files', request.files);
//     }

//     return next.handle();
//   }

//   async upload(file: Express.Multer.File) {
//     const name = crypto.randomBytes(12).toString('hex');
//     const ext = extname(file.originalname);

//     const originalname = `${name}${ext}`;
//     const { mimetype } = file;
//     const bucketS3 = 'flowers-aws-bucket';
//     const res: ManagedUpload.SendData = await this.uploadS3(
//       file.buffer,
//       bucketS3,
//       originalname,
//       mimetype,
//     );

//     return res.Location;
//   }

//   async uploadS3(file: Buffer, bucket: string, name: string, mimetype: string) {
//     const s3 = this.getS3();
//     const params = {
//       Bucket: bucket,
//       Key: String(name),
//       Body: file,
//       ACL: 'public-read',
//       ContentType: mimetype,
//       ContentDisposition: 'inline',
//     };

//     const data = await s3.upload(params).promise();

//     return data;

//     // return new Promise((resolve, reject) => {
//     //   s3.upload(params, (err, data: ManagedUpload.SendData) => {
//     //     if (err) {
//     //       console.log('ERROR', err);

//     //       reject(err.message);
//     //     }

//     //     resolve(data);
//     //   });
//     // });
//   }

//   getS3() {
//     return new S3({
//       accessKeyId: this._configService.get('aws.accessKeyId'),
//       secretAccessKey: this._configService.get('aws.secretAccessKey'),
//     });
//   }

//   // private getUrl(request) {
//   //   const url = new URL(`https://cryptic-sierra-40893.herokuapp.com/`);

//   //   if (process.env.NODE_ENV !== 'production') {
//   //     url.host = request.get('host');
//   //     url.protocol = request.protocol;
//   //   }

//   //   return url;
//   // }

//   // private imageFileFilter(file) {
//   //   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//   //     throw new BadRequestException('Only image files are allowed!');
//   //   }

//   //   return file;
//   // }

//   // private editFileName(file) {
//   //   const name = file.filename.split('.')[0];
//   //   const ext = extname(file.filename);

//   //   return `${name}${ext}`;
//   // }
// }
