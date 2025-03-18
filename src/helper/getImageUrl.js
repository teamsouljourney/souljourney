import avatar from "../assets/avatar3.svg";

export const getImageUrl = (imagePath, defaultImage = avatar) => {
  if (!imagePath) return defaultImage;

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const cleanPath = imagePath.startsWith("/")
    ? imagePath.substring(1)
    : imagePath;

  const baseUrl = import.meta.env.VITE_BASE_URL || "";
  const baseUrlWithSlash = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  return `${baseUrlWithSlash}${cleanPath}`;
};

export const getProfileImageUrl = (user, isTherapist = false) => {
  if (!user) return avatar;

  const imagePath = user.image;

  return getImageUrl(imagePath, avatar);
};
