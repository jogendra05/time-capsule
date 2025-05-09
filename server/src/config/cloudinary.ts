import { v2 as cloudinary } from 'cloudinary';
import { config as loadEnv } from 'dotenv';

loadEnv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,
});

export default cloudinary;

export async function uploadImage(filePath: string) {
  return cloudinary.uploader.upload(filePath, { folder: 'time_capsules' });
}