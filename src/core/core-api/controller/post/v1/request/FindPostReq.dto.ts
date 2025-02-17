import { IsNumber } from 'class-validator';

export class FindPostParam {
  @IsNumber()
  postId: number;
}
