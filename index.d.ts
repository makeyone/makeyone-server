export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'dev' | 'prod' | 'test';
      SERVER_PORT: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      JWT_ACCESS_TOKEN_SECRET_KEY: string;
      JWT_REFRESH_TOKEN_SECRET_KEY: string;
      JWT_ACCESS_TOKEN_EXPIRES_IN: string;
      JWT_REFRESH_TOKEN_EXPIRES_IN: string;
      AWS_S3_URL: string;
      AWS_S3_ACCESS_KEY: string;
      AWS_S3_SECRET_ACCESS_KEY: string;
      AWS_S3_BUCKET_NAME: string;
      AWS_S3_GALLERY_UPLOAD_FOLDER: string;
      AWS_S3_REGION: string;
      AWS_CLOUD_FRONT_RES_URL: string;
    }
  }
}
