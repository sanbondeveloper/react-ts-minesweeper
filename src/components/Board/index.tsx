import { BoardBox, GameStatus, Header, Wrapper } from './styles';
import BoardCell from '../BoardCell';
import Counter from '../Counter';
import Timer from '../Timer';
import { useMinesweeper } from '../../hooks/useMinesweeper';
import ResetButton from '../ResetButton';

function Board() {
  const {
    remaining,
    board,
    boardStatus,
    gameStatus,
    width,
    height,
    handleClickCell,
    handleToggleFlag,
    handleReset,
    handleClickCounter,
  } = useMinesweeper();

  return (
    <>
      <GameStatus>{gameStatus}</GameStatus>
      <Header>
        <Counter remaining={remaining} onClick={handleClickCounter} />
        <ResetButton gameStatus={gameStatus} onReset={handleReset} />
        <Timer gameStatus={gameStatus} />
      </Header>

      <BoardBox $width={width} $height={height}>
        {board.map((row, i) =>
          row.map((value, j) => (
            <Wrapper
              key={`${i}-${j}`}
              onClick={() => handleClickCell(i, j)}
              onContextMenu={(e) => handleToggleFlag(e, i, j)}
            >
              <BoardCell value={value} status={boardStatus[i][j]} />
            </Wrapper>
          )),
        )}
      </BoardBox>
    </>
  );
}

export default Board;
