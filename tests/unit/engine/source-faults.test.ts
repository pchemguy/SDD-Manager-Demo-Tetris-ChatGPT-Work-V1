/** Runtime source contracts are validated even when external code violates TypeScript types. */
import {expect,it} from 'vitest';
import {Game} from '../../../src/engine/game';
import type {Kind} from '../../../src/engine/types';
import {sequenceSource} from '../../support/piece-source';
import {ground} from '../../support/scenarios';
it.each([undefined,null,'X',42])('invalid preview %s is rejected at consumption',value=>{
 let n=0;expect(()=>new Game({next:()=>++n===1?'O':value as Kind})).toThrow('piece');
});
it('invalid promoted preview is rejected instead of entering a snapshot',()=>{
 const game=new Game(sequenceSource(['O','T','X' as Kind]));ground(game);expect(()=>game.advance(1000)).toThrow('piece');expect(game.snapshot().preview).toBe('T');
});
