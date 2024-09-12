'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropDown } from './DropDown';
import { X } from 'lucide-react';
import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const fakultas = [
  'FMIPA',
  'FITB',
  'FTTM',
  'STEI',
  'SITH',
  'FTMD',
  'SF',
  'SAPPK',
];

function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [filter, setFilter] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <section className="flex w-full flex-col items-center gap-1">
        {/* Search & Dropdown Section */}
        <section className="flex w-full flex-row gap-3">
          <Input
            type="text"
            placeholder="🔍 Search Aqualings"
            className="h-full border-2 border-orange-300 font-subheading text-base text-orange-300 drop-shadow-orange-shadow-lg placeholder:text-base placeholder:text-orange-300"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()}
          />
          <DropDown items={fakultas} filter={filter} setFilter={setFilter} />
        </section>

        {/* Selected Filter Section */}
        <section className="flex w-full flex-row gap-2">
          {filter.map((val, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-full border-2 border-pink-500 bg-pink-300 px-4 text-sm text-white"
            >
              <p>{val}</p>
              <Button variant="link" className="pl-2 pr-0 pt-1.5">
                <X
                  color="#ee1192"
                  size={16}
                  className="rounded-full bg-white p-0.5"
                  onClick={() => {
                    setFilter((oldFilter) =>
                      oldFilter.filter((value) => value !== val),
                    );
                  }}
                />
              </Button>
            </div>
          ))}
        </section>
      </section>
    </>
  );
}

export default SearchBar;
