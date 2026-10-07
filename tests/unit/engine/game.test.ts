/** Public engine actions, collision, promotion, clearing and terminal play. */
import { expect, it } from 'vitest';
import { Game } from '../../../src/engine/game';
import { sequenceSource } from '../../support/piece-source';
import { ground, lockGrounded, moveTo } from '../../support/scenarios';
it('starts with separate empty board, centered active and consumed preview',()=>{
 const game=new Game(sequenceSource(['T','I'])); const s=game.snapshot();
 expect(s.active).toEqual({kind:'T',orientation:0,x:3,y:0}); expect(s.preview).toBe('I'); expect(s.board.flat().every(c=>c===null)).toBe(true); expect(s.status).toBe('running');
});
it('reaching the floor stays active, blocked soft drop does not lock, next tick does',()=>{
 const game=new Game(sequenceSource(['O','T','I']));
 game.advance(18000); expect(game.snapshot().active?.y).toBe(18); expect(game.snapshot().board.flat().filter(Boolean)).toHaveLength(0);
 const resting=game.snapshot(); game.action('down'); expect(game.snapshot()).toEqual(resting);
 game.advance(999); expect(game.snapshot()).toEqual(resting); game.advance(1);
 expect(game.snapshot().board.flat().filter(Boolean)).toHaveLength(4); expect(game.snapshot().active?.kind).toBe('T'); expect(game.snapshot().preview).toBe('I');
});
it('allows horizontal movement on the floor without postponing locking',()=>{
 const game=new Game(sequenceSource(['O','T','I'])); ground(game); game.advance(900); game.action('left'); game.advance(100);
 expect(game.snapshot().board[19]).toEqual([null,null,null,'O','O',null,null,null,null,null]); expect(game.snapshot().active?.kind).toBe('T');
});
it('moving off a stack makes the scheduled tick descend instead of lock',()=>{
 const game=new Game(sequenceSource(['O','I','T','Z'])); lockGrounded(game); ground(game);
 expect(game.snapshot().active?.y).toBe(16); game.advance(999); moveTo(game,0); game.advance(1);
 expect(game.snapshot().active?.y).toBe(17); expect(game.snapshot().board.flat().filter(Boolean)).toHaveLength(4);
});
it('legal grounded rotation can free descent while preserving the next tick',()=>{
 const game=new Game(sequenceSource(['I','T','Z'])); game.action('rotate'); ground(game); expect(game.snapshot().active?.y).toBe(16);
 game.advance(900); for(let i=0;i<3;i++) game.action('rotate'); game.advance(100);
 expect(game.snapshot().active).toEqual({kind:'I',orientation:0,x:3,y:17}); expect(game.snapshot().board.flat().filter(Boolean)).toHaveLength(0);
});
it('rejects wall movement and no-kick rotation without changing timing or state',()=>{
 const game=new Game(sequenceSource(['I','O','Z'])); game.action('rotate'); moveTo(game,-2); game.advance(900);
 const before=game.snapshot(); game.action('left'); game.action('rotate'); expect(game.snapshot()).toEqual(before);
 game.advance(100); expect(game.snapshot().active?.y).toBe(1);
});
it('fills and simultaneously clears two rows through five legal O placements',()=>{
 const game=new Game(sequenceSource(['O','O','O','O','O','T','I']));
 for(const x of [0,2,4,6,8]) { moveTo(game,x); ground(game); if(x===8) expect(game.snapshot().board.flat().filter(Boolean)).toHaveLength(16); game.advance(1000); }
 expect(game.snapshot().board.flat().every(c=>c===null)).toBe(true); expect(game.snapshot().active).toEqual({kind:'T',orientation:0,x:3,y:0}); expect(game.snapshot().preview).toBe('I');
});
it('preserves residual time across promotion and elapsed partitions',()=>{
 const kinds=Array(10).fill('O') as 'O'[]; const a=new Game(sequenceSource(kinds)), b=new Game(sequenceSource(kinds));
 a.advance(19123.25); for(const ms of [0.25,123,9000,10000]) b.advance(ms);
 expect(b.snapshot()).toEqual(a.snapshot()); expect(a.snapshot().active?.y).toBe(0);
 a.advance(876.75); expect(a.snapshot().active?.y).toBe(1);
});
it('blocked spawn ends play without an illegal active piece; terminal commands are no-ops',()=>{
 const game=new Game(sequenceSource(Array(12).fill('O')));
 for(let i=0;i<10;i++) lockGrounded(game);
 const final=game.snapshot(); expect(final.status).toBe('game-over'); expect(final.active).toBeNull(); expect(final.board.flat().filter(Boolean)).toHaveLength(40); expect(final.preview).toBe('O');
 for(const action of ['left','right','down','rotate'] as const) game.action(action); game.advance(100000); expect(game.snapshot()).toEqual(final);
});
