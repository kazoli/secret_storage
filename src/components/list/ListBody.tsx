import { tStorageInitialState } from '../../app/storage/storageTypes';
import ListBodyElement from './ListBodyElement';

type tProps = {
  data: tStorageInitialState['decodedData'];
  view: string;
};

function ListBody(props: tProps) {
  const view =
    props.view === 'list'
      ? ''
      : 'sm:grid-cols-[repeat(auto-fill,minmax(375px,1fr))]';

  return (
    <section className={`mt-[20px] grid gap-[10px] ${view}`}>
      {props.data.map((dataBlock) => (
        <ListBodyElement key={dataBlock.id} dataBlock={dataBlock} />
      ))}
    </section>
  );
}

export default ListBody;
