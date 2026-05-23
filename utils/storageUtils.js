const path = require('path');
const crypto = require('crypto');
const supabaseAdmin = require('../config/supabaseAdmin');

const PRODUCT_IMAGES_BUCKET = process.env.PRODUCT_IMAGES_BUCKET || 'product-images';
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const sanitizeSegment = (value) => value.replace(/[^a-zA-Z0-9-_]/g, '-');

const getFileExtension = (fileName, contentType) => {
  const extension = path.extname(fileName).toLowerCase();

  if (extension) {
    return extension;
  }

  const mimeMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
  };

  return mimeMap[contentType] || '';
};

const decodeBase64Image = (imageBase64) => {
  const cleanedBase64 = imageBase64.includes(',')
    ? imageBase64.split(',').pop()
    : imageBase64;

  return Buffer.from(cleanedBase64, 'base64');
};

const uploadProductImage = async ({ fileName, contentType, imageBase64, folder = 'products' }) => {
  const imageBuffer = decodeBase64Image(imageBase64);

  if (!imageBuffer.length) {
    throw new Error('Uploaded image is empty or invalid');
  }

  if (imageBuffer.length > MAX_IMAGE_SIZE_BYTES) {
    throw new Error('Image size must not exceed 5MB');
  }

  const extension = getFileExtension(fileName, contentType);
  const safeFolder = sanitizeSegment(folder || 'products');
  const fileId = crypto.randomUUID();
  const storagePath = `${safeFolder}/${fileId}${extension}`;

  const { error } = await supabaseAdmin.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(storagePath, imageBuffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .getPublicUrl(storagePath);

  return {
    bucket: PRODUCT_IMAGES_BUCKET,
    path: storagePath,
    publicUrl: data.publicUrl,
    size: imageBuffer.length,
  };
};

module.exports = {
  PRODUCT_IMAGES_BUCKET,
  uploadProductImage,
};
