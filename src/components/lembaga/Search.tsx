'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropDown } from './DropDown';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
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

  const [filter, setFilter] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('query') ?? '',
  );

  useEffect(() => {
    const initialFilters = searchParams.getAll('faculty');
    if (initialFilters.length > 0) {
      setFilter(initialFilters);
    }
  }, [searchParams]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: string[]) => {
    const params = new URLSearchParams(searchParams);

    params.delete('faculty');

    newFilters.forEach((faculty) => {
      params.append('faculty', faculty);
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
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
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
            onKeyDown={handleKeyDown} // Listen for Enter key
            value={searchTerm} // Controlled input value
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
              <Button
                variant="link"
                className="pl-2 pr-0 pt-1.5"
                onClick={() => {
                  // Remove filter on click
                  setFilter((oldFilter) =>
                    oldFilter.filter((value) => value !== val),
                  );
                }}
              >
                <X
                  color="#ee1192"
                  size={16}
                  className="rounded-full bg-white p-0.5"
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
