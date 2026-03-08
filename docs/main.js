const LOWERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';

const SYMBOLS_ROW1 = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/'];
const SYMBOLS_ROW2 = [':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
const ALL_SYMBOLS = [...SYMBOLS_ROW1, ...SYMBOLS_ROW2];

const DEFAULT_COUNT = 12;
const DEFAULT_LENGTH = 16;
const DEFAULT_SYMBOL_MAX = 20;

// --- Random ---

function randChar(pool) {
  const ints = new Uint32Array(1);
  crypto.getRandomValues(ints);
  return pool[Math.floor(ints[0] / (2 ** 32 / pool.length))];
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

function randStr(alphaPool, symbolPool, symbolMax, length) {
  if (!alphaPool.length && !symbolPool.length) return '';
  if (!symbolPool.length) return randStrSimple(alphaPool, length);
  if (!alphaPool.length) return randStrSimple(symbolPool, length);

  const maxSymbolCount = Math.max(0, Math.floor(length * symbolMax / 100));
  const combined = alphaPool + symbolPool;
  let symbolCount = 0;
  let result = '';
  for (let i = 0; i < length; i++) {
    if (symbolCount >= maxSymbolCount) {
      result += randChar(alphaPool);
    } else {
      const ch = randChar(combined);
      if (symbolPool.includes(ch)) symbolCount++;
      result += ch;
    }
  }
  return result;
}

// --- URL State ---
// Format: ?c=12&l=16&ch=aA0&sym=all&sm=20
//   ch: a=lowercase, A=uppercase, 0=digits
//   sym: all=all symbols, or individual chars (e.g. !%23%24)
//   sm: symbol max % (omitted when default)

function loadState() {
  const params = new URLSearchParams(location.search);

  const cParam = params.get('c');
  const lParam = params.get('l');
  const count = cParam !== null ? parseInt(cParam) || 0 : DEFAULT_COUNT;
  const length = lParam !== null ? parseInt(lParam) || 0 : DEFAULT_LENGTH;
  const smParam = params.get('sm');
  const symbolMax = smParam !== null ? parseInt(smParam) || 0 : DEFAULT_SYMBOL_MAX;

  const ch = params.get('ch');
  const useLowers = ch !== null ? ch.includes('a') : true;
  const useUppers = ch !== null ? ch.includes('A') : true;
  const useDigits = ch !== null ? ch.includes('0') : true;

  const sym = params.get('sym');
  const symbols = {};
  if (sym === null) {
    ALL_SYMBOLS.forEach(s => { symbols[s] = false; });
  } else if (sym === 'all') {
    ALL_SYMBOLS.forEach(s => { symbols[s] = true; });
  } else {
    ALL_SYMBOLS.forEach(s => { symbols[s] = sym.includes(s); });
  }

  const useSymbols = ALL_SYMBOLS.every(s => symbols[s]);

  return { count, length, useLowers, useUppers, useDigits, useSymbols, symbols, symbolMax };
}

function saveState(data) {
  const params = new URLSearchParams();
  params.set('c', '' + data.count);
  params.set('l', '' + data.length);

  let ch = '';
  if (data.useLowers) ch += 'a';
  if (data.useUppers) ch += 'A';
  if (data.useDigits) ch += '0';
  params.set('ch', ch);

  const activeSymbols = ALL_SYMBOLS.filter(s => data.symbols[s]);
  if (activeSymbols.length === ALL_SYMBOLS.length) {
    params.set('sym', 'all');
  } else if (activeSymbols.length > 0) {
    params.set('sym', activeSymbols.join(''));
  }

  if (data.symbolMax !== DEFAULT_SYMBOL_MAX) {
    params.set('sm', '' + data.symbolMax);
  }

  history.replaceState('', '', '?' + params.toString());
}

// --- Alpine Component ---

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
    copiedIndex: -1,
    _copiedTimer: null,

    generate() {
      let alphaPool = '';
      if (this.useLowers) alphaPool += LOWERS;
      if (this.useUppers) alphaPool += UPPERS;
      if (this.useDigits) alphaPool += DIGITS;
      const symbolPool = ALL_SYMBOLS.filter(s => this.symbols[s]).join('');

      this.results = [];
      if (!alphaPool.length && !symbolPool.length) return;
      const count = Math.max(0, this.count || 0);
      const len = Math.max(0, this.length || 0);
      for (let i = 0; i < count; i++) {
        this.results.push(randStr(alphaPool, symbolPool, this.symbolMax, len));
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

    copy(s, i, event) {
      navigator.clipboard.writeText(s);
      this.copiedIndex = i;
      clearTimeout(this._copiedTimer);
      this._copiedTimer = setTimeout(() => { this.copiedIndex = -1; }, 1000);

      const toast = document.createElement('span');
      toast.textContent = 'Copied!';
      toast.className = 'toast';
      event.currentTarget.appendChild(toast);
      setTimeout(() => toast.remove(), 800);
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
