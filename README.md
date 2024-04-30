# classum-박경민-minesweeper

## 과제 설치 및 실행 방법

- node: v18.17.1
- npm: v9.6.7

```
npm install
npm run build
npm run preview
```

## 추가 구현사항

### 양쪽 클릭 기능 (Area Open)

> 맥북의 트랙패드 사용 중이라 양쪽 클릭이 안되서 셀(cell)이 오픈된 상태에서 마우스 왼쪽 클릭을 했을 때도 해당 기능이 동작하게 구현했습니다.

오픈된 셀을 **마우스 왼쪽 클릭 또는 양쪽 클릭했을 때** 이웃 셀에 지뢰가 있으면 힌트를 제공하고 지뢰가 없으면 주변에 지뢰가 없을 때까지 셀을 오픈합니다.

힌트를 제공하기 위해 `setTimeout` 함수를 사용해 셀이 파란색으로 반짝이게 했습니다.

이웃 셀에 지뢰가 없으면 `openCell` 이라는 리덕스 액션을 디스패치합니다. 해당 액션은 BFS 알고리즘을 사용하여 주변에 지뢰가 없을 때까지 셀을 오픈합니다.

```tsx
const areaOpen = (x: number, y: number) => {
  const openedCells: [number, number][] = [];
  let isBombAround = false;

  NEIGHBORS.forEach(([wx, wy]) => {
    const nx = x + wx;
    const ny = y + wy;

    if (nx < 0 || ny < 0 || nx >= height || ny >= width) return;

    const status = boardStatus[nx][ny];

    if (status !== BOARD_STATUS.FLAG && status !== BOARD_STATUS.OPEN) {
      openedCells.push([nx, ny]);

      if (board[nx][ny] === BOARD_STATUS.BOMB) {
        isBombAround = true;
      }
    }
  });

  if (isBombAround) {
    dispatch(toggleShowingHints(openedCells));
    setTimeout(() => {
      dispatch(toggleShowingHints(openedCells));
    }, 100);

    return;
  }

  dispatch(openCell([x, y]));
};
```

```tsx
export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    ...
    openCell: (state, action: PayloadAction<[number, number]>) => {
      const [tx, ty] = action.payload;
      const N = state.board.length;
      const M = state.board[0].length;
      const newBoardStatus = [...state.boardStatus.map((row) => [...row])];
      const queue = [[tx, ty]];

      newBoardStatus[tx][ty] = BOARD_STATUS.OPEN;

      if (state.boardStatus[tx][ty] === BOARD_STATUS.CLOSE && state.board[tx][ty] !== 0) {
        state.boardStatus = newBoardStatus;

        return;
      }

      while (queue.length > 0) {
        const [x, y] = queue.shift()!;

        NEIGHBORS.forEach(([wx, wy]) => {
          const nx = x + wx;
          const ny = y + wy;

          if (nx < 0 || ny < 0 || nx >= N || ny >= M) return;
          if (newBoardStatus[nx][ny] === BOARD_STATUS.OPEN || newBoardStatus[nx][ny] === BOARD_STATUS.FLAG) return;
          if (state.board[nx][ny] === BOARD_STATUS.BOMB) return;

          newBoardStatus[nx][ny] = BOARD_STATUS.OPEN;

          if (state.board[nx][ny] === 0) {
            queue.push([nx, ny]);
          }
        });
      }

      state.boardStatus = newBoardStatus;
    },
    ...
  },
});
```

### 렌더링 최적화

- **React.memo 사용** : 전달받은 Props가 변경되지 않았는데 리렌더링될 가능성이 있는 컴포넌트에 React.memo를 적용해 메모이제이션 했습니다.

- **시간 복잡도 최소화**: 높이와 너비가 최대 100으로 모수가 프로그램 성능에 영향을 줄 만큼 크지는 않지만 모든 연산에서 시간복잡도가 `O(N^2)`을 넘지 않도록 구현했습니다.

- **Web Worker를 사용한 타이머 구현** : 타이머 기능을 메인 스레드가 아닌 별도의 분리된 스레드에서 처리하여 메인 스레드의 성능에 영향을 주지 않도록 했습니다.

### 난이도 데이터 저장 (브라우저 새로고침 시 유지)

브라우저 새로고침 시에도 난이도 데이터를 유지하기 위해 로컬스토리지에 난이도, 너비, 높이, 지뢰 개수를 저장했습니다.

```tsx
localStorage.setItem('level', JSON.stringify({ level, width, height, bombCount }));
```

이후, 웹 애플리케이션 초기 로딩시 로컬스토리지에서 난이도 데이터를 가져옵니다.

```tsx
export function useLevelDataFromLocalStorage() {
  ...
  const dispatch = useAppDispatch();

  useEffect(() => {
    const levelData = localStorage.getItem('level');

    if (levelData) {
      const { level, width, height, bombCount } = JSON.parse(levelData);

      dispatch(updateLevel(level));
      dispatch(updateSize({ width, height, bombCount }));
    }

    setLoad(true);
  }, [dispatch]);

  ...
}
```
