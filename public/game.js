"use strict";
import {promisify} from './utils.js';
{
  const PRIME_OPTS = {
    algorithm: {
      name: 'PRIMEINC',
      workers: -1
    }
  };
  const makePrime = promisify((bits,cb) => forge.prime.generateProbablePrime(bits,PRIME_OPTS,cb));

  onload = () => newGame();

  async function newGame() {
    const problem = await newProblem(128);
    console.log( problem );
    render(Game(), document.querySelector('main'));
  }

  async function newPrimes(bits) {
    const p = (await makePrime(bits)).toString().slice(1);
    const q = (await makePrime(bits)).toString().slice(1);
    return {p,q};
  }

  async function newProblem(bits) {
    const {p,q} = await newPrimes(bits);
    const n = bigInt(p).times(bigInt(q)).toString(10); 
    return {p,q,n};
  }

  function Game() {
    return R`
      <table>
       OK 
      </table>
    `;
  }
}
