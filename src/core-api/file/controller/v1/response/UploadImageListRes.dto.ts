import { UploadImageResult } from '@src/core-domain/file/result/UploadImageResult';

export class UploadImageListRes {
  constructor(readonly url: string, readonly originalFileName: string, readonly convertFileName: string) {}

  static of(imageList: UploadImageResult[]): UploadImageListRes[] {
    return imageList.map((image) => new UploadImageListRes(image.url, image.originalFileName, image.convertFileName));
  }
}
