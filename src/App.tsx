import type { ListItem } from './components/ChooseList';

import { Chooser } from './components/Chooser';
import { ChooseList } from './components/ChooseList';
import { useState } from 'react';

const defaultList = [
  {
    id: '1',
    title: 'The Secret History',
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1451554846i/29044.jpg',
  },
  {
    id: '2',
    title: 'East of Eden',
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1639969375i/4406.jpg',
  },
  {
    id: '3',
    title: 'The Well of Ascension',
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1619538925i/68429.jpg',
  },
  {
    id: '4',
    title: 'Starter Villain',
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1683564155i/61885029.jpg',
  },
  {
    id: '5',
    title: 'Billy Summers',
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1618151020i/56852407.jpg',
  },
];

function App() {
  const [list, setList] = useState<ListItem[]>(defaultList);
  return (
    <>
      <main className="grid grid-cols-[0.2fr_1fr] grid-flow-col max-h-screen h-screen">
        <section className="h-full overflow-y-auto border-r border-solid border-neutral-400">
          <ChooseList list={list} updateList={setList} />
        </section>
        <section className="flex justify-center">
          <Chooser list={list} />
        </section>
      </main>
    </>
  );
}

export default App;
