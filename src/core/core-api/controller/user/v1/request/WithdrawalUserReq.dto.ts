import { IsNumber } from 'class-validator';

export class WithdrawalUserParam {
  @IsNumber()
  userId: number;
}
