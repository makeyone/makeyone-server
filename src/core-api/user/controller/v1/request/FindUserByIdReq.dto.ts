import { IsNumber } from 'class-validator';

export class FindUserByIdParam {
  @IsNumber()
  userId: number;
}
