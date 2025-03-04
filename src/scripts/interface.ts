/* All data interfaces */

export interface ILetterData {
    letter: string;
    word: string;
    image?: string;
    sound?: string;
}

export interface INumberData {
    number: number;
    word: string;
    items: number;
    image?: string;
    sound?: string;
}

export interface IColorData {
    name: string;
    hex: string;
    sound?: string;
}

export interface IShapeData {
    name: string;
    svgPath: string;
    sound?: string;
}
