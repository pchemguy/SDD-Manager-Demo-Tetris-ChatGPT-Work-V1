/** Browser-independent gameplay contracts. Snapshots are detached read-only values. */
export const KINDS = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'] as const;
export type Kind = typeof KINDS[number];
export type Orientation = 0 | 1 | 2 | 3;
export interface Cell { readonly x: number; readonly y: number }
export interface Piece extends Cell { readonly kind: Kind; readonly orientation: Orientation }
export type Grid = (Kind | null)[][];
export type Action = 'left' | 'right' | 'rotate' | 'down' | 'hard-drop';
export type Status = 'running' | 'paused' | 'game-over';
export interface PieceSource { next(): Kind }
export interface Snapshot {
  readonly board: readonly (readonly (Kind | null)[])[];
  readonly active: Piece | null;
  readonly ghost: Piece | null;
  readonly preview: Kind;
  readonly status: Status;
  readonly score: number;
  readonly lines: number;
  readonly level: number;
}
