import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { Input } from './Input';

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
    updateList((prevList) => [...prevList, newItem]);
    setInput('');
  }

  function removeFromList(itemId: string) {
    const newList = list.filter(({ id }) => id !== itemId);
    updateList(newList);
  }

  function ItemImage({ imageSrc }: { imageSrc?: string }) {
    return imageSrc ? (
      <img
        src={imageSrc}
        className="rounded-2xl w-full h-96 object-cover border-3 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-shadow"
      />
    ) : (
      <div className="bg-blue-600 rounded-2xl w-full h-96" />
    );
  }

  return (
    <div className="flex flex-col p-6 gap-6 overflow-y-auto overflow-x-clip h-full w-full border-3 border-solid border-black rounded-md bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]">
      <section className="flex justify-center">
        <div className="flex gap-2 w-full">
          <Input
            type="text"
            value={input}
            onChange={handleInput}
            className="w-full"
          />
          <Button onClick={addToList}>Add</Button>
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
              <p className="text-center font-bold mt-2">{item.title}</p>
            </motion.article>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
