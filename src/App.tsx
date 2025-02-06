import { useState } from 'react';
import { Chooser } from './components/Chooser';

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
  const [list, setList] = useState(defaultList);

  const List = () => {
    return (
      <ul className="flex flex-col gap-6 p-6">
        {list.map((item) => (
          <article key={item.id} className="w-full max-w-28">
            <img
              src={item.image}
              className="rounded-2xl w-full h-full object-contain"
            />
            <h3 className="text-center font-bold mt-2">{item.title}</h3>
          </article>
        ))}
      </ul>
    );
  };

  return (
    <>
      <main className="grid grid-cols-[0.2fr_1fr] grid-flow-col max-h-screen h-screen">
        <section className="h-full overflow-y-auto border-r border-solid border-neutral-400">
          <List />
        </section>
        <section className="flex flex-col justify-center">
          <Chooser list={list} />
        </section>
      </main>
    </>
  );
}

export default App;
