export class FindPostFoamResult {
  constructor(
    readonly id: number,
    readonly plateBetweenPCBFoam: boolean,
    readonly bottomSwitchPEFoam: boolean,
    readonly bottomFoam: boolean,
    readonly tapeMod: boolean,
    readonly remark: string | null,
  ) {}
}
