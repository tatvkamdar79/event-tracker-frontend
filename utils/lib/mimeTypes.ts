type AllowedFileTypes = {
  [mime: string]: string;
};

const allowedTypes: AllowedFileTypes = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "application/pdf": "pdf",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/webm": "webm",
  "video/mp4": "mp4",
  "video/mpeg": "mpeg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
};

export const getMimeType = (input: string): string | undefined => {
  const query = input.toLowerCase();
  return Object.entries(allowedTypes).find(
    ([mime, ext]) => mime.includes(query) || ext.includes(query)
  )?.[0];
};
