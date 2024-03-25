import { Letter, letters } from '../../../constants/ge';

export class LettersService {
  public getRandomLetter(): Letter {
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  }

  getRandomLetters(count: number): Letter[] {
    const randomLetters: Set<Letter> = new Set();

    while (randomLetters.size < count) {
      randomLetters.add(this.getRandomLetter());
    }

    return Array.from(randomLetters);
  }
}