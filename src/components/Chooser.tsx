import { useState, useRef, useEffect } from 'react';
import { motion, animate, useAnimation, AnimatePresence } from 'motion/react';
import type { ListItem } from './ChooseList';
import { Button } from './Button';

export type ChooserProps = {
  list: ListItem[];
};

export function Chooser({ list }: ChooserProps) {
  const [cycleList, setCycleList] = useState(list);
  const [isChoosing, setIsChoosing] = useState(false);
  const [chosenItem, setChosenItem] = useState<ListItem | null>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const chosenElement = useRef<HTMLElement | null>(null);
  const controls = useAnimation();

  useEffect(() => setCycleList(list), [list]);

  async function resetChosen() {
    if (chosenElement.current) {
      setChosenItem(null);
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
    const totalCycles = Math.floor(Math.random() * 10) + 20;
    let delay = 5;

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

  async function presentFinalResult() {
    chosenElement.current =
      (slotRef.current?.children.item(0) as HTMLElement) || null;
    if (chosenElement.current) {
      const width = chosenElement.current.getBoundingClientRect().width;
      const height = chosenElement.current.getBoundingClientRect().height;
      const item = list.find(
        ({ id }) => id === chosenElement.current?.dataset.id
      );
      if (item) setChosenItem(item);
      await animate(
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
    <div className="flex items-center justify-center flex-col w-fit">
      <section className="overflow-hidden rounded-md border-3 border-solid border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] flex justify-center items-center bg-green-400 p-12">
        <motion.div
          className="w-[350px] h-[540px] flex flex-col gap-4"
          ref={slotRef}
          animate={controls}
        >
          <AnimatePresence>
            {cycleList.map((item) => (
              <motion.img
                key={item.id}
                data-id={item.id}
                src={item.image}
                className={`w-full h-full object-cover rounded-2xl border-3 border-solid border-black ${
                  item.id === chosenItem?.id
                    ? 'shadow-[8px_8px_0px_rgba(0,0,0,1)]'
                    : ''
                }`}
                exit={{ opacity: 0 }}
                layout={isChoosing ? false : true}
                onClick={resetChosen}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
      <Button className="mt-40 w-full" onClick={roll}>
        {isChoosing ? 'Choosing...' : 'Choose for me!'}
      </Button>
    </div>
  );
}
