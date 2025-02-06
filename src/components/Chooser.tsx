import { useState, useRef } from 'react';
import { motion, animate, useAnimation } from 'motion/react';

export type ListItem = {
  id: string;
  title: string;
  image: string;
};

export type ChooserProps = {
  list: ListItem[];
};

export function Chooser({ list }: ChooserProps) {
  const [cycleList, setCycleList] = useState(list);
  const [isChoosing, setIsChoosing] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);
  const chosenElement = useRef<Element | null>(null);
  const controls = useAnimation();

  async function resetChosen() {
    if (chosenElement.current) {
      await animate(
        chosenElement.current,
        {
          scale: 1,
          position: '',
          width: '',
          height: '',
        },
        { duration: 0.2, ease: 'circOut' }
      );
    }
  }

  async function cycleOptions() {
    let cycles = 0;
    const totalCycles = Math.floor(Math.random() * 10) + 20; // Random number of cycles
    let delay = 5; // Starting animation speed

    while (cycles < totalCycles) {
      await controls.start({
        y: '-100%',
        transition: {
          duration: delay / 1000,
          ease: 'linear',
        },
      });
      setCycleList((prev) => {
        const updatedList = [...prev];
        const firstItem = updatedList.shift();
        if (firstItem) updatedList.push(firstItem);
        return updatedList;
      });
      controls.set({ y: 0 });
      cycles++;
      delay += 30; // Gradually slow down
    }
  }

  function presentFinalResult() {
    chosenElement.current = slotRef.current?.children.item(0) || null;
    if (chosenElement.current) {
      const width = chosenElement.current.getBoundingClientRect().width;
      const height = chosenElement.current.getBoundingClientRect().height;
      animate(
        chosenElement.current,
        { scale: 1.4, width, height, position: 'fixed' },
        { type: 'spring', duration: 0.3 }
      );
    }
  }

  async function roll() {
    setIsChoosing(true);
    await resetChosen();
    await cycleOptions();
    setTimeout(presentFinalResult, 200);
    setIsChoosing(false);
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <section className="relative w-[350px] h-[537px] overflow-hidden rounded-2xl">
        <motion.div
          className="absolute w-full h-full flex flex-col gap-4"
          ref={slotRef}
          animate={controls}
        >
          {cycleList.map((item) => (
            <img
              key={item.id}
              data-id={item.id}
              src={item.image}
              className="w-full h-full object-cover rounded-2xl"
            />
          ))}
        </motion.div>
      </section>
      <button
        className="bg-black rounded py-2 px-4 text-white text-sm font-bold hover:cursor-pointer mt-40"
        onClick={roll}
      >
        {isChoosing ? 'Choosing...' : 'Choose'}
      </button>
    </div>
  );
}
