"use client";
import { useState } from 'react';
import { selectItems } from '@/lib/data';

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '../ui/textarea';

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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  TypographyH3,
} from "@/components/custom/typography";

import { 
  PlusIcon 
} from 'lucide-react';
import Image from 'next/image';

function Navbar() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    // const { error } = await authClient.signIn.email({
    //   email: email,
    //   password: password,
    //   rememberMe: true,
    //   callbackURL: '/pages/transactions',
    // });

    // if (error) {
    //   setErrors([error.message || "Unknown Error"]);
    //   setLoading(false);
    // };
    
    setLoading(false);
  };

  return (
    <nav className='p-2 
        w-full 
        flex 
        justify-between
        items-center 
        bg-white 
        border-b-2 border-black'
    >
        <div className='flex space-x-2 items-center'>
          <Image
            src='/icons/favicon.ico'
            alt='Gaston Icon'
            height={34}
            width={34}
          />
          <TypographyH3>
            Gastos
          </TypographyH3>
        </div>

        {/* Select Accounts Dropdown */}
        <Select>
          <SelectTrigger 
            className="w-[180px] 
            bg-primary 
            border-2 border-black 
            max-w-[120px]
            text-md"
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

              {/* Create New Account Drawer Form */}
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className='mt-2 w-full bg-gray-200 text-black'>
                    <PlusIcon className='-mr-1'/> New Account
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full px-2 flex flex-col space-y-3">
                    <DrawerHeader className='-mb-2'>
                      <DrawerTitle>Create New Account</DrawerTitle>
                      <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                      <div>
                        <Label htmlFor="name" className="text-md font-medium">
                          Account Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="name"
                          required
                          className="mt-1 h-10 
                          rounded-lg border-2 
                          border-black bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="type" className="text-md font-medium">
                          Account Type
                        </Label>
                        <Select>
                          <SelectTrigger className="w-[180px] bg-white border-2 border-black w-full">
                            <SelectValue placeholder="Select Account Type..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="digital">Digital</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="description" className="text-md font-medium">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          rows={2}
                          required
                          className="mt-1 rounded-lg 
                          border-2 border-black 
                          bg-white text-[16px]"
                        />
                      </div>
                    </form>
                    <DrawerFooter className='flex flex-row justify-between'>
                      <DrawerClose asChild>
                        <Button variant='destructive'>Cancel</Button>
                      </DrawerClose>
                      <Button>Submit</Button>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
              
            </SelectGroup>
          </SelectContent>
        </Select>
    </nav>
  )
};

export default Navbar;