import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllImages = async () => {
  try {
    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      prefix: 'uploads',
      max_results: 500,
    });
    const images = resources.map((r) => ({
      name: r.public_id.split('/')[1],
      url: cloudinary.url(r.public_id, {
        width: 1080,
        crop: 'scale',
        quality: 'auto:low',
      }),
    }));

    return images || [];
  } catch (e) {
    console.error(`[ERROR] ${JSON.stringify(e, null, 2)}`);
    return [];
  }
};

async function uploadImage(filePath, newFileName) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: newFileName,
      folder: 'uploads',
      overwrite: false,
    });
    // console.log(`[INFO] Uploaded: ${newFileName}`);
    // console.log(`[INFO] URL: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`[ERROR] Upload failed ${newFileName}: ${error.message}`);
    throw error;
  }
}


export { getAllImages, uploadImage };