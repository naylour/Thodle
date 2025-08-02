import getPath from "./getPath";
import s3 from "./instance";

export default async (file: File | Bun.BunFile, path: string = '/') => {
    const fileName = file.name ?? Bun.randomUUIDv7();
    const uploadPath = getPath(path, fileName);

    if (!uploadPath) return null;

    const fileType = file.type;

    const result = await s3.write(uploadPath, file, {
        type: fileType,
    })

    return result
};
