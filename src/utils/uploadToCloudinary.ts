import { v2, type UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";

// Helper function to upload an image buffer to Cloudinary
function uploadToCloudinary(
  buffer: Buffer,
  folder = "posts"
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = v2.uploader.upload_stream(
      {
        folder, // Specify the folder where the image will be stored in Cloudinary
        resource_type: "image", // Specify the resource type as an image
        transformation: [{ quality: "auto" }, { fetch_format: "auto" }], // Optimize image quality and format
      },
      (error, result) => {
        if (error) return reject(error); // Reject the promise if an error occurs
        if (!result) return reject(new Error("Cloudinary returned no result")); // Handle unexpected null result
        resolve(result as UploadApiResponse); // Resolve the promise with the upload result
      }
    );

    // Create a readable stream from the buffer and pipe it to the upload stream
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}
export default uploadToCloudinary;