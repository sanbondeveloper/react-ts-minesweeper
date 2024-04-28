import { BoardBox, GameStatus, Header, Wrapper } from './styles';
import { useMinesweeper } from '../../hooks/useMinesweeper';
import Counter from '../Counter';
import Timer from '../Timer';
import ResetButton from '../ResetButton';
import BoardCell from '../BoardCell';

function Board() {
  const {
    remaining,
    board,
    boardStatus,
    gameStatus,
    width,
    height,
    handleClick,
    handleClickRight,
    handleClickReset,
    handleClickCounter,
    handleMouseDown,
    handleMouseUp,
  } = useMinesweeper();

  return (
    <>
      <GameStatus>{gameStatus}</GameStatus>
      <Header>
        <Counter remaining={remaining} onClick={handleClickCounter} />
        <ResetButton gameStatus={gameStatus} onReset={handleClickReset} />
        <Timer gameStatus={gameStatus} />
      </Header>

      <BoardBox $width={width} $height={height}>
        {board.map((row, i) =>
          row.map((value, j) => (
            <Wrapper
              key={`${i}-${j}`}
              onClick={() => handleClick(i, j)}
              onContextMenu={(e) => handleClickRight(e, i, j)}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
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
