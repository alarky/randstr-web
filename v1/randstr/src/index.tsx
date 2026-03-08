import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as charactors from "./charactors";
import {IAppProps, IAppState} from "./types";
import RandomString from "./randstr";
import Appstate from "./appstate";

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = new Appstate();
    }

    componentDidMount() {
        this.generate();
    }

    generate() {
        if (this.state.hasChanged) {
            Appstate.save(this.state);
        }
        this.setState({randStrings: RandomString.generate(this.state)});
    }

    reset() {
        window.history.replaceState('', '', '/');
        this.setState(new Appstate());
    }

    changeHandler(state: object) {
        state = {...state, ...{hasChanged: true}};
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
            hasChanged: true,
        }, () => {
            this.generate();
        })
    }

    changeMarkHandler(state: object) {
        state = {...state, ...{hasChanged: true}};
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
                    count:<input value={this.state.count}
                                onChange={(e) => this.changeHandler({count: parseInt(e.target.value) || 0})}/><br/>
                    length:<input value={this.state.length}
                           onChange={(e) => this.changeHandler({length: parseInt(e.target.value) || 0})} />
                    <button onClick={() => this.generate()}>Generate</button>
                    <button onClick={() => this.reset()}>Reset</button>
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