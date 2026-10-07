/** Finite controlled source; exhaustion is explicit rather than recycling test data. */
import type { Kind, PieceSource } from '../../src/engine/types';
export function sequenceSource(kinds: readonly Kind[]): PieceSource {
 let index=0;
 return { next() { const kind=kinds[index++]; if(kind===undefined) throw new Error('Test source exhausted'); return kind; } };
}
