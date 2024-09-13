'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropDown } from './DropDown';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { debounce } from 'lodash';

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

  const oldTerm = searchParams.get('query') ?? '';
  const oldFilter = searchParams.get('faculty') ?? '';

  const [filter, setFilter] = useState<string>(
    searchParams.get('faculty') ?? '',
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('query') ?? '',
  );

  // Debounced search handler to optimize URL updates
  const debouncedSearch = debounce((term: string, filterParams: string) => {
    const params = new URLSearchParams(searchParams);

    // Update search term in query params
    if (term) {
      params.set('query', term);
      if (term != oldTerm) {
        params.set('page', '1');
      }
    } else {
      params.delete('query');
    }

    // Update faculty filter in query params
    if (filter !== '') {
      params.set('faculty', filter);
      if (filter != oldFilter) {
        params.set('page', '1');
      }
    } else {
      params.delete('faculty');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm, filter);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, filter]);

  return (
    <section className="flex w-full flex-col items-center gap-1">
      {/* Search & Dropdown Section */}
      <section className="flex w-full flex-row gap-3">
        <Input
          type="text"
          placeholder="🔍 Search Aqualings"
          className="h-full border-2 border-orange-300 font-subheading text-base text-orange-300 drop-shadow-orange-shadow-lg placeholder:text-base placeholder:text-orange-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DropDown items={fakultas} filter={filter} setFilter={setFilter} />
      </section>

      {/* Selected Filter Section */}
      <section className="mt-2 flex w-full flex-row gap-2">
        {filter !== '' && (
          <div className="flex items-center justify-center rounded-full border-2 border-pink-500 bg-pink-300 px-4 text-sm text-white">
            <p>{filter}</p>
            <Button variant="link" className="pl-2 pr-0 pt-1.5">
              <X
                color="#ee1192"
                size={16}
                className="rounded-full bg-white p-0.5"
                onClick={() => {
                  setFilter(''); // Clear the filter
                }}
              />
            </Button>
          </div>
        )}
      </section>
    </section>
  );
}

export default SearchBar;
