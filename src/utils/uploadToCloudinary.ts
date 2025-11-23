import { v2, type UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";

// Helper function to upload an image buffer to Cloudinary
function uploadToCloudinary(
  buffer: Buffer, // get the buffer from multer (req.file.buffer)
  folder = "posts"
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = v2.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary returned no result"));
        resolve(result as UploadApiResponse);
      }
    );

    // Create a readable stream from the buffer and pipe it to the upload stream
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}
export default uploadToCloudinary;