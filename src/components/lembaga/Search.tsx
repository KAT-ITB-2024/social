'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropDown } from './DropDown';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const fakultas = [
  'FITB',
  'FMIPA',
  'FSRD',
  'FTMD',
  'FTTM',
  'FTSL',
  'FTI',
  'SAPPK',
  'SBM',
  'SF',
  'SITH',
  'STEI',
];

function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [filter, setFilter] = useState<string>('');

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    if (filter !== '') {
      params.set('faculty', filter);
    } else {
      params.delete('faculty');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    handleSearch(searchParams.get('query')?.toString() ?? '');
  }, [filter]);

  useEffect(() => {
    router.replace(`${pathname}`);
  }, []);

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
          />
          <DropDown items={fakultas} filter={filter} setFilter={setFilter} />
        </section>

        {/* Selected Filter Section */}
        <section className="flex w-full flex-row gap-2">
          {filter !== '' && (
            <div className="flex items-center justify-center rounded-full border-2 border-pink-500 bg-pink-300 px-4 text-sm text-white">
              <p>{filter}</p>
              <Button variant="link" className="pl-2 pr-0 pt-1.5">
                <X
                  color="#ee1192"
                  size={16}
                  className="rounded-full bg-white p-0.5"
                  onClick={() => {
                    setFilter('');
                  }}
                />
              </Button>
            </div>
          )}
        </section>
      </section>
    </>
  );
}

export default SearchBar;
