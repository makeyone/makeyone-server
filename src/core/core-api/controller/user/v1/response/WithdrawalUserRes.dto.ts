export class WithdrawalUserRes {
  constructor(readonly withdrawalUserId: number) {}

  static of(withdrawalUserId: number): WithdrawalUserRes {
    return new WithdrawalUserRes(withdrawalUserId);
  }
}
