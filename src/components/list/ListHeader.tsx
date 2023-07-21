import ListAddNew from './ListAddNew';
import ListSearch from './ListSearch';
import ListSearchType from './ListSearchType';
import ListView from './ListView';

function ListHeader() {
  return (
    <section className="flex flex-wrap gap-[10px]">
      <ListSearch />
      <div className="flex flex-wrap-reverse gap-[10px] flex-[1_1_auto] justify-between">
        <ListAddNew />
        <div className="flex flex-wrap gap-[10px]">
          <ListSearchType />
          <ListView />
        </div>
      </div>
    </section>
  );
}

export default ListHeader;
