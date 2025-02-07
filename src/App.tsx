import type { ListItem } from './components/ChooseList';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Chooser } from './components/Chooser';
import { ChooseList } from './components/ChooseList';

const queryClient = new QueryClient();

function App() {
  const [list, setList] = useState<ListItem[]>([]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main className="grid grid-cols-[0.3fr_1fr] grid-flow-col max-h-screen h-screen bg-yellow-300">
          <section className="max-h-screen h-full p-8">
            <ChooseList list={list} updateList={setList} />
          </section>
          <section className="flex justify-center">
            <Chooser list={list} />
          </section>
        </main>
      </QueryClientProvider>
    </>
  );
}

export default App;
