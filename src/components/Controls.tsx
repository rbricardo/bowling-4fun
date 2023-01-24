type ControlsTypes = {
  rolls: number;
  gameOver: boolean;
  lastRoll: number;
  restart: () => void;
  enterScore: (pins: number) => void;
};

const allRolls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Controls({
  rolls,
  lastRoll,
  gameOver,
  enterScore,
  restart,
}: ControlsTypes) {
  const handleClick = (pins: number) => {
    enterScore(pins);
  };

  const disableButton = (number: number) => {
    if (gameOver) return true;
    if (rolls % 2 === 0 || rolls === 0) return false;
    if (rolls === 19 && lastRoll === 10) return false;
    return lastRoll + number > 10;
  };

  return (
    <div className="flex flex-col">
      <div>
        {allRolls.map((roll) => (
          <button
            className="w-12 h-12 m-3 bg-teal-600 text-white outline-none hover:opacity-70 disabled:bg-gray-700 disabled:text-white"
            disabled={disableButton(roll)}
            onClick={() => handleClick(roll)}
          >
            {roll}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center">
        {rolls > 0 && (
          <button
            className="w-24 rounded-xl h-9 mt-10 mb-5 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:opacity-90"
            onClick={restart}
          >
            Restart
          </button>
        )}
      </div>
    </div>
  );
}

export default Controls;
