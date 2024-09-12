import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { Menu } from 'lucide-react';
import { type Dispatch, type SetStateAction } from 'react';

type Check = DropdownMenuCheckboxItemProps['checked'];

interface DropdownProps {
  items: string[];
  filter: string[];
  setFilter: Dispatch<SetStateAction<string[]>>;
}

export function DropDown({ items, filter, setFilter }: DropdownProps) {
  const handleCheckedChange = (arr: string[], val: string) => {
    if (arr.includes(val)) {
      setFilter((oldFilter) => oldFilter.filter((value) => value !== val));
    } else {
      setFilter([...filter, val]);
    }
  };

  return (
    <>
      <section className="flex items-center justify-center rounded-md bg-orange-400 p-3 drop-shadow-orange-shadow-lg">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu color="#ffffff" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            alignOffset={-11}
            className="flex w-[200px] flex-col px-3 py-2 drop-shadow-orange-shadow-lg"
          >
            <DropdownMenuLabel className="px-3 py-2 text-orange-500">
              FAKULTAS
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {items.map((value, index) => (
              <DropdownMenuCheckboxItem
                key={index}
                checked={filter.includes(value)}
                onCheckedChange={() => handleCheckedChange(filter, value)}
                className="flex justify-between py-2 pr-3 text-orange-300 focus:rounded-md focus:bg-orange-100 focus:text-orange-400"
              >
                {value}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </>
  );
}
