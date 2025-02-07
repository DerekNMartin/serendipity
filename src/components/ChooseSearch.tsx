import type { ListItem } from './ChooseList';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { AnimatePresence, motion } from 'motion/react';

import { searchOpenLibrary, coverImageUrl } from '../api/openLibrary';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import { Input } from './Input';

interface SearchResult {
  id: string;
  author: string;
  author_id: string;
  title: string;
  cover_edition_key: string;
}

export function ChooseSearch({
  onSubmit,
}: {
  onSubmit: (input: string | ListItem) => void;
}) {
  const [inputHasFocus, setInputHasFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isPending } = useQuery({
    enabled: Boolean(debouncedSearchTerm),
    placeholderData: keepPreviousData,
    queryKey: ['openLibrarySearch', debouncedSearchTerm],
    queryFn: () =>
      searchOpenLibrary({ q: debouncedSearchTerm, page: 1, limit: 5 }),
    select: (data) => {
      return data.docs.map<SearchResult>((bookResult) => ({
        id: bookResult.key,
        author: bookResult.author_name[0],
        author_id: bookResult.author_key[0],
        title: bookResult.title,
        cover_edition_key: bookResult.cover_edition_key,
      }));
    },
  });

  const showResultDropdown =
    data?.length && searchTerm && inputHasFocus && !isPending;

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  async function handleSubmit(item?: SearchResult) {
    if (item) {
      onSubmit({
        id: item.id,
        title: item.title,
        image: coverImageUrl(item.cover_edition_key, 'L'),
      });
    } else {
      onSubmit(searchTerm);
    }
    setSearchTerm('');
  }

  function ResultListItem({ item }: { item: SearchResult }) {
    const image = item.cover_edition_key ? (
      <img
        src={coverImageUrl(item.cover_edition_key, 'M')}
        className="min-w-10 max-w-10 h-15 object-cover rounded"
      />
    ) : (
      <div className="bg-blue-600 rounded min-w-10 h-14" />
    );
    return (
      <li
        className="border-b-3 last:border-b-0 flex gap-2 items-center p-2 hover:bg-fuchsia-400 hover:cursor-pointer"
        onMouseDown={() => handleSubmit(item)}
      >
        {image}
        <p className="font-bold">
          {item.title} - {item.author}
        </p>
      </li>
    );
  }

  return (
    <div className="flex gap-2 w-full relative">
      <Input
        type="text"
        value={searchTerm}
        onChange={handleInput}
        className="w-full"
        onFocus={() => setInputHasFocus(true)}
        onBlur={() => setInputHasFocus(false)}
      />
      <Button onClick={() => handleSubmit()}>
        <PlusIcon className="text-black w-6 h-6 stroke-[2.5]" />
      </Button>
      <AnimatePresence propagate>
        {showResultDropdown && (
          <motion.div
            key="results-dropdown"
            className="absolute border-3 bg-white rounded-md z-10 w-full translate-y-14 origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.2 }}
          >
            <ul className="flex flex-col text-xs">
              {data?.map((result) => (
                <ResultListItem key={result.id} item={result} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
