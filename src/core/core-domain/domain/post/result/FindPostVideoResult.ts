export class FindPostVideoResult {
  constructor(
    readonly id: number,
    readonly youtubeVideoUrl: string,
    readonly youtubeVideoId: string,
    readonly remark: string | null,
  ) {}
}
