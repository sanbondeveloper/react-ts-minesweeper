import React from 'react';
import { BiSolidBomb } from 'react-icons/bi';
import { IoIosFlag } from 'react-icons/io';

import { Cell } from './styles';
import { BOARD_STATUS } from '../../lib/constants';

interface Props {
  status: number;
  value: number;
}

const BoardCell = React.memo(function BoardCell({ status, value }: Props) {
  const show = status !== BOARD_STATUS.CLOSE && status !== BOARD_STATUS.FLAG && status !== BOARD_STATUS.BLUE;

  return (
    <Cell $show={show} $count={value} $status={status}>
      {(() => {
        if (status === BOARD_STATUS.FLAG) return <IoIosFlag />;

        if (!show) return '';

        if (value === BOARD_STATUS.BOMB || status === BOARD_STATUS.NOTBOMB)
          return (
            <>
              <div className="x">X</div>
              <BiSolidBomb />
            </>
          );

        if (value === 0) return '';

        return value;
      })()}
    </Cell>
  );
});

export default BoardCell;
