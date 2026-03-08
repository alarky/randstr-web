import {IAppState} from "./types";

const DEFAULT_COUNT = 12;
const DEFAULT_LENGTH = 16;

export default class Appstate implements IAppState {
    count: number;
    length: number;

    useLowers: boolean;
    useUppers: boolean;
    useDigits: boolean;
    useSymbols: boolean;
    useExclamationMark: boolean;
    useDoubleQuotationMark: boolean;
    useNumberSign: boolean;
    useDollarSign: boolean;
    usePercentSign: boolean;
    useAmpersandSign: boolean;
    useApostrophe: boolean;
    useLeftParenthesis: boolean;
    useRightParenthesis: boolean;
    useAsterisk: boolean;
    usePlusSign: boolean;
    useComma: boolean;
    useMinusSign: boolean;
    usePeriod: boolean;
    useSlash: boolean;
    useColon: boolean;
    useSemicolon: boolean;
    useLessThanSign: boolean;
    useEqualSign: boolean;
    useGreaterThanSign: boolean;
    useQuestionMark: boolean;
    useCommercialAtSign: boolean;
    useLeftSquareBracket: boolean;
    useBackslash: boolean;
    useRightSquareBracket: boolean;
    useSpacingCircumflexAccent: boolean;
    useSpacingUnderscore: boolean;
    useSpacingGraveAccent: boolean;
    useLeftBrace: boolean;
    useVerticalBar: boolean;
    useRightBrace: boolean;
    useTildeAccent: boolean;

    hasChanged: boolean;
    randStrings: string[];

    constructor() {
        const url = new URL(window.location.href);
        const params = url.searchParams;

        this.count = parseInt(params.get('c') || '') || DEFAULT_COUNT;
        this.length = parseInt(params.get('l') || '') || DEFAULT_LENGTH;

        const f = params.get('f');
        const flags: boolean[] = f ? f.split('').map((val: string, idx: number): boolean => {
            return !!parseInt(val);
        }) : [];

        this.useLowers = flags.length ? flags.shift() || false : true;
        this.useUppers = flags.length ? flags.shift() || false : true;
        this.useDigits = flags.length ? flags.shift() || false : true;
        this.useSymbols = flags.length ? flags.shift() || false : false;
        this.useExclamationMark = flags.length ? flags.shift() || false : false;
        this.useDoubleQuotationMark = flags.length ? flags.shift() || false : false;
        this.useNumberSign = flags.length ? flags.shift() || false : false;
        this.useDollarSign = flags.length ? flags.shift() || false : false;
        this.usePercentSign = flags.length ? flags.shift() || false : false;
        this.useAmpersandSign = flags.length ? flags.shift() || false : false;
        this.useApostrophe = flags.length ? flags.shift() || false : false;
        this.useLeftParenthesis = flags.length ? flags.shift() || false : false;
        this.useRightParenthesis = flags.length ? flags.shift() || false : false;
        this.useAsterisk = flags.length ? flags.shift() || false : false;
        this.usePlusSign = flags.length ? flags.shift() || false : false;
        this.useComma = flags.length ? flags.shift() || false : false;
        this.useMinusSign = flags.length ? flags.shift() || false : false;
        this.usePeriod = flags.length ? flags.shift() || false : false;
        this.useSlash = flags.length ? flags.shift() || false : false;
        this.useColon = flags.length ? flags.shift() || false : false;
        this.useSemicolon = flags.length ? flags.shift() || false : false;
        this.useLessThanSign = flags.length ? flags.shift() || false : false;
        this.useEqualSign = flags.length ? flags.shift() || false : false;
        this.useGreaterThanSign = flags.length ? flags.shift() || false : false;
        this.useQuestionMark = flags.length ? flags.shift() || false : false;
        this.useCommercialAtSign = flags.length ? flags.shift() || false : false;
        this.useLeftSquareBracket = flags.length ? flags.shift() || false : false;
        this.useBackslash = flags.length ? flags.shift() || false : false;
        this.useRightSquareBracket = flags.length ? flags.shift() || false : false;
        this.useSpacingCircumflexAccent = flags.length ? flags.shift() || false : false;
        this.useSpacingUnderscore = flags.length ? flags.shift() || false : false;
        this.useSpacingGraveAccent = flags.length ? flags.shift() || false : false;
        this.useLeftBrace = flags.length ? flags.shift() || false : false;
        this.useVerticalBar = flags.length ? flags.shift() || false : false;
        this.useRightBrace = flags.length ? flags.shift() || false : false;
        this.useTildeAccent = flags.length ? flags.shift() || false : false;

        this.hasChanged = false;
        this.randStrings = [];
    }

    public static save(state: IAppState) {
        const flags = [
            state.useLowers,
            state.useUppers,
            state.useDigits,
            state.useSymbols,
            state.useExclamationMark,
            state.useDoubleQuotationMark,
            state.useNumberSign,
            state.useDollarSign,
            state.usePercentSign,
            state.useAmpersandSign,
            state.useApostrophe,
            state.useLeftParenthesis,
            state.useRightParenthesis,
            state.useAsterisk,
            state.usePlusSign,
            state.useComma,
            state.useMinusSign,
            state.usePeriod,
            state.useSlash,
            state.useColon,
            state.useSemicolon,
            state.useLessThanSign,
            state.useEqualSign,
            state.useGreaterThanSign,
            state.useQuestionMark,
            state.useCommercialAtSign,
            state.useLeftSquareBracket,
            state.useBackslash,
            state.useRightSquareBracket,
            state.useSpacingCircumflexAccent,
            state.useSpacingUnderscore,
            state.useSpacingGraveAccent,
            state.useLeftBrace,
            state.useVerticalBar,
            state.useRightBrace,
            state.useTildeAccent,
        ];
        let f = '';
        for (let i = 0; i < flags.length; i++) {
            f += flags[i] ? '1' : '0';
        }

        const params = new URLSearchParams();
        params.set('c', ''+state.count);
        params.set('l', ''+state.length);
        params.set('f', f);
        window.history.replaceState('', '', '?' + params.toString());
    }

}