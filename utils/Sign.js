let polyfill = n => {
  if (n > 0) return 1;
  if (n < 0) return -1;
  return 0;
};

export default class Sign {
  static of = Math.sign || polyfill;
  static random = () => {
    return Math.round(Math.random()) === 1 ? 1 : -1;
  };
}
