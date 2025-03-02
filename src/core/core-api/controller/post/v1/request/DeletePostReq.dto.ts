import { IsNumber } from 'class-validator';

export class DeletePostParam {
  @IsNumber()
  postId: number;
}
