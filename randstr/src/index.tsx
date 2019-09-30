import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as charactors from "./charactors";
import Random from './random';

const DEFAULT_COUNT = 12;
const DEFAULT_LENGTH = 16;

interface IAppProps {
}

interface IAppState {
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

    randStrings: string[]
}

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);

        this.state = {
            count: DEFAULT_COUNT,
            length: DEFAULT_LENGTH,

            useLowers: true,
            useUppers: true,
            useDigits: true,
            useSymbols: false,
            useExclamationMark: false,
            useDoubleQuotationMark: false,
            useNumberSign: false,
            useDollarSign: false,
            usePercentSign: false,
            useAmpersandSign: false,
            useApostrophe: false,
            useLeftParenthesis: false,
            useRightParenthesis: false,
            useAsterisk: false,
            usePlusSign: false,
            useComma: false,
            useMinusSign: false,
            usePeriod: false,
            useSlash: false,
            useColon: false,
            useSemicolon: false,
            useLessThanSign: false,
            useEqualSign: false,
            useGreaterThanSign: false,
            useQuestionMark: false,
            useCommercialAtSign: false,
            useLeftSquareBracket: false,
            useBackslash: false,
            useRightSquareBracket: false,
            useSpacingCircumflexAccent: false,
            useSpacingUnderscore: false,
            useSpacingGraveAccent: false,
            useLeftBrace: false,
            useVerticalBar: false,
            useRightBrace: false,
            useTildeAccent: false,

            randStrings: [],
        };
    }

    componentDidMount() {
        this.generate();
    }

    generate() {
        let c = '';
        if (this.state.useLowers) {
            c += charactors.LOWERS;
        }
        if (this.state.useUppers) {
            c += charactors.UPPERS;
        }
        if (this.state.useDigits) {
            c += charactors.DIGITS;
        }

        if (this.state.useExclamationMark) {
            c += charactors.EXCLAMATION_MARK;
        }
        if (this.state.useDoubleQuotationMark) {
            c += charactors.DOUBLE_QUOTATION_MARK;
        }
        if (this.state.useNumberSign) {
            c += charactors.NUMBER_SIGN;
        }
        if (this.state.useDollarSign) {
            c += charactors.DOLLAR_SIGN;
        }
        if (this.state.usePercentSign) {
            c += charactors.PERCENT_SIGN;
        }
        if (this.state.useAmpersandSign) {
            c += charactors.AMPERSAND_SIGN;
        }
        if (this.state.useApostrophe) {
            c += charactors.APOSTROPHE;
        }
        if (this.state.useLeftParenthesis) {
            c += charactors.LEFT_PARENTHESIS;
        }
        if (this.state.useRightParenthesis) {
            c += charactors.RIGHT_PARENTHESIS;
        }
        if (this.state.useAsterisk) {
            c += charactors.ASTERISK;
        }
        if (this.state.usePlusSign) {
            c += charactors.PLUS_SIGN;
        }
        if (this.state.useComma) {
            c += charactors.COMMA;
        }
        if (this.state.useMinusSign) {
            c += charactors.MINUS_SIGN;
        }
        if (this.state.usePeriod) {
            c += charactors.PERIOD;
        }
        if (this.state.useSlash) {
            c += charactors.SLASH;
        }
        if (this.state.useColon) {
            c += charactors.COLON;
        }
        if (this.state.useSemicolon) {
            c += charactors.SEMICOLON;
        }
        if (this.state.useLessThanSign) {
            c += charactors.LESS_THAN_SIGN;
        }
        if (this.state.useEqualSign) {
            c += charactors.EQUAL_SIGN;
        }
        if (this.state.useGreaterThanSign) {
            c += charactors.GREATER_THAN_SIGN;
        }
        if (this.state.useQuestionMark) {
            c += charactors.QUESTION_MARK;
        }
        if (this.state.useCommercialAtSign) {
            c += charactors.COMMERCIAL_AT_SIGN;
        }
        if (this.state.useLeftSquareBracket) {
            c += charactors.LEFT_SQUARE_BRACKET;
        }
        if (this.state.useBackslash) {
            c += charactors.BACKSLASH;
        }
        if (this.state.useRightSquareBracket) {
            c += charactors.RIGHT_SQUARE_BRACKET;
        }
        if (this.state.useSpacingCircumflexAccent) {
            c += charactors.SPACING_CIRCUMFLEX_ACCENT;
        }
        if (this.state.useSpacingUnderscore) {
            c += charactors.SPACING_UNDERSCORE;
        }
        if (this.state.useSpacingGraveAccent) {
            c += charactors.SPACING_GRAVE_ACCENT;
        }
        if (this.state.useLeftBrace) {
            c += charactors.LEFT_BRACE;
        }
        if (this.state.useVerticalBar) {
            c += charactors.VERTICAL_BAR;
        }
        if (this.state.useRightBrace) {
            c += charactors.RIGHT_BRACE;
        }
        if (this.state.useTildeAccent) {
            c += charactors.TILDE_ACCENT;
        }

        if (!c.length) {
            return;
        }

        let strs: string[] = [];
        for (let i = 0; i < this.state.count; i++) {
            const r = Random.randStr(c, this.state.length);
            strs.push(r);
        }

        this.setState({randStrings: strs});
    }

    changeHandler(state: object) {
        this.setState(state, () => this.generate());
    }

    changeMarksHandler(checked: boolean) {
        this.setState({
            useSymbols: checked,
            useExclamationMark: checked,
            useDoubleQuotationMark: checked,
            useNumberSign: checked,
            useDollarSign: checked,
            usePercentSign: checked,
            useAmpersandSign: checked,
            useApostrophe: checked,
            useLeftParenthesis: checked,
            useRightParenthesis: checked,
            useAsterisk: checked,
            usePlusSign: checked,
            useComma: checked,
            useMinusSign: checked,
            usePeriod: checked,
            useSlash: checked,
            useColon: checked,
            useSemicolon: checked,
            useLessThanSign: checked,
            useEqualSign: checked,
            useGreaterThanSign: checked,
            useQuestionMark: checked,
            useCommercialAtSign: checked,
            useLeftSquareBracket: checked,
            useBackslash: checked,
            useRightSquareBracket: checked,
            useSpacingCircumflexAccent: checked,
            useSpacingUnderscore: checked,
            useSpacingGraveAccent: checked,
            useLeftBrace: checked,
            useVerticalBar: checked,
            useRightBrace: checked,
            useTildeAccent: checked,
        }, () => {
            this.generate();
        })
    }

    changeMarkHandler(state: object) {
        this.setState(state, () => {
            if (
                this.state.useExclamationMark === this.state.useDoubleQuotationMark &&
                this.state.useExclamationMark === this.state.useNumberSign &&
                this.state.useExclamationMark === this.state.useDollarSign &&
                this.state.useExclamationMark === this.state.usePercentSign &&
                this.state.useExclamationMark === this.state.useAmpersandSign &&
                this.state.useExclamationMark === this.state.useApostrophe &&
                this.state.useExclamationMark === this.state.useLeftParenthesis &&
                this.state.useExclamationMark === this.state.useRightParenthesis &&
                this.state.useExclamationMark === this.state.useAsterisk &&
                this.state.useExclamationMark === this.state.usePlusSign &&
                this.state.useExclamationMark === this.state.useComma &&
                this.state.useExclamationMark === this.state.useMinusSign &&
                this.state.useExclamationMark === this.state.usePeriod &&
                this.state.useExclamationMark === this.state.useSlash &&
                this.state.useExclamationMark === this.state.useColon &&
                this.state.useExclamationMark === this.state.useSemicolon &&
                this.state.useExclamationMark === this.state.useLessThanSign &&
                this.state.useExclamationMark === this.state.useEqualSign &&
                this.state.useExclamationMark === this.state.useGreaterThanSign &&
                this.state.useExclamationMark === this.state.useQuestionMark &&
                this.state.useExclamationMark === this.state.useCommercialAtSign &&
                this.state.useExclamationMark === this.state.useLeftSquareBracket &&
                this.state.useExclamationMark === this.state.useBackslash &&
                this.state.useExclamationMark === this.state.useRightSquareBracket &&
                this.state.useExclamationMark === this.state.useSpacingCircumflexAccent &&
                this.state.useExclamationMark === this.state.useSpacingUnderscore &&
                this.state.useExclamationMark === this.state.useSpacingGraveAccent &&
                this.state.useExclamationMark === this.state.useLeftBrace &&
                this.state.useExclamationMark === this.state.useVerticalBar &&
                this.state.useExclamationMark === this.state.useRightBrace &&
                this.state.useExclamationMark === this.state.useTildeAccent) {

                this.setState({useSymbols: this.state.useExclamationMark}, () => this.generate());
            } else {
                this.generate();
            }
        });
    }

    render(): ReactNode {
        return (
            <section>
                <h1>Random Strings</h1>
                <div>
                    length:<input value={this.state.length}
                           onChange={(e) => this.changeHandler({length: parseInt(e.target.value) || 0})} />
                    x<input value={this.state.count}
                            onChange={(e) => this.changeHandler({count: parseInt(e.target.value) || 0})}/>
                </div>
                <div>
                    <input type="checkbox"
                           checked={this.state.useLowers}
                           onChange={(e) => this.changeHandler({useLowers: e.target.checked})}
                    />a-z
                    <input type="checkbox"
                           checked={this.state.useUppers}
                           onChange={(e) => this.changeHandler({useUppers: e.target.checked})}
                    />A-Z
                    <input type="checkbox"
                           checked={this.state.useDigits}
                           onChange={(e) => this.changeHandler({useDigits: e.target.checked})}
                    />0-9
                    <input type="checkbox"
                           checked={this.state.useSymbols}
                           onChange={(e) => this.changeMarksHandler(e.target.checked)}
                    />symbols
                </div>
                <div>
                    <input type="checkbox"
                           checked={this.state.useExclamationMark}
                           onChange={(e) => this.changeMarkHandler({useExclamationMark: e.target.checked})}
                    />{charactors.EXCLAMATION_MARK}
                    <input type="checkbox"
                           checked={this.state.useDoubleQuotationMark}
                           onChange={(e) => this.changeMarkHandler({useDoubleQuotationMark: e.target.checked})}
                    />{charactors.DOUBLE_QUOTATION_MARK}
                    <input type="checkbox"
                           checked={this.state.useNumberSign}
                           onChange={(e) => this.changeMarkHandler({useNumberSign: e.target.checked})}
                    />{charactors.NUMBER_SIGN}
                    <input type="checkbox"
                           checked={this.state.useDollarSign}
                           onChange={(e) => this.changeMarkHandler({useDollarSign: e.target.checked})}
                    />{charactors.DOLLAR_SIGN}
                    <input type="checkbox"
                           checked={this.state.usePercentSign}
                           onChange={(e) => this.changeMarkHandler({usePercentSign: e.target.checked})}
                    />{charactors.PERCENT_SIGN}
                    <input type="checkbox"
                           checked={this.state.useAmpersandSign}
                           onChange={(e) => this.changeMarkHandler({useAmpersandSign: e.target.checked})}
                    />{charactors.AMPERSAND_SIGN}
                    <input type="checkbox"
                           checked={this.state.useApostrophe}
                           onChange={(e) => this.changeMarkHandler({useApostrophe: e.target.checked})}
                    />{charactors.APOSTROPHE}
                    <input type="checkbox"
                           checked={this.state.useLeftParenthesis}
                           onChange={(e) => this.changeMarkHandler({useLeftParenthesis: e.target.checked})}
                    />{charactors.LEFT_PARENTHESIS}
                    <input type="checkbox"
                           checked={this.state.useRightParenthesis}
                           onChange={(e) => this.changeMarkHandler({useRightParenthesis: e.target.checked})}
                    />{charactors.RIGHT_PARENTHESIS}
                    <input type="checkbox"
                           checked={this.state.useAsterisk}
                           onChange={(e) => this.changeMarkHandler({useAsterisk: e.target.checked})}
                    />{charactors.ASTERISK}
                    <input type="checkbox"
                           checked={this.state.usePlusSign}
                           onChange={(e) => this.changeMarkHandler({usePlusSign: e.target.checked})}
                    />{charactors.PLUS_SIGN}
                    <input type="checkbox"
                           checked={this.state.useComma}
                           onChange={(e) => this.changeMarkHandler({useComma: e.target.checked})}
                    />{charactors.COMMA}
                    <input type="checkbox"
                           checked={this.state.useMinusSign}
                           onChange={(e) => this.changeMarkHandler({useMinusSign: e.target.checked})}
                    />{charactors.MINUS_SIGN}
                    <input type="checkbox"
                           checked={this.state.usePeriod}
                           onChange={(e) => this.changeMarkHandler({usePeriod: e.target.checked})}
                    />{charactors.PERIOD}
                    <input type="checkbox"
                           checked={this.state.useSlash}
                           onChange={(e) => this.changeMarkHandler({useSlash: e.target.checked})}
                    />{charactors.SLASH}
                </div>
                <div>
                    <input type="checkbox"
                           checked={this.state.useColon}
                           onChange={(e) => this.changeMarkHandler({useColon: e.target.checked})}
                    />{charactors.COLON}
                    <input type="checkbox"
                           checked={this.state.useSemicolon}
                           onChange={(e) => this.changeMarkHandler({useSemicolon: e.target.checked})}
                    />{charactors.SEMICOLON}
                    <input type="checkbox"
                           checked={this.state.useLessThanSign}
                           onChange={(e) => this.changeMarkHandler({useLessThanSign: e.target.checked})}
                    />{charactors.LESS_THAN_SIGN}
                    <input type="checkbox"
                           checked={this.state.useEqualSign}
                           onChange={(e) => this.changeMarkHandler({useEqualSign: e.target.checked})}
                    />{charactors.EQUAL_SIGN}
                    <input type="checkbox"
                           checked={this.state.useGreaterThanSign}
                           onChange={(e) => this.changeMarkHandler({useGreaterThanSign: e.target.checked})}
                    />{charactors.GREATER_THAN_SIGN}
                    <input type="checkbox"
                           checked={this.state.useQuestionMark}
                           onChange={(e) => this.changeMarkHandler({useQuestionMark: e.target.checked})}
                    />{charactors.QUESTION_MARK}
                    <input type="checkbox"
                           checked={this.state.useCommercialAtSign}
                           onChange={(e) => this.changeMarkHandler({useCommercialAtSign: e.target.checked})}
                    />{charactors.COMMERCIAL_AT_SIGN}
                    <input type="checkbox"
                           checked={this.state.useLeftSquareBracket}
                           onChange={(e) => this.changeMarkHandler({useLeftSquareBracket: e.target.checked})}
                    />{charactors.LEFT_SQUARE_BRACKET}
                    <input type="checkbox"
                           checked={this.state.useBackslash}
                           onChange={(e) => this.changeMarkHandler({useBackslash: e.target.checked})}
                    />{charactors.BACKSLASH}
                    <input type="checkbox"
                           checked={this.state.useRightSquareBracket}
                           onChange={(e) => this.changeMarkHandler({useRightSquareBracket: e.target.checked})}
                    />{charactors.RIGHT_SQUARE_BRACKET}
                    <input type="checkbox"
                           checked={this.state.useSpacingCircumflexAccent}
                           onChange={(e) => this.changeMarkHandler({useSpacingCircumflexAccent: e.target.checked})}
                    />{charactors.SPACING_CIRCUMFLEX_ACCENT}
                    <input type="checkbox"
                           checked={this.state.useSpacingUnderscore}
                           onChange={(e) => this.changeMarkHandler({useSpacingUnderscore: e.target.checked})}
                    />{charactors.SPACING_UNDERSCORE}
                    <input type="checkbox"
                           checked={this.state.useSpacingGraveAccent}
                           onChange={(e) => this.changeMarkHandler({useSpacingGraveAccent: e.target.checked})}
                    />{charactors.SPACING_GRAVE_ACCENT}
                    <input type="checkbox"
                           checked={this.state.useLeftBrace}
                           onChange={(e) => this.changeMarkHandler({useLeftBrace: e.target.checked})}
                    />{charactors.LEFT_BRACE}
                    <input type="checkbox"
                           checked={this.state.useVerticalBar}
                           onChange={(e) => this.changeMarkHandler({useVerticalBar: e.target.checked})}
                    />{charactors.VERTICAL_BAR}
                    <input type="checkbox"
                           checked={this.state.useRightBrace}
                           onChange={(e) => this.changeMarkHandler({useRightBrace: e.target.checked})}
                    />{charactors.RIGHT_BRACE}
                    <input type="checkbox"
                           checked={this.state.useTildeAccent}
                           onChange={(e) => this.changeMarkHandler({useTildeAccent: e.target.checked})}
                    />{charactors.TILDE_ACCENT}
                </div>

                <ul>
                    {this.state.randStrings.map((randstr: string, i: number) => {
                        return <li key={i}>{randstr}</li>
                    })}
                </ul>
            </section>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);