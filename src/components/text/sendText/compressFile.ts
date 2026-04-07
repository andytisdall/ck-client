import imageCompression from "browser-image-compression";

export const compressImage = async (imageFile: File) => {
  const compressedFile = await imageCompression(imageFile, {
    maxSizeMB: 0.5,
    fileType: "image/jpeg",
  });

  return compressedFile;
};
