import { IsNumber } from 'class-validator';

export class DeletePostVideoParam {
  @IsNumber()
  postId: number;
}
