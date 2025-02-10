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
        <main className="grid lg:grid-cols-[0.4fr_1fr] sm:grid-cols-2 grid-cols-1 sm:grid-flow-col sm:max-h-screen sm:h-screen p-8 gap-8 h-full">
          <section className="flex flex-col">
            <ChooseList list={list} updateList={setList} />
          </section>
          <section className="flex justify-center">
            <Chooser key="chooser" list={list} />
          </section>
        </main>
      </QueryClientProvider>
    </>
  );
}

export default App;
