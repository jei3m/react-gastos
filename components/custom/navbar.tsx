"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { selectItems } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  TypographyH3,
} from "@/components/custom/typography";

import { 
  PlusIcon 
} from 'lucide-react';

function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const disableSelect = pathname !== '/pages/transactions';

  return (
    <nav className='p-2 
      w-full 
      flex 
      justify-between
      items-center 
      bg-white 
      border-b-2 border-black'
    >
      <Link href={'/pages/transactions'} 
        className='flex space-x-2 items-center'
      >
        <Image
          src='/icons/favicon.ico'
          alt='Gaston Icon'
          height={32}
          width={32}
        />
        <TypographyH3>
          Gastos
        </TypographyH3>
      </Link>

      {/* Select Accounts Dropdown */}
      <Select open={open} onOpenChange={setOpen} disabled={disableSelect}>
        <SelectTrigger 
          className="w-[180px] 
          bg-primary 
          border-2 border-black 
          max-w-[120px]
          text-sm"
        >
          <SelectValue placeholder="Accounts" />
        </SelectTrigger>

        <SelectContent className='border-2 border-black'>
          <SelectGroup>
            {selectItems.map((item, index) => (
              <SelectItem 
                value={item.value} 
                key={index}
              >
                {item.title}
              </SelectItem>
            ))}
            <Link href={'/pages/add-account'}>
              <Button 
                onClick={() => setOpen(false)}  
                className='mt-2 w-full bg-gray-300 text-black'
              >
                <PlusIcon className='-mr-1'/> New Account
              </Button>
            </Link>
          </SelectGroup>
        </SelectContent>
      </Select>
    </nav>
  )
};

export default Navbar;