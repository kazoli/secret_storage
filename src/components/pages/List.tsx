import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';
import CustomConfirm from '../general/CustomConfirm';
import ListDataBlockEditor from '../list/ListDataBlockEditor';
import ListExportButton from '../list/ListExportButton';
import ListHeader from '../list/ListHeader';
import ListBody from '../list/ListBody';
import ListBodyEmpty from '../list/ListBodyEmpty';

function List() {
  useEffect(() => {
    document.title = 'Secret storage - List';
  }, []);

  const navigate = useNavigate();
  const { storageState } = useAppContext();

  useEffect(() => {
    if (!storageState.loggedIn) {
      navigate('/login');
    }
  }, [storageState.loggedIn]);

  const [filteredData, setFilteredData] = useState(storageState.decodedData);

  useEffect(() => {
    const keywords = storageState.keywords.trim();
    if (keywords) {
      const splittedKeywords = keywords.split(' ');
      // Filter the array based on the specified filterBy value
      const results = storageState.decodedData.filter((dataBlock) => {
        // Check if the title or data contains any of the search keywords
        const matchedKeywords = splittedKeywords.filter((keyword) => {
          if (storageState.searchType === 'all') {
            // match all types of data
            return (
              dataBlock.title.includes(keyword) ||
              dataBlock.data.includes(keyword)
            );
          } else {
            // match only the selected type of data
            return dataBlock[storageState.searchType].includes(keyword);
          }
        });
        // return true if both words can be found
        return matchedKeywords.length === splittedKeywords.length;
      });
      setFilteredData(results);
    } else {
      setFilteredData(storageState.decodedData);
    }
  }, [
    storageState.keywords,
    storageState.searchType,
    storageState.decodedData,
  ]);

  return (
    <DefaultLayout loading={storageState.status === 'loading'}>
      <>
        {storageState.customConfirm && (
          <CustomConfirm {...storageState.customConfirm} />
        )}
        {storageState.exportAvailable && <ListExportButton />}
        {storageState.dataBlockEditor && (
          <ListDataBlockEditor listEditorData={storageState.dataBlockEditor} />
        )}
        <ListHeader />
        {filteredData.length ? (
          <ListBody data={filteredData} view={storageState.view} />
        ) : (
          <ListBodyEmpty />
        )}
      </>
    </DefaultLayout>
  );
}

export default List;
