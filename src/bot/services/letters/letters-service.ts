import { Letter, letters } from '../../../constants/ge';
import { LearnedLetter } from '../../../models/user';

export class LettersService {
  private static getRandomIndex(availableLetters: Letter[]): number {
    return Math.floor(Math.random() * availableLetters.length);
  }

  public static getRandomLetters(learnedLetters: LearnedLetter[], count: number): Letter[] {
    // const availableLetters = letters.filter(letter => !learnedLetters.includes(letter.character));

    const randomLetters: Set<Letter> = new Set();

    while (randomLetters.size < count && randomLetters.size < letters.length) {
      const randomIndex = this.getRandomIndex(letters);
      randomLetters.add(letters[randomIndex]);
    }

    return Array.from(randomLetters);
  }
}
