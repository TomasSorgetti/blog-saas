import { StoragePort } from "../ports/storage.port.js";
import AWS from "aws-sdk";

export class S3StorageAdapter extends StoragePort {
  constructor(config) {
    super();
    this.bucket = config.env.AWS_S3_BUCKET;
    this.s3 = new AWS.S3({
      accessKeyId: config.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.env.AWS_SECRET_ACCESS_KEY,
      region: config.env.AWS_REGION,
    });
  }

  async upload(file, filename) {
    const params = {
      Bucket: this.bucket,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };
    await this.s3.upload(params).promise();
    return filename;
  }

  async delete(filename) {
    const params = {
      Bucket: this.bucket,
      Key: filename,
    };
    await this.s3.deleteObject(params).promise();
  }

  getUrl(filename) {
    return `https://${this.bucket}.s3.amazonaws.com/${filename}`;
  }
}
