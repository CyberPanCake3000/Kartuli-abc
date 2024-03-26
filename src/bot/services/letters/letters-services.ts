import { Letter, letters } from '../../../constants/ge';

export class LettersService {
  private static getRandomIndex(availableLetters: Letter[]): number {
    return Math.floor(Math.random() * availableLetters.length);
  }

  public static getRandomLetters(learnedLetters: string[], count: number): Letter[] {
    const availableLetters = letters.filter(letter => !learnedLetters.includes(letter.character));

    const randomLetters: Set<Letter> = new Set();

    while (randomLetters.size < count && randomLetters.size < availableLetters.length) {
      const randomIndex = this.getRandomIndex(availableLetters);
      randomLetters.add(availableLetters[randomIndex]);
    }

    return Array.from(randomLetters);
  }
}
