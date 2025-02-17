import { IsNumber } from 'class-validator';

export class DeletePostPlateParam {
  @IsNumber()
  postId: number;
}
