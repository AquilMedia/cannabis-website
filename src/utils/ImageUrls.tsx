
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getImageUrl = (path?: string | null): string | null => {
  if (!path) {
    return null; 
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
};
