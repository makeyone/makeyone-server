import { Cursor } from 'typeorm-cursor-pagination';

export class CursorPaginationRes {
  constructor(readonly totalResults: number, readonly cursor: Cursor | null) {}
}
