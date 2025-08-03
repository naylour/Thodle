import { useS3Config } from '@repo/env/s3';

const config = useS3Config(Bun.env);

const s3 = new Bun.S3Client({
    accessKeyId: config.S3_ACCESS_KEY,
    bucket: config.S3_BUCKET_NAME,
    endpoint: config.S3_API_ENDPOINT,
    secretAccessKey: config.S3_ACCESS_SECRET_KEY,
    // virtualHostedStyle: true
});

export default s3;
