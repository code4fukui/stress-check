const parse = (s) => {
  const res = [];
  let type = 0; // 0: num, 1: var
  let temp = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const n = "0123456789".indexOf(c);
    if (n >= 0) {
      temp = temp * 10 + n;
    } else if (c == "+" || c == "-" || c == "(" || c == ")") {
      if (temp) {
        res.push([type, temp]);
        type = 0;
        temp = 0;
      }
      res.push(c);
    } else if (c == "N") {
      type = 1;
    } else {
      throw new Error("illegal char: " + c);
    }
  }
  if (temp) {
    res.push([type, temp]);
  }
  return res;
};

const calc1 = (tokens, n) => {
  const p = tokens.shift();
  if (p == null) throw new Error("no tokens");
  if (p == "(") {
    return execute(tokens, n);
  } else if (Array.isArray(p)) {
    if (p[0] == 0) {
      return p[1];
    } else {
      return n[p[1] - 1];
    }
  } else {
    throw new Error("illegal token: ", p);
  }
};

const execute = (tokens, n) => {
  let res = calc1(tokens, n);
  for (;;) {
    const op = tokens.shift();
    if (op == null || op == ")") break;
    if (Array.isArray(op)) throw new Error("illegal operator: ", op);
    const num = calc1(tokens, n);
    if (op == "+") {
      res += num;
    } else if (op == "-") {
      res -= num;
    }
  }
  return res;
};

export const calcPoint = (s, n) => {
  const tokens = parse(s);
  const res = execute(tokens, n);
  return res;
};
