// Cloudinary Direct Unsigned Upload Service

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

const STORAGE_KEY = "portfolio_cloudinary_config";

export const getCloudinaryConfig = (): CloudinaryConfig => {
  const envCloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "lqkstvuu";
  const envPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "portfolio_uploads";

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          cloudName: envCloud || parsed.cloudName || "lqkstvuu",
          uploadPreset: envPreset || parsed.uploadPreset || "portfolio_uploads",
        };
      } catch {
        // ignore
      }
    }
  }

  return {
    cloudName: envCloud,
    uploadPreset: envPreset,
  };
};

export const saveCloudinaryConfig = (config: CloudinaryConfig) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
};

/**
 * Uploads an image file directly to Cloudinary using an unsigned upload preset.
 * Reports percentage progress via onProgress callback.
 */
export const uploadToCloudinary = (
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ secure_url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const { cloudName, uploadPreset } = getCloudinaryConfig();

    if (!cloudName.trim() || !uploadPreset.trim()) {
      reject(
        new Error(
          "Cloudinary is not configured yet! Please enter your Cloud Name and Upload Preset in Admin Settings, or paste an image URL directly."
        )
      );
      return;
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName.trim()}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset.trim());

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve({
            secure_url: response.secure_url,
            public_id: response.public_id,
          });
        } catch (err) {
          reject(new Error("Failed to parse Cloudinary response"));
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          reject(new Error(errRes.error?.message || `Upload failed with status ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error during Cloudinary upload. Check internet connection and Cloudinary settings."));
    };

    xhr.send(formData);
  });
};
