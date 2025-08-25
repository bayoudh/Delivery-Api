import cloudinary from '../config/cloudinary.js'; // make sure this exports `v2` instance

// Extract public ID from Cloudinary URL
function extractPublicId(url: string) {
  // remove query params if exist
  const cleanUrl = url.split('?')[0];
  // take the part after /upload/
  const parts = cleanUrl.split('/upload/')[1];
  // drop versioning (like v123456)
  const withoutVersion = parts.replace(/v[0-9]+\//, '');
  // remove extension
  return withoutVersion.substring(0, withoutVersion.lastIndexOf('.'));
}

// Delete image from Cloudinary
export async function deleteImage(imageUrl: string) {
  try {
    const publicId = extractPublicId(imageUrl);
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('Deleted:', result);
    return result;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}
export default deleteImage;