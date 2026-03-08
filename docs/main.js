const LOWERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';

const SYMBOLS_ROW1 = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/'];
const SYMBOLS_ROW2 = [':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
const ALL_SYMBOLS = [...SYMBOLS_ROW1, ...SYMBOLS_ROW2];

// flags order: useLowers, useUppers, useDigits, useSymbols, then each symbol in ALL_SYMBOLS order
const DEFAULT_COUNT = 12;
const DEFAULT_LENGTH = 16;
const DEFAULT_SYMBOL_MAX = 20;

function randChar(pool) {
  const ints = new Uint32Array(1);
  crypto.getRandomValues(ints);
  return pool[Math.floor(ints[0] / (2 ** 32 / pool.length))];
}

function randStr(alphaPool, symbolPool, symbolMax, length) {
  if (!alphaPool.length && !symbolPool.length) return '';

  // No limit needed if only one pool type
  if (!symbolPool.length) return randStrSimple(alphaPool, length);
  if (!alphaPool.length) return randStrSimple(symbolPool, length);

  const maxSymbolCount = Math.floor(length * symbolMax / 100);
  let symbolCount = 0;
  let result = '';
  for (let i = 0; i < length; i++) {
    const remaining = length - i;
    const symbolsLeft = maxSymbolCount - symbolCount;
    // Must use alpha (symbol limit reached), or can pick from either pool
    if (symbolsLeft <= 0) {
      result += randChar(alphaPool);
    } else {
      // Pick from combined pool, but track symbol usage
      const combined = alphaPool + symbolPool;
      const ch = randChar(combined);
      if (symbolPool.includes(ch)) {
        symbolCount++;
      }
      result += ch;
    }
  }
  return result;
}

function randStrSimple(pool, length) {
  const ints = new Uint32Array(length);
  crypto.getRandomValues(ints);
  const divisor = 2 ** 32 / pool.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += pool[Math.floor(ints[i] / divisor)];
  }
  return result;
}

function loadState() {
  const params = new URLSearchParams(location.search);
  const count = parseInt(params.get('c')) || DEFAULT_COUNT;
  const length = parseInt(params.get('l')) || DEFAULT_LENGTH;

  const f = params.get('f');
  const flags = f ? f.split('').map(v => v === '1') : null;

  const useLowers = flags ? flags[0] : true;
  const useUppers = flags ? flags[1] : true;
  const useDigits = flags ? flags[2] : true;
  const useSymbols = flags ? flags[3] : false;

  const symbols = {};
  ALL_SYMBOLS.forEach((s, i) => {
    symbols[s] = flags ? (flags[4 + i] || false) : false;
  });

  const symbolMax = parseInt(params.get('sm')) || DEFAULT_SYMBOL_MAX;

  return { count, length, useLowers, useUppers, useDigits, useSymbols, symbols, symbolMax };
}

function saveState(data) {
  const flags = [
    data.useLowers, data.useUppers, data.useDigits, data.useSymbols,
    ...ALL_SYMBOLS.map(s => data.symbols[s]),
  ].map(v => v ? '1' : '0').join('');

  const params = new URLSearchParams();
  params.set('c', '' + data.count);
  params.set('l', '' + data.length);
  params.set('f', flags);
  if (data.symbolMax !== DEFAULT_SYMBOL_MAX) {
    params.set('sm', '' + data.symbolMax);
  }
  history.replaceState('', '', '?' + params.toString());
}

function randstr() {
  const state = loadState();

  return {
    count: state.count,
    length: state.length,
    useLowers: state.useLowers,
    useUppers: state.useUppers,
    useDigits: state.useDigits,
    useSymbols: state.useSymbols,
    symbolMax: state.symbolMax,
    symbols: state.symbols,
    symbolsRow1: SYMBOLS_ROW1,
    symbolsRow2: SYMBOLS_ROW2,
    results: [],

    generate() {
      let alphaPool = '';
      if (this.useLowers) alphaPool += LOWERS;
      if (this.useUppers) alphaPool += UPPERS;
      if (this.useDigits) alphaPool += DIGITS;
      let symbolPool = '';
      ALL_SYMBOLS.forEach(s => {
        if (this.symbols[s]) symbolPool += s;
      });

      this.results = [];
      if (!alphaPool.length && !symbolPool.length) return;
      for (let i = 0; i < this.count; i++) {
        this.results.push(randStr(alphaPool, symbolPool, this.symbolMax, this.length));
      }
    },

    hasAnySymbol() {
      return ALL_SYMBOLS.some(s => this.symbols[s]);
    },

    onChange() {
      saveState(this);
      this.generate();
    },

    toggleAllSymbols() {
      const checked = this.useSymbols;
      ALL_SYMBOLS.forEach(s => { this.symbols[s] = checked; });
      this.onChange();
    },

    toggleSymbol(s, checked) {
      this.symbols[s] = checked;
      const allSame = ALL_SYMBOLS.every(sym => this.symbols[sym] === this.symbols[ALL_SYMBOLS[0]]);
      if (allSame) {
        this.useSymbols = this.symbols[ALL_SYMBOLS[0]];
      }
      this.onChange();
    },

    reset() {
      history.replaceState('', '', location.pathname);
      this.count = DEFAULT_COUNT;
      this.length = DEFAULT_LENGTH;
      this.useLowers = true;
      this.useUppers = true;
      this.useDigits = true;
      this.useSymbols = false;
      this.symbolMax = DEFAULT_SYMBOL_MAX;
      ALL_SYMBOLS.forEach(s => { this.symbols[s] = false; });
      this.generate();
    },
  };
}
