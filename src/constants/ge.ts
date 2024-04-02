export interface Letter {
  character: string,
  transcription: string,
  position: number,
  description: string,
  picture: string,
}

export const letters: Letter[] = [
  {
    "character": "ა",
    "transcription": "a",
    "position": 1,
    "description": "описание"
  },
  {
    "character": "ბ",
    "transcription": "b",
    "position": 2,
    "description": "описание",
  },
  {
    "character": "გ",
    "transcription": "g",
    "position": 3,
    "description": "описание"
  },
  {
    "character": "დ",
    "transcription": "d",
    "position": 4,
    "description": "описание"
  },
  {
    "character": "ე",
    "transcription": "e",
    "position": 5,
    "description": "описание"
  },
  {
    "character": "ვ",
    "transcription": "v",
    "position": 6,
    "description": "описание"
  },
  {
    "character": "ზ",
    "transcription": "z",
    "position": 7,
    "description": "описание"
  },
  {
    "character": "თ",
    "transcription": "t",
    "position": 8,
    "description": "описание"
  },
  {
    "character": "ი",
    "transcription": "i",
    "position": 9,
    "description": "описание"
  },
  {
    "character": "კ",
    "transcription": "k'",
    "position": 10,
    "description": "описание"
  },
  {
    "character": "ლ",
    "transcription": "l",
    "position": 11,
    "description": "описание"
  },
  {
    "character": "მ",
    "transcription": "m",
    "position": 12,
    "description": "описание"
  },
  {
    "character": "ნ",
    "transcription": "n",
    "position": 13,
    "description": "описание"
  },
  {
    "character": "ო",
    "transcription": "o",
    "position": 14,
    "description": "описание"
  },
  {
    "character": "პ",
    "transcription": "p'",
    "position": 15,
    "description": "описание"
  },
  {
    "character": "ჟ",
    "transcription": "zh",
    "position": 16,
    "description": "описание"
  },
  {
    "character": "რ",
    "transcription": "r",
    "position": 17,
    "description": "описание"
  },
  {
    "character": "ს",
    "transcription": "s",
    "position": 18,
    "description": "описание"
  },
  {
    "character": "ტ",
    "transcription": "t'",
    "position": 19,
    "description": "описание"
  },
  {
    "character": "უ",
    "transcription": "u",
    "position": 20,
    "description": "описание"
  },
  {
    "character": "ფ",
    "transcription": "p",
    "position": 21,
    "description": "описание"
  },
  {
    "character": "ქ",
    "transcription": "k",
    "position": 22,
    "description": "описание"
  },
  {
    "character": "ღ",
    "transcription": "gh",
    "position": 23,
    "description": "описание"
  },
  {
    "character": "ყ",
    "transcription": "q'",
    "position": 24,
    "description": "описание"
  },
  {
    "character": "შ",
    "transcription": "sh",
    "position": 25,
    "description": "описание"
  },
  {
    "character": "ჩ",
    "transcription": "ch",
    "position": 26,
    "description": "описание"
  },
  {
    "character": "ც",
    "transcription": "ts",
    "position": 27,
    "description": "описание"
  },
  {
    "character": "ძ",
    "transcription": "dz",
    "position": 28,
    "description": "описание"
  },
  {
    "character": "წ",
    "transcription": "ts'",
    "position": 29,
    "description": "описание"
  },
  {
    "character": "ჭ",
    "transcription": "ch'",
    "position": 30,
    "description": "описание"
  },
  {
    "character": "ხ",
    "transcription": "kh",
    "position": 31,
    "description": "описание"
  },
  {
    "character": "ჯ",
    "transcription": "j",
    "position": 32,
    "description": "описание"
  },
  {
    "character": "ჰ",
    "transcription": "h",
    "position": 33,
    "description": "описание"
  }
].map(letter => ({
  ...letter,
  picture: `/media/pictures/${letter.position}.png`
}));
