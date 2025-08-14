
export const encryptData = (data: any): string => {
  try {
    return btoa(JSON.stringify(data)); 
  } catch (err) {
    console.error("Encryption error:", err);
    return '';
  }
};

export const decryptData = (encryptedData: string): any => {
  try {
    return JSON.parse(atob(encryptedData)); 
  } catch (err) {
    console.error("Decryption error:", err);
    return null;
  }
};
