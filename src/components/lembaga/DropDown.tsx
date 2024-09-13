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
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function DropDown({ items, filter, setFilter }: DropdownProps) {
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
            className="no-scrollbar mt-4 flex h-72 w-[200px] flex-col overflow-y-scroll px-3 py-2 drop-shadow-orange-shadow-lg"
          >
            <DropdownMenuLabel className="py-2 text-orange-500">
              FAKULTAS
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {items.map((value, index) => (
              <DropdownMenuCheckboxItem
                key={index}
                checked={filter === value}
                onCheckedChange={() => {
                  filter === value ? setFilter('') : setFilter(value);
                }}
                className="flex justify-between p-2 text-orange-300 focus:rounded-md focus:bg-orange-100 focus:text-orange-400"
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
