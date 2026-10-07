import { expect,it } from 'vitest';
import { Game } from '../../../src/engine/game';
import { sequenceSource } from '../../support/piece-source';
import { CLEAR_RECIPES,place } from '../../support/clears';
import { ground,lockGrounded,moveTo } from '../../support/scenarios';
it.each([1,2,3,4] as const)('awards the literal base score for a final %i-row clear',rows=>{
 const recipe=CLEAR_RECIPES[rows], game=new Game(sequenceSource([...recipe.map(p=>p.kind),'T','I']));
 for(const p of recipe.slice(0,-1)){place(game,p);game.advance(1000);}
 place(game,recipe[recipe.length-1]!);const before=game.snapshot();game.advance(1000);const after=game.snapshot();
 expect(after.lines-before.lines).toBe(rows);expect(after.score-before.score).toBe([0,100,300,500,800][rows]);expect(after.level).toBe(1);
});
it('does not award points for drops, moves, rejected actions or zero-row locks',()=>{
 const game=new Game(sequenceSource(['O','O','I']));ground(game);game.action('down');game.action('left');game.action('rotate');expect(game.snapshot().score).toBe(0);
 game.advance(1000);expect(game.snapshot()).toMatchObject({score:0,lines:0,level:1});
});
it('scores a clear crossing ten lines at its pre-clear level, then uses the new level',()=>{
 const recipe=[...Array.from({length:4},()=>CLEAR_RECIPES[2]).flat(),...CLEAR_RECIPES[4],...CLEAR_RECIPES[2]];
 const game=new Game(sequenceSource([...recipe.map(p=>p.kind),'T','I']));
 for(const [index,p] of recipe.entries()){
  place(game,p);game.advance(1000);
  if(index===19)expect(game.snapshot()).toMatchObject({lines:8,score:1200,level:1});
  if(index===29)expect(game.snapshot()).toMatchObject({lines:12,score:2000,level:2});
 }
 expect(game.snapshot()).toMatchObject({lines:14,score:2600,level:2});
});

it('preserves earned progression on rejected actions, zero-row locks and game over',()=>{
 const recipe=CLEAR_RECIPES[2];
 const game=new Game(sequenceSource([...recipe.map(p=>p.kind),'I',...Array(12).fill('O')]));
 for(const p of recipe){place(game,p);game.advance(1000);}
 expect(game.snapshot()).toMatchObject({score:300,lines:2,level:1});
 game.action('rotate');moveTo(game,-2);const before=game.snapshot();
 game.action('left');game.action('rotate');expect(game.snapshot()).toEqual(before);
 lockGrounded(game);for(let i=0;i<10;i++)lockGrounded(game);
 const final=game.snapshot();expect(final).toMatchObject({score:300,lines:2,level:1,status:'game-over'});
 game.action('down');game.advance(100000);expect(game.snapshot()).toEqual(final);
});
