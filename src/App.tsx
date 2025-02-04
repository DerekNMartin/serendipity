import { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useTransform,
  useMotionValueEvent,
} from 'motion/react';

const defaultList = [
  {
    id: 1,
    title: 'The Secret History',
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1451554846i/29044.jpg',
  },
  {
    id: 2,
    title: 'East of Eden',
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1451554846i/29044.jpg',
  },
  {
    id: 3,
    title: 'The Well of Ascension',
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1451554846i/29044.jpg',
  },
  {
    id: 4,
    title: 'Starter Villain',
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1451554846i/29044.jpg',
  },
  {
    id: 5,
    title: 'Billy Summers',
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1451554846i/29044.jpg',
  },
];

function App() {
  const [list, setList] = useState(defaultList);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isChoosing, setIsChoosing] = useState(false);

  function ListItem({ item }: { item: (typeof list)[0] }) {
    return (
      <article className="w-full max-w-28">
        <img
          src={item.image}
          className="rounded-2xl w-full h-full object-contain"
        />
        <h3 className="text-center font-bold mt-2">{item.title}</h3>
      </article>
    );
  }
  const List = () => {
    return (
      <ul className="flex flex-col gap-6 p-6">
        {list.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>
    );
  };

  const selectedItemElement = useRef(null);
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.floor(count.get()));
  const duration = useTransform(() => (rounded.get() * 25) / 1000);
  useMotionValueEvent(rounded, 'change', () => {
    setSelectedIndex((prev) => prev + 1);
    if (selectedIndex === list.length - 1) setSelectedIndex(0);
  });
  async function pickRandomItem() {
    count.set(0);
    setIsChoosing(true);
    const rand = Math.floor(Math.random() * 10) + 15;
    console.log(rand);
    const animation = animate(count, rand, {
      duration: 6,
      ease: 'easeOut',
      type: 'tween',
    });
    await animation;
    setIsChoosing(false);
    setTimeout(() => {
      animate(
        selectedItemElement.current,
        { scale: 1.75 },
        { type: 'spring', duration: 0.5, bounce: 0.4 }
      );
    }, duration.get() * 1000 + 100);
  }

  const selectedItem = list[selectedIndex];
  return (
    <>
      <main className="grid grid-cols-[0.2fr_1fr] grid-flow-col max-h-screen h-screen">
        <section className="h-full overflow-y-auto border-r border-solid border-neutral-400">
          <button
            className="bg-black rounded py-2 px-4 text-white text-sm font-bold hover:cursor-pointer"
            onClick={pickRandomItem}
          >
            {isChoosing ? 'Choosing...' : 'Choose'}
          </button>
          <List />
        </section>
        <section className="flex flex-col justify-center">
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                ref={selectedItemElement}
                key={selectedIndex}
                initial={{
                  translateY: -100,
                  opacity: 0.5,
                  scale: 0.9,
                }}
                animate={{
                  translateY: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  translateY: 100,
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{
                  type: 'spring',
                  duration: duration.get() + 0.1,
                }}
              >
                <article className="w-full max-w-52">
                  <img
                    src={selectedItem?.image}
                    className="rounded-2xl w-full h-full object-contain"
                  />
                  <h3 className="text-center font-bold mt-2">
                    {selectedItem?.title}
                  </h3>
                </article>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
