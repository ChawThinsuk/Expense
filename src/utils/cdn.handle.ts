import { CdnResultDTO } from "../dto/result.dto";
import cloudinary from "./cloudinary";

const cloudinaryUpload = (file: any): Promise<CdnResultDTO> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "Expense" },
      (err: any, result: any) => {
        if (err) {
          console.log(err);
          return reject({
            success: false,
            message: "Error uploading to Cloudinary",
          });
        }
        return resolve({
          success: true,
          message: "File uploaded successfully",
          cdnUrl: result?.secure_url,
          publicId: result?.public_id,
        });
      }
    );
    uploadStream.end(file.buffer);
  });
};
const cloudinaryDelete = (publicId: string): Promise<CdnResultDTO> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (err: any, result: any) => {
      if (err) {
        console.log(err);
        return reject({
          success: false,
          message: "Error deleting from Cloudinary",
        });
      }
      if (result?.result === 'ok') {
        return resolve({
          success: true,
          message: "File deleted successfully",
        });
      } else {
        return reject({
          success: false,
          message: "File not found or couldn't be deleted",
        });
      }
    });
  });
};

export { cloudinaryUpload,cloudinaryDelete };
