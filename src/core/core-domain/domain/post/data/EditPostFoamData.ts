export class EditPostFoamData {
  constructor(
    readonly plateBetweenPCBFoam: boolean,
    readonly bottomSwitchPEFoam: boolean,
    readonly bottomFoam: boolean,
    readonly tapeMod: boolean,
    readonly remark?: string,
  ) {}
}
