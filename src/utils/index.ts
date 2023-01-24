const getFrameIndex = (frames: number[][]) => frames.length - 1;

const isBonusRoll = (rolls: number) => {
  const bonusRoll = 20;
  return rolls === bonusRoll;
};

const isEven = (number: number) => number % 2 === 0;

const isSpare = (roll1: number, roll2: number) => roll1 + roll2 === 10;

const isStrike = (pins: number) => {
  const strike = 10;
  return pins === strike;
};

const strikeBonus = (roll1: number, roll2: number) => 10 + roll1 + roll2;

export const updateCumulativeScore = (
  rolls: number,
  frames: number[][],
  cumulativeScores: number[],
  pins: number[],
  lastScore: number
) => {
  const currentScore = cumulativeScores.slice(-1)[0] || 0;

  if (
    (!isEven(rolls) &&
      !isStrike(lastScore) &&
      !isSpare(pins.slice(-1)[0], lastScore)) ||
    isBonusRoll(rolls)
  ) {
    const frameScore = isBonusRoll(rolls)
      ? frames[getFrameIndex(frames)].slice(-1)[0] +
        frames[getFrameIndex(frames)].slice(-2)[0] +
        lastScore
      : frames[getFrameIndex(frames)].slice(-1)[0] + lastScore;

    if (
      isStrike(pins.slice(-1)[0]) &&
      !isStrike(pins.slice(-2)[0]) &&
      rolls === 19
    )
      return cumulativeScores;
    if (isStrike(pins.slice(-2)[0]) && rolls > 2 && rolls < 20) {
      const bonus = strikeBonus(pins.slice(-1)[0], lastScore);
      const previousFrame = bonus + currentScore;
      return isStrike(pins.slice(-1)[0]) && rolls === 19
        ? cumulativeScores.concat(previousFrame)
        : cumulativeScores.concat(previousFrame, frameScore + previousFrame);
    }
    const updatedFrameScores = cumulativeScores.concat(
      currentScore + frameScore
    );
    return updatedFrameScores;
  } else if (isStrike(pins.slice(-2)[0]) && rolls > 2 && rolls < 20) {
    const bonus = strikeBonus(pins.slice(-1)[0], lastScore);
    return cumulativeScores.concat(currentScore + bonus);
  } else if (isEven(rolls) && isSpare(pins.slice(-2)[0], pins.slice(-1)[0])) {
    const spareFrame = 10 + lastScore;
    return cumulativeScores.concat(currentScore + spareFrame);
  }
  return cumulativeScores;
};

export const updateCurrentRoll = (rolls: number, lastScore: number) => {
  if (isStrike(lastScore) && isEven(rolls) && rolls < 18) {
    return rolls + 2;
  } else {
    return rolls + 1;
  }
};

export const updateFrames = (rolls: number, lastScore: number, frames: number[][]) => {
  if (isEven(rolls) && !isBonusRoll(rolls)) {
    return frames.concat([[lastScore]]);
  } else {
    const newFrameScore = frames[getFrameIndex(frames)].concat([lastScore]);
    return frames.slice(0, getFrameIndex(frames)).concat([newFrameScore]);
  }
};

export const isGameOver = (
  rolls: number,
  lastScore: number,
  pins: number[]
) => {
  const GameNotOver =
    rolls < 19 ||
    (rolls === 19 &&
      (isSpare(lastScore, pins.slice(-1)[0]) || isStrike(pins.slice(-1)[0])));
  return !GameNotOver;
};

export const allRolls: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];