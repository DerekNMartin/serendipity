import { motion, AnimatePresence } from 'motion/react';
import { ChooseSearch } from './ChooseSearch';
import { XMarkIcon } from '@heroicons/react/24/outline';

export type ListItem = {
  id: string;
  title: string;
  image: string;
};

export type ChooserListProps = {
  list: ListItem[];
  updateList: React.Dispatch<React.SetStateAction<ListItem[]>>;
};

export function ChooseList({ list, updateList }: ChooserListProps) {
  function addToList(item: string | ListItem) {
    const newItem =
      typeof item === 'string'
        ? {
            id: crypto.randomUUID(),
            title: item,
            image: '',
          }
        : item;
    updateList((prevList) => [...prevList, newItem]);
  }

  function removeFromList(itemId: string) {
    const newList = list.filter(({ id }) => id !== itemId);
    updateList(newList);
  }

  function ItemImage({ item }: { item?: ListItem }) {
    return item?.image ? (
      <img
        src={item.image}
        className="rounded object-cover border-3 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-shadow w-full h-full"
      />
    ) : (
      <div className="bg-blue-600 rounded text-center text-xs flex justify-center items-center p-1 text-white max-w-full">
        {item?.title}
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 gap-6 overflow-y-auto overflow-x-clip border-3 border-solid border-black rounded-md bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] h-full">
      <section className="flex justify-center">
        <ChooseSearch onSubmit={addToList} />
      </section>
      <ul className="grid grid-cols-3 gap-4">
        <AnimatePresence>
          {list.map((item) => (
            <motion.article
              key={item.id}
              className="flex gap-2 relative aspect-[1/1.4] w-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', duration: 0.3 }}
              layout
            >
              <ItemImage item={item} />
              <button
                className="absolute rounded-full w-6 h-6 bg-black cursor-pointer -top-2 -right-2 flex items-center justify-center transition-transform hover:scale-110"
                onClick={() => removeFromList(item.id)}
              >
                <XMarkIcon className="text-white w-4 h-4 font-bold stroke-3" />
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
