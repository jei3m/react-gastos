import { selectItems } from '@/lib/data';

import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  TypographyH2,
} from "@/components/custom/typography";

import { 
  PlusIcon 
} from 'lucide-react';

function Navbar() {
  return (
    <nav className='p-2 
        w-full 
        flex 
        justify-between
        items-center 
        bg-white 
        border-b-2 border-black'
    >
        <TypographyH2>
          Gastos
        </TypographyH2>

        {/* Select Accounts Dropdown */}
        <Select>
          <SelectTrigger 
            className="w-[180px] 
            bg-primary 
            border-2 border-black 
            max-w-[120px]"
          >
            <SelectValue placeholder="Accounts" />
          </SelectTrigger>

          <SelectContent className='border-2 border-black'>
            <SelectGroup>
              <SelectLabel>
                Accounts
              </SelectLabel>
              {selectItems.map((item, index) => (
                <SelectItem 
                  value={item.value} 
                  key={index}
                >
                  {item.title}
                </SelectItem>
              ))}
              <Button className='mt-2 w-full bg-gray-200 text-black'>
                <PlusIcon className='-mr-1'/> New Account
              </Button>
            </SelectGroup>
          </SelectContent>
        </Select>
    </nav>
  )
};

export default Navbar;