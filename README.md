# classum-박경민-minesweeper

## 과제 설치 및 실행 방법

아래 명령어를 순차적으로 실행하면 됩니다.

```
npm install
npm run build
npm run preview
```

## 추가 구현사항

### 1. 양쪽 클릭 기능 (Area Open)

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

### 2. 렌더링 최적화

1. 루트 컴포넌트 App에서 상태 사용 안함

App 컴포넌트가 리렌더링되면 기본적으로 모든 컴포넌트가 리렌더링되기 때문에 App 컴포넌트가 리렌더링되는 것을 방지하기 위해 자식 컴포넌트의 리렌더링에 영향을 주는 상태(변화가 자주 일어나는 상태 등)를 사용하지 않았습니다.

2. React.memo 사용

메모이제이션에도 비용이 따르기 때문에 전달받은 Props가 변경되지 않았는데 리렌더링될 가능성이 있는 컴포넌트들만 React.memo를 사용해 메모이제이션 했습니다.

3. 시간 복잡도 최소화

높이와 너비가 최대 100으로 모수가 프로그램 성능에 영향을 줄 만큼 크지는 않지만 모든 연산에서 시간복잡도가 `O(N^2)`을 넘지 않도록 구현했습니다.

4. Web Worker를 사용한 타이머 구현

타이머 기능을 메인 스레드가 아닌 별도의 분리된 스레드에서 처리하여 메인 스레드의 성능에 영향을 주지 않도록 했습니다.

### 3. 난이도 데이터 저장 (브라우저 새로고침 시 유지)

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

### 4. 로컬스토리지에서 난이도 데이터를 가져오기 전까지 렌더링 늦추기

로컬스토리지에서 난이도 데이터를 가져와 리덕스 스토어에 저장하기 위해 액션을 디스패치하는 작업을 `useEffect`에서 하고 있습니다.

`useEffect`는 렌더링 작업 이후에 실행되기 때문에 게임 보드판이 깜빡이는 현상이 발생합니다.
이를 방지하기 위해 `load`라는 상태를 사용해 난이도 데이터가 리덕스 스토어에 저장되기 전까지 렌더링을 늦췄습니다.

```tsx
export function useLevelDataFromLocalStorage() {
  const [load, setLoad] = useState(false);
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

  return load;
}

function App() {
  const load = useLevelDataFromLocalStorage();

  if (!load) return null;

  return (
    <Container>
      <Wrapper>
        <Menu />
        <Board />
      </Wrapper>
      <CustomSetupModal />
    </Container>
  );
}
```
