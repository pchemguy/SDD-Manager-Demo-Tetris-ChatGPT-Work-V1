/** Scenarios exercise public actions/time; they never replace private game state. */
import type { Game } from '../../src/engine/game';
export function moveTo(game: Game, x: number): void {
 for(let i=0;i<10;i++) { const p=game.snapshot().active; if(!p||p.x===x) return; game.action(p.x>x?'left':'right'); }
 if(game.snapshot().active?.x!==x) throw new Error('Scenario position unreachable');
}
export function ground(game: Game): void { for(let i=0;i<20;i++) game.action('down'); }
export function lockGrounded(game: Game): void { ground(game); game.advance(1000); }
