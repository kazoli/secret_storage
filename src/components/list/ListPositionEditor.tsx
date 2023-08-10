import { useState, useEffect } from 'react';
import { storageSettings } from '../../app/storage/storageInitialStates';
import { useAppContext } from '../core/Context';
import PopUp from '../general/PopUp';
import FormInputBlock from '../form/FormInputBlock';
import FormButtonBlock from '../form/FormButtonBlock';

function ListPositionEditor() {
  const { storageState, storageDispatch } = useAppContext();
  const [position, setPosition] = useState(
    storageState.listPositionEditor ? storageState.listPositionEditor : '',
  );
  const [error, setError] = useState('');

  const buttons = [
    {
      text: 'Save new position',
      action: () => {
        console.log('Change position');
      },
    },
    {
      text: 'Cancel',
      action: () => console.log('Cancel'),
      // storageDispatch({
      //   type: tStorageActionTypes.setPosition,
      //   payload: false,
      // }),
    },
  ];

  return (
    <PopUp>
      <FormInputBlock
        type="text"
        label="Enter position where to be moved"
        id="position"
        placeholder="Integer number"
        value={position}
        action={(value) => setPosition(value)}
        error={error}
      />
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
}

export default ListPositionEditor;
