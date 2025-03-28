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

export interface IPositionData {
  name: string;
  description: string;
  objectPosition: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  referencePosition: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export interface IEmotionData {
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export interface IBodyPartData {
  name: string;
  description: string;
  emoji: string;
  color: string;
  function: string;
  image?: string;
}

export interface IAnimalData {
  name: string;
  emoji: string;
  image?: string;
  fact: string;
  sound?: string;
  category: "farm" | "wild" | "pet" | "sea" | "insect" | "bird";
  color: string;
}
