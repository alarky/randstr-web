import * as charactors from './charactors'
import {IAppState} from "./types";
import Random from "./random";

export default class RandomString {
    public static generate(state: IAppState): string[] {
        let c = '';
        if (state.useLowers)
            c += charactors.LOWERS;
        if (state.useUppers)
            c += charactors.UPPERS;
        if (state.useDigits)
            c += charactors.DIGITS;
        if (state.useExclamationMark)
            c += charactors.EXCLAMATION_MARK;
        if (state.useDoubleQuotationMark)
            c += charactors.DOUBLE_QUOTATION_MARK;
        if (state.useNumberSign)
            c += charactors.NUMBER_SIGN;
        if (state.useDollarSign)
            c += charactors.DOLLAR_SIGN;
        if (state.usePercentSign)
            c += charactors.PERCENT_SIGN;
        if (state.useAmpersandSign)
            c += charactors.AMPERSAND_SIGN;
        if (state.useApostrophe)
            c += charactors.APOSTROPHE;
        if (state.useLeftParenthesis)
            c += charactors.LEFT_PARENTHESIS;
        if (state.useRightParenthesis)
            c += charactors.RIGHT_PARENTHESIS;
        if (state.useAsterisk)
            c += charactors.ASTERISK;
        if (state.usePlusSign)
            c += charactors.PLUS_SIGN;
        if (state.useComma)
            c += charactors.COMMA;
        if (state.useMinusSign)
            c += charactors.MINUS_SIGN;
        if (state.usePeriod)
            c += charactors.PERIOD;
        if (state.useSlash)
            c += charactors.SLASH;
        if (state.useColon)
            c += charactors.COLON;
        if (state.useSemicolon)
            c += charactors.SEMICOLON;
        if (state.useLessThanSign)
            c += charactors.LESS_THAN_SIGN;
        if (state.useEqualSign)
            c += charactors.EQUAL_SIGN;
        if (state.useGreaterThanSign)
            c += charactors.GREATER_THAN_SIGN;
        if (state.useQuestionMark)
            c += charactors.QUESTION_MARK;
        if (state.useCommercialAtSign)
            c += charactors.COMMERCIAL_AT_SIGN;
        if (state.useLeftSquareBracket)
            c += charactors.LEFT_SQUARE_BRACKET;
        if (state.useBackslash)
            c += charactors.BACKSLASH;
        if (state.useRightSquareBracket)
            c += charactors.RIGHT_SQUARE_BRACKET;
        if (state.useSpacingCircumflexAccent)
            c += charactors.SPACING_CIRCUMFLEX_ACCENT;
        if (state.useSpacingUnderscore)
            c += charactors.SPACING_UNDERSCORE;
        if (state.useSpacingGraveAccent)
            c += charactors.SPACING_GRAVE_ACCENT;
        if (state.useLeftBrace)
            c += charactors.LEFT_BRACE;
        if (state.useVerticalBar)
            c += charactors.VERTICAL_BAR;
        if (state.useRightBrace)
            c += charactors.RIGHT_BRACE;
        if (state.useTildeAccent)
            c += charactors.TILDE_ACCENT;

        if (!c.length) {
            return [];
        }

        let strs: string[] = [];
        for (let i = 0; i < state.count; i++) {
            const r = Random.randStr(c, state.length);
            strs.push(r);
        }

        return strs;
    }
}