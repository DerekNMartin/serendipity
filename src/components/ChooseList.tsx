import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [input, setInput] = useState<string>('');

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  function addToList() {
    const newItem = {
      id: crypto.randomUUID(),
      title: input,
      image: '',
    };
    updateList([...list, newItem]);
  }

  function removeFromList(itemId: string) {
    const newList = list.filter(({ id }) => id !== itemId);
    updateList(newList);
  }

  function ItemImage({ imageSrc }: { imageSrc?: string }) {
    return imageSrc ? (
      <img src={imageSrc} className="rounded-2xl w-full h-96 object-cover" />
    ) : (
      <div className="bg-neutral-200 rounded-2xl w-full h-96" />
    );
  }

  return (
    <div className="flex flex-col p-6 gap-6">
      <section className="flex justify-center">
        <div className="flex gap-2 w-full">
          <input
            type="text"
            value={input}
            onChange={handleInput}
            className="border border-solid border-neutral-300 rounded px-2 w-full"
          />
          <button
            className="bg-black rounded text-white p-2 px-3 text-sm"
            onClick={addToList}
          >
            Add
          </button>
        </div>
      </section>
      <ul className="flex flex-col gap-6 items-center">
        <AnimatePresence>
          {list.map((item) => (
            <motion.article
              key={item.id}
              className="w-full"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              layout
            >
              <div className="relative">
                <ItemImage imageSrc={item.image} />
                <button
                  className="absolute rounded-full w-6 h-6 bg-black cursor-pointer -top-2 -right-2"
                  onClick={() => removeFromList(item.id)}
                />
              </div>
              <h3 className="text-center font-bold mt-2 text-sm">
                {item.title}
              </h3>
            </motion.article>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
