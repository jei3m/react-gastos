"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/custom/navbar';
import { tabItems, transactions } from '@/lib/data';
import { fetchSession } from '@/utils/session';

// ShadCN Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4
} from "@/components/custom/typography";

// Icon Imports
import {
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Dock } from '@/components/custom/dock';

export default function Transactions() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('daily');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  // Validate user session
  useEffect(() => {
    fetchSession().then(({ session }) => {
      if (!session) {
        router.push('/auth/login')
      }
      setUserEmail(session?.user.email ?? '');
    })
  }, []);

  // Set isScrolled
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Function to handle previous or next 
  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (activeTab === 'daily') {
      newDate.setDate(
        newDate.getDate() + (direction === 'prev' ? -1 : 1)
      );
    } else if (activeTab === 'weekly') {
      newDate.setDate(
        newDate.getDate() + (direction === 'prev' ? -7 : 7)
      );
    } else {
      newDate.setMonth(
        newDate.getMonth() + (direction === 'prev' ? -1 : 1)
      );
    }
    setCurrentDate(newDate);
  };

  // Return dateStart, dateEnd, and dateDisplay
  const getDateRange = () => {
    const toISODate = (d: Date) => d.toISOString().slice(0, 10);
    const date = new Date(currentDate);

    if (activeTab === 'daily') {
      const dateStart = new Date(date),
        dateEnd = new Date(date);
      return {
        dateStart: toISODate(dateStart),
        dateEnd: toISODate(dateEnd),
        dateDisplay: dateStart.toLocaleDateString(
          'en-US',
          {
            month: 'long',
            day: 'numeric'
          }
        )
      }
    } else if (activeTab === 'weekly') {
      const dateStart = new Date(date),
        dayOfWeek = dateStart.getDay(),
        diff = dateStart.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1),
        dateEnd = new Date(dateStart);

      // Set dateStart and dateEnd
      dateStart.setDate(diff);
      dateEnd.setDate(dateStart.getDate() + 6);

      return {
        dateStart: toISODate(dateStart),
        dateEnd: toISODate(dateEnd),
        dateDisplay: `${dateStart.toLocaleDateString(
          'en-US',
          {
            month: 'long',
            day: 'numeric'
          })} - 
					${dateEnd.toLocaleDateString(
            'en-US',
            {
              month: 'long',
              day: 'numeric'
            }
          )}`
      }
    } else {
      const dateStart = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), 1)
      )
      const dateEnd = new Date(
        Date.UTC(date.getFullYear(), date.getMonth() + 1, 0)
      );

      return {
        dateStart: toISODate(dateStart),
        dateEnd: toISODate(dateEnd),
        dateDisplay: dateStart.toLocaleDateString(
          'en-US',
          {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC'
          }
        )
      };
    };
  };

  // Declaration of variables for filtering and display
  const { dateStart, dateEnd, dateDisplay } = getDateRange();  

  useEffect(() => {
    console.log(`Date Start: ${dateStart}`);
    console.log(`Date End: ${dateEnd}`);
  },[activeTab])

  // Reset currentDate every tab change
  useEffect(() => {
    setCurrentDate(new Date())
  }, [activeTab])

  return (
    <>
      {/* Date Card Section */}
      <main className='flex flex-col m-auto space-y-2 min-h-[calc(100%-100px)]'>
        {isScrolled ?         
          <section className='sticky top-0 z-10 transition-all'>
            <Card className="-mt-2 w-full border-0 rounded-none">
              <CardHeader
                className='flex
                flex-col 
                justify-center 
                items-center'
              >
                {/* Tabs Selection */}
                <div className='flex items-center gap-x-2'>
                  <Calendar />
                  <Tabs defaultValue='daily' value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className='bg-white'>
                      {tabItems.map((item, index) => (
                        <TabsTrigger
                          value={item.value}
                          key={index}
                        >
                          {/* Capitalized first letter of item.value */}
                          {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                {/* Date Display and Date Change */}
                <div className='w-full'>
                  <div className="flex 
                      justify-between 
                      items-center
                      font-semibold"
                  >
                    <ChevronLeft
                      className='cursor-pointer'
                      onClick={() => handleDateChange('prev')}
                    />
                    {dateDisplay}
                    <ChevronRight
                      className='cursor-pointer'
                      onClick={() => handleDateChange('next')}
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>
            <div className='w-full border-t-2 border-black' />
          </section>
          :
          <section className='pt-2 px-3 transition-all'>
            <Card className="mt-0 w-full border-2 ">
              <CardHeader
                className='flex
                flex-col 
                justify-center 
                items-center'
              >
                {/* Tabs Selection */}
                <div className='flex items-center gap-x-2'>
                  <Calendar />
                  <Tabs defaultValue='daily' value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className='bg-white'>
                      {tabItems.map((item, index) => (
                        <TabsTrigger
                          value={item.value}
                          key={index}
                        >
                          {/* Capitalized first letter of item.value */}
                          {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                {/* Date Display and Date Change */}
                <div className='w-full'>
                  <div className="flex 
                      justify-between 
                      items-center
                      font-semibold"
                  >
                    <ChevronLeft
                      className='cursor-pointer'
                      onClick={() => handleDateChange('prev')}
                    />
                    {dateDisplay}
                    <ChevronRight
                      className='cursor-pointer'
                      onClick={() => handleDateChange('next')}
                    />
                  </div>
                </div>
              </CardHeader>

              {/* Line Separator */}
              <div className='w-full border-t border-gray-300' />

              <CardContent className='flex flex-col gap-y-4'>
                <div className='flex flex-col'>
                  <h3 className='text-gray-600 font-normal text-lg'>
                    Balance
                  </h3>
                  <h1 className='text-2xl font-extrabold'>
                    PHP 1,200.00
                  </h1>
                </div>
                <div className='flex flex-row justify-between w-full'>
                  <div className='flex flex-col'>
                    <h4 className='text-gray-600 font-normal text-md'>
                      Total Income
                    </h4>
                    <h1 className='text-xl font-bold text-green-500'>
                      PHP 1,200.00
                    </h1>
                  </div>
                  <div className='flex flex-col'>
                    <h4 className='text-gray-600 font-normal text-md'>
                      Total Expenses
                    </h4>
                    <h1 className='text-xl font-bold text-red-500'>
                      PHP 1,200.00
                    </h1>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        }


        {/* Transactions Section */}
        <section className='flex flex-col space-y-2 px-3 mb-2'>
          {transactions ? 
            <>
              {transactions.map((transaction, index) => (
                <Card key={index} className='border-2'>
                  <CardHeader>
                    <CardTitle className='flex justify-between'>
                      <span>{transaction.date}</span>
                      <span className='text-red-500'>{transaction.total}</span>
                    </CardTitle>
                  </CardHeader>
                  <div className='w-full border-t border-gray-300' />
                  <CardContent className='-mb-4'>
                    {transaction.details.map((detail, index) => (
                      <div key={index} className='space-y-3 flex flex-row items-center justify-between'>
                        <div className='flex flex-col text-sm'>
                          <span>
                            {detail.category}
                          </span>
                          <span className='text-gray-600'>
                            {detail.note}
                          </span>
                        </div>
                        <span className='text-sm text-red-500'>
                          {detail.amount}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </>
            :
            <></>
          }

        </section>
      </main>
    </>
  );
};