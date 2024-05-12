import Modal from 'react-modal';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectModalIsOpen, updateModal } from '../../redux/slice/modalSlice';
import CustomSetup from '../CustomSetup';
import { useCallback } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    opacipy: '0.1',
  },
};

Modal.setAppElement('#root');

function CommonModal() {
  const isOpen = useAppSelector(selectModalIsOpen);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(updateModal(false));
  }, [dispatch]);

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={handleClose}>
      <CustomSetup onClose={handleClose} />
    </Modal>
  );
}

export default CommonModal;
