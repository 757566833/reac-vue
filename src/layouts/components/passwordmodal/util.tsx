export const colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];
/**
 *
 * @param {string} p
 * @return {number}
 */
export const mesureStrength = (p: string):number=> {
  let force = 0;
  // eslint-disable-next-line no-useless-escape
  const regex = /[$-/:-?{-~!"^_`\[\]]/g; // "

  const lowerLetters = /[a-z]+/.test(p);
  const upperLetters = /[A-Z]+/.test(p);
  const numbers = /[0-9]+/.test(p);
  const symbols = regex.test(p);

  const flags = [lowerLetters, upperLetters, numbers, symbols];
  const passedMatches = flags.filter((item) => item).length;

  force += 2 * p.length + (p.length >= 10 ? 1 : 0);
  force += passedMatches * 10;

  // penality (short password)
  force = p.length <= 6 ? Math.min(force, 10) : force;

  // penality (poor variety of characters)
  force = passedMatches === 1 ? Math.min(force, 10) : force;
  force = passedMatches === 2 ? Math.min(force, 20) : force;
  force = passedMatches === 3 ? Math.min(force, 40) : force;

  return force;
};
export const getColor=(s: number)=> {
  let idx = 0;
  if (s <= 10) {
    idx = 0;
  } else if (s <= 20) {
    idx = 1;
  } else if (s <= 30) {
    idx = 2;
  } else if (s <= 40) {
    idx = 3;
  } else {
    idx = 4;
  }

  return { idx: idx + 1, col: colors[idx] };
};
