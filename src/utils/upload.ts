import { RNS3 } from 'react-native-s3-upload';

export const uploadImageOnS3 = async (file: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('file', file);
      const uploadFile = {
        // `uri` can also be a file system path (i.e. file://)
        uri: file,
        name: 'image.jpg',
        type: 'image/jpg',
      };
      const options = {
        keyPrefix: 'uploads/',
        bucket: 'rx-runr',
        region: 'us-east-2	',
        accessKey: 'AKIAQ25HIWFLC24VI6UW',
        secretKey: '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',
        successActionStatus: 201,
      };
      const response = await RNS3.put(uploadFile, options);
      console.log('response', response);
      if (response.status !== 201) {
        throw new Error('failed to upload');
      }
      resolve(response.body);
    } catch (error) {
      reject(error);
    }
  });

  //   const s3bucket = new S3({
  //     accessKeyId: 'AKIAQ25HIWFLC24VI6UW',
  //     secretAccessKey: '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',
  //     Bucket: 'rxrunr',
  //     signatureVersion: 'v4',
  //   });
  //   let contentType = 'image/jpeg';
  //   let contentDeposition = 'inline;filename="' + file.name + '"';
  //   const base64 = await fs.readFile(file.uri, 'base64');
  //   const arrayBuffer = decode(base64);
  //   s3bucket.createBucket(() => {
  //     const params = {
  //       Bucket: 'rxrunr',
  //       Key: file.name,
  //       Body: arrayBuffer,
  //       ContentDisposition: contentDeposition,
  //       ContentType: contentType,
  //     };
  //     s3bucket.upload(params, (err, data) => {
  //       if (err) {
  //         console.log('error in callback');
  //       }
  //       console.log('success');
  //       console.log('Respomse URL : ' + data.Location);
  //     });
  //   });
};
