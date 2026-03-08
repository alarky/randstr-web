
const UINT_MAX = 2**32;

export default class Random {
    // 0.0 <= x < 1.0
    public static random(): number {
        let ints = new Uint32Array(1);
        window.crypto.getRandomValues(ints);
        return ints[0]/UINT_MAX;
    }

    public static randInt(min: number, max: number): number {
        return Math.floor(this.random() * (max - min)) + min;
    }

    public static randFloat(min: number, max: number): number {
        return this.random() * (max - min) + min;
    }

    public static randChoice<T>(choices: T[]): T {
        return choices[this.randInt(0, choices.length)];
    }

    public static randChar(choices: string): string {
        return choices[this.randInt(0, choices.length)];
    }

    public static randStr(choices: string, length: number): string {
        let ints = new Uint32Array(length);
        window.crypto.getRandomValues(ints);

        const divide = UINT_MAX / choices.length;

        let r = '';
        for (let i = 0; i < length; i++) {
            r += choices[Math.floor(ints[i] / divide)];
        }
        return r;
    }
}
