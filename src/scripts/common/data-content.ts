import { IColorData, IEmotionData, ILetterData, INumberData, IPositionData, IShapeData, IBodyPartData, IAnimalData } from "./data-interface";

/* Contains all the data for the sections */

export const alphabetData: ILetterData[] = [
    { letter: 'A', word: 'Apple' },
    { letter: 'B', word: 'Ball' },
    { letter: 'C', word: 'Cat' },
    { letter: 'D', word: 'Dog' },
    { letter: 'E', word: 'Elephant' },
    { letter: 'F', word: 'Fish' },
    { letter: 'G', word: 'Giraffe' },
    { letter: 'H', word: 'House' },
    { letter: 'I', word: 'Ice Cream' },
    { letter: 'J', word: 'Jellyfish' },
    { letter: 'K', word: 'Kite' },
    { letter: 'L', word: 'Lion' },
    { letter: 'M', word: 'Monkey' },
    { letter: 'N', word: 'Nest' },
    { letter: 'O', word: 'Orange' },
    { letter: 'P', word: 'Penguin' },
    { letter: 'Q', word: 'Queen' },
    { letter: 'R', word: 'Rabbit' },
    { letter: 'S', word: 'Sun' },
    { letter: 'T', word: 'Tree' },
    { letter: 'U', word: 'Umbrella' },
    { letter: 'V', word: 'Violin' },
    { letter: 'W', word: 'Whale' },
    { letter: 'X', word: 'X-Ray' },
    { letter: 'Y', word: 'Yo-yo' },
    { letter: 'Z', word: 'Zebra' }
];

export const numbersData: INumberData[] = [
    { number: 1, word: 'One', items: 1 },
    { number: 2, word: 'Two', items: 2 },
    { number: 3, word: 'Three', items: 3 },
    { number: 4, word: 'Four', items: 4 },
    { number: 5, word: 'Five', items: 5 },
    { number: 6, word: 'Six', items: 6 },
    { number: 7, word: 'Seven', items: 7 },
    { number: 8, word: 'Eight', items: 8 },
    { number: 9, word: 'Nine', items: 9 },
    { number: 10, word: 'Ten', items: 10 }
];

export const colorsData: IColorData[] = [
    { name: 'Red', hex: '#FF5252' },
    { name: 'Blue', hex: '#448AFF' },
    { name: 'Green', hex: '#4CAF50' },
    { name: 'Yellow', hex: '#FFEB3B' },
    { name: 'Purple', hex: '#9C27B0' },
    { name: 'Orange', hex: '#FF9800' },
    { name: 'Pink', hex: '#F06292' },
    { name: 'Brown', hex: '#795548' },
    { name: 'Black', hex: '#212121' },
    { name: 'White', hex: '#FFFFFF' }
];

export const shapesData: IShapeData[] = [
    { 
        name: 'Circle', 
        svgPath: '<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="35" fill="#FF9E80" /></svg>' 
    },
    { 
        name: 'Square', 
        svgPath: '<svg width="80" height="80" viewBox="0 0 80 80"><rect x="10" y="10" width="60" height="60" fill="#64B5F6" /></svg>' 
    },
    { 
        name: 'Triangle', 
        svgPath: '<svg width="80" height="80" viewBox="0 0 80 80"><polygon points="40,10 10,70 70,70" fill="#FFEB3B" /></svg>' 
    },
    { 
        name: 'Rectangle', 
        svgPath: '<svg width="80" height="80" viewBox="0 0 80 80"><rect x="10" y="20" width="60" height="40" fill="#81C784" /></svg>' 
    },
    { 
        name: 'Oval', 
        svgPath: '<svg width="80" height="80" viewBox="0 0 80 80"><ellipse cx="40" cy="40" rx="35" ry="25" fill="#E57373" /></svg>' 
    },
    { 
        name: 'Diamond', 
        svgPath: '<svg width="80" height="80" viewBox="0 0 80 80"><polygon points="40,10 70,40 40,70 10,40" fill="#9575CD" /></svg>' 
    },
    { 
        name: 'Star', 
        svgPath: '<svg width="80" height="80" viewBox="0 0 80 80"><polygon points="40,10 48,30 70,30 52,45 60,65 40,52 20,65 28,45 10,30 32,30" fill="#FFD54F" /></svg>' 
    },
    { 
        name: 'Heart', 
        svgPath: '<svg width="80" height="80" viewBox="0 0 80 80"><path d="M40,70 C40,70 10,50 10,30 C10,20 20,10 30,10 C35,10 40,15 40,15 C40,15 45,10 50,10 C60,10 70,20 70,30 C70,50 40,70 40,70 Z" fill="#F06292" /></svg>' 
    },
    { 
        name: 'Cross', 
        svgPath: '<svg width="80" height="80" viewBox="0 0 80 80"><rect x="30" y="10" width="20" height="60" fill="#9C27B0" /><rect x="10" y="30" width="60" height="20" fill="#9C27B0" /></svg>' 
    }
];

export const positionsData: IPositionData[] = [
    {
        name: "Above",
        description: "The ball is above the box",
        objectPosition: {
            top: "20%",
            left: "50%",
            right: "auto",
            bottom: "auto"
        },
        referencePosition: {
            top: "60%",
            left: "50%",
            right: "auto",
            bottom: "auto"
        }
    },
    {
        name: "Below",
        description: "The ball is below the box",
        objectPosition: {
            top: "60%",
            left: "50%",
            right: "auto",
            bottom: "auto"
        },
        referencePosition: {
            top: "20%",
            left: "50%",
            right: "auto",
            bottom: "auto"
        }
    },
    {
        name: "Left",
        description: "The ball is to the left of the box",
        objectPosition: {
            top: "40%",
            left: "20%",
            right: "auto",
            bottom: "auto"
        },
        referencePosition: {
            top: "40%",
            left: "60%",
            right: "auto",
            bottom: "auto"
        }
    },
    {
        name: "Right",
        description: "The ball is to the right of the box",
        objectPosition: {
            top: "40%",
            left: "60%",
            right: "auto",
            bottom: "auto"
        },
        referencePosition: {
            top: "40%",
            left: "20%",
            right: "auto",
            bottom: "auto"
        }
    },
    {
        name: "Inside",
        description: "The ball is inside the box",
        objectPosition: {
            top: "40%",
            left: "40%",
            right: "auto",
            bottom: "auto"
        },
        referencePosition: {
            top: "30%",
            left: "30%",
            right: "auto",
            bottom: "auto"
        }
    },
    {
        name: "Outside",
        description: "The ball is outside the box",
        objectPosition: {
            top: "20%",
            left: "20%",
            right: "auto",
            bottom: "auto"
        },
        referencePosition: {
            top: "40%",
            left: "40%",
            right: "auto",
            bottom: "auto"
        }
    },
    {
        name: "Between",
        description: "The ball is between the boxes",
        objectPosition: {
            top: "40%",
            left: "50%",
            right: "auto",
            bottom: "auto"
        },
        referencePosition: {
            top: "40%",
            left: "20%",
            right: "auto",
            bottom: "auto"
        }
    },
    {
        name: "In front",
        description: "The ball is in front of the box",
        objectPosition: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto"
        },
        referencePosition: {
            top: "40%",
            left: "50%",
            right: "auto",
            bottom: "auto"
        }
    },
    {
        name: "Open",
        description: "The box is open",
        objectPosition: {
            top: "30%",
            left: "50%",
            right: "auto",
            bottom: "auto"
        },
        referencePosition: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto"
        }
    },
    {
        name: "Close",
        description: "The box is closed",
        objectPosition: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto"
        },
        referencePosition: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto"
        }
    }
];

export const emotionsData: IEmotionData[] = [
    {
        name: "Happy",
        emoji: "😊",
        description: "Feeling joy and pleasure",
        color: "#FFD54F"
    },
    {
        name: "Sad",
        emoji: "😢",
        description: "Feeling unhappy or down",
        color: "#90CAF9"
    },
    {
        name: "Angry",
        emoji: "😠",
        description: "Feeling mad or upset",
        color: "#EF5350"
    },
    {
        name: "Surprised",
        emoji: "😲",
        description: "Feeling amazed or shocked",
        color: "#81C784"
    },
    {
        name: "Scared",
        emoji: "😨",
        description: "Feeling afraid or worried",
        color: "#CE93D8"
    },
    {
        name: "Sleepy",
        emoji: "😴",
        description: "Feeling tired and drowsy",
        color: "#B39DDB"
    },
    {
        name: "Excited",
        emoji: "🤩",
        description: "Feeling very happy and eager",
        color: "#FFAB40"
    },
    {
        name: "Confused",
        emoji: "🤔",
        description: "Feeling puzzled or unsure",
        color: "#9E9E9E"
    },
    {
        name: "Shy",
        emoji: "😳",
        description: "Feeling timid or nervous",
        color: "#F48FB1"
    },
    {
        name: "Silly",
        emoji: "🤪",
        description: "Feeling playful and goofy",
        color: "#AED581"
    }
];

export const bodyPartsData: IBodyPartData[] = [
    {
        name: "Head",
        description: "The top part of your body",
        emoji: "👤",
        color: "#FFB74D",
        function: "Helps you think and see"
    },
    {
        name: "Eyes",
        description: "Windows to the world",
        emoji: "👀",
        color: "#81C784",
        function: "Help you see everything"
    },
    {
        name: "Nose",
        description: "In the middle of your face",
        emoji: "👃",
        color: "#FF8A65",
        function: "Helps you smell"
    },
    {
        name: "Mouth",
        description: "Your eating and talking tool",
        emoji: "👄",
        color: "#F06292",
        function: "Helps you eat and speak"
    },
    {
        name: "Ears",
        description: "On the sides of your head",
        emoji: "👂",
        color: "#9575CD",
        function: "Help you hear sounds"
    },
    {
        name: "Arms",
        description: "Your reaching tools",
        emoji: "💪",
        color: "#4FC3F7",
        function: "Help you grab and hug"
    },
    {
        name: "Hands",
        description: "At the end of your arms",
        emoji: "🤚",
        color: "#FFB74D",
        function: "Help you hold things"
    },
    {
        name: "Legs",
        description: "Your standing supports",
        emoji: "🦵",
        color: "#AED581",
        function: "Help you walk and run"
    },
    {
        name: "Feet",
        description: "At the end of your legs",
        emoji: "🦶",
        color: "#FF8A65",
        function: "Help you walk and balance"
    },
    {
        name: "Tummy",
        description: "In the middle of your body",
        emoji: "🫃",
        color: "#4DB6AC",
        function: "Where food goes"
    },
    {
        name: "Back",
        description: "Behind your tummy",
        emoji: "👤",
        color: "#9575CD",
        function: "Helps you stand straight"
    },
    {
        name: "Fingers",
        description: "On your hands",
        emoji: "👆",
        color: "#FFB74D",
        function: "Help you pick up small things"
    }
];

export const animalsData: IAnimalData[] = [
    {
        name: "Lion",
        emoji: "🦁",
        fact: "The lion is called the king of the jungle",
        category: "wild",
        color: "#FFA000"
    },
    {
        name: "Elephant",
        emoji: "🐘",
        fact: "Elephants are the largest land animals",
        category: "wild",
        color: "#9E9E9E"
    },
    {
        name: "Giraffe",
        emoji: "🦒",
        fact: "Giraffes have very long necks",
        category: "wild",
        color: "#FFC107"
    },
    {
        name: "Monkey",
        emoji: "🐒",
        fact: "Monkeys are very playful and smart",
        category: "wild",
        color: "#795548"
    },
    {
        name: "Dog",
        emoji: "🐕",
        fact: "Dogs are loyal and friendly pets",
        category: "pet",
        color: "#8D6E63"
    },
    {
        name: "Cat",
        emoji: "🐈",
        fact: "Cats like to purr when they're happy",
        category: "pet",
        color: "#FF9800"
    },
    {
        name: "Fish",
        emoji: "🐠",
        fact: "Fish breathe underwater using gills",
        category: "sea",
        color: "#29B6F6"
    },
    {
        name: "Turtle",
        emoji: "🐢",
        fact: "Turtles carry their homes on their backs",
        category: "sea",
        color: "#4CAF50"
    },
    {
        name: "Cow",
        emoji: "🐄",
        fact: "Cows give us milk to drink",
        category: "farm",
        color: "#BDBDBD"
    },
    {
        name: "Pig",
        emoji: "🐖",
        fact: "Pigs are very clean and smart animals",
        category: "farm",
        color: "#F48FB1"
    },
    {
        name: "Chicken",
        emoji: "🐔",
        fact: "Chickens lay eggs that we can eat",
        category: "farm",
        color: "#FFEB3B"
    },
    {
        name: "Horse",
        emoji: "🐎",
        fact: "Horses can run very fast",
        category: "farm",
        color: "#8D6E63"
    },
    {
        name: "Butterfly",
        emoji: "🦋",
        fact: "Butterflies start as caterpillars",
        category: "insect",
        color: "#AB47BC"
    },
    {
        name: "Bee",
        emoji: "🐝",
        fact: "Bees make honey and help flowers grow",
        category: "insect",
        color: "#FFC107"
    },
    {
        name: "Penguin",
        emoji: "🐧",
        fact: "Penguins can't fly but they swim very well",
        category: "bird",
        color: "#212121"
    },
    {
        name: "Owl",
        emoji: "🦉",
        fact: "Owls can turn their heads almost all the way around",
        category: "bird",
        color: "#795548"
    }
];