import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/s3.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";

class FileStorage {
  /**
   * Generates a unique, URL-safe filename
   */
  generateFileName(originalName) {
    const ext = path.extname(originalName);
    const uniqueSuffix = uuidv4();
    return `${uniqueSuffix}${ext}`;
  }

  /**
   * Uploads a file buffer to the configured storage provider
   */
  async uploadFile(buffer, bucketName, folder, originalName, mimeType) {
    const fileName = this.generateFileName(originalName);
    const key = folder ? `${folder}/${fileName}` : fileName;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    });

    await s3Client.send(command);

    return {
      bucketName,
      objectKey: key,
      originalFilename: originalName,
      mimeType,
      sizeBytes: buffer.length,
    };
  }

  /**
   * Deletes a file from the storage provider
   */
  async deleteFile(bucketName, key) {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3Client.send(command);
  }

  /**
   * Replaces a file by deleting the old one and uploading the new one
   */
  async replaceFile(oldKey, buffer, bucketName, folder, originalName, mimeType) {
    if (oldKey) {
      await this.deleteFile(bucketName, oldKey).catch(err => {
        console.warn(`Failed to delete old file ${oldKey}:`, err.message);
      });
    }

    return await this.uploadFile(buffer, bucketName, folder, originalName, mimeType);
  }

  /**
   * Generates a temporary signed URL for secure access
   */
  async generateSignedUrl(bucketName, key, expiresIn = 3600) {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    return await getSignedUrl(s3Client, command, { expiresIn });
  }
}

export default new FileStorage();
