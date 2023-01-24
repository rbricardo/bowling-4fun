import { allRolls } from "../utils";

type ScoreCardTypes = {
  cumulativeScores: number[];
  frames: number[][];
};

function Scorecard({ cumulativeScores, frames }: ScoreCardTypes) {
  const renderScores = (frame: number, roll: number) => {
    return frames[frame] ? frames[frame][roll] : "";
  };

  return (
    <div className="flex items-center justify-center">
      <table
        id="table"
        className="w-4/5 text-xs text-center mb-10"
        cellPadding="1"
        cellSpacing="0"
      >
        <tbody className="border-teal-600 border-2">
          <tr>
            {allRolls.map((frame) => (
              <th
                colSpan={6}
                className={`bg-gray-200 p-2 border-l border-b border-b-white border-r border-black`}
              >
                Frame {frame}
              </th>
            ))}
          </tr>
          <tr className="bg-teal-500 text-white">
            <td colSpan={3}>{renderScores(0, 0)}</td>
            <td colSpan={3} className="border-l-2 border-b-2 h-4">
              {renderScores(0, 1)}
            </td>
            <td colSpan={3}>{renderScores(1, 0)}</td>
            <td colSpan={3} className="border-l-2 border-b-2 h-4">
              {renderScores(1, 1)}
            </td>
            <td colSpan={3}>{renderScores(2, 0)}</td>
            <td colSpan={3} className="border-l-2 border-b-2 h-4">
              {renderScores(2, 1)}
            </td>
            <td colSpan={3}>{renderScores(3, 0)}</td>
            <td colSpan={3} className="border-l-2 border-b-2 h-4">
              {renderScores(3, 1)}
            </td>
            <td colSpan={3}>{renderScores(4, 0)}</td>
            <td colSpan={3} className="border-l-2 border-b-2 h-4">
              {renderScores(4, 1)}
            </td>
            <td colSpan={3}>{renderScores(5, 0)}</td>
            <td colSpan={3} className="border-l-2 border-b-2 h-4">
              {renderScores(5, 1)}
            </td>
            <td colSpan={3}>{renderScores(6, 0)}</td>
            <td colSpan={3} className="border-l-2 border-b-2 h-4">
              {renderScores(6, 1)}
            </td>
            <td colSpan={3}>{renderScores(7, 0)}</td>
            <td colSpan={3} className="border-l-2 border-b-2 h-4">
              {renderScores(7, 1)}
            </td>
            <td colSpan={3}>{renderScores(8, 0)}</td>
            <td colSpan={3} className="border-l-2 border-b-2 h-4">
              {renderScores(8, 1)}
            </td>
            <td colSpan={2}>{renderScores(9, 0)}</td>
            <td colSpan={2} className="border-l-2 border-b-2 h-4">
              {renderScores(9, 1)}
            </td>
            <td colSpan={2}>{renderScores(9, 2)}</td>
          </tr>
          <tr className="bg-teal-500 text-white">
            {allRolls.map((score) => (
              <td colSpan={6} className="h-4">
                {cumulativeScores[score - 1]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Scorecard;
