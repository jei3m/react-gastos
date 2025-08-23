"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/custom/navbar';
import { tabItems } from '@/lib/data';
import { fetchSession } from '@/utils/session';

// ShadCN Components
import { Button } from '@/components/ui/button';
import {
	Card,
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

export default function Transactions() {
	const [activeTab, setActiveTab] = useState('daily');
	const [currentDate, setCurrentDate] = useState(new Date());
	const router = useRouter();

	useEffect(() => {
		fetchSession().then(({session}) => {
			if (!session) {
				router.push('/auth/login')
			}
		})
	},[]);

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
		const date = new Date(currentDate);
		
		if (activeTab === 'daily') {
			const dateStart = new Date(date),
				dateEnd = new Date(date);
			return{
				dateStart,
				dateEnd,
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

			return{
				dateStart,
				dateEnd,
				dateDisplay: `${dateStart.toLocaleDateString(
					'en-US', 
					{ month: 'long', 
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
			const dateStart = new Date(date.getFullYear(), date.getMonth(), 1),
				dateEnd = new Date(
					date.getFullYear(), 
					date.getMonth() + 1, 0
				);
			
			return {
				dateStart,
				dateEnd,
				dateDisplay: dateStart.toLocaleDateString(
					'en-US', 
					{ 
						month: 'long', 
						year: 'numeric'
					}
				)
			};
		};
	};

	// Declaration of variables for filtering and display
	const {dateStart, dateEnd, dateDisplay} = getDateRange();

	// Reset currentDate every tab change
	useEffect(() => {
		setCurrentDate(new Date())
	},[activeTab])

	return (
		<>
			<Navbar/>

			{/* Date Card Section */}
			<main className='max-w-[600px] m-auto'>
				<section className='w-full px-4 mt-4'>
					<Tabs defaultValue='daily' value={activeTab} onValueChange={setActiveTab}>
						<Card className="mt-0 w-full border-2">
							<CardHeader 
								className='flex
								flex-col 
								justify-center 
								items-center
								-mt-4'
							>
								{/* Tabs Selection */}
								<div className='flex items-center gap-x-2'>
									<Calendar />
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
							<div className='w-full -mt-4 border-t border-gray-300'/>

							<CardContent className='-mt-4 flex flex-col gap-y-4'>
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
										<h1 className='text-xl font-bold text-green-600'>
											PHP 1,200.00
										</h1>
									</div>
									<div className='flex flex-col'>
										<h4 className='text-gray-600 font-normal text-md'>
											Total Expenses
										</h4>
										<h1 className='text-xl font-bold text-red-600'>
											PHP 1,200.00
										</h1>
									</div>
								</div>
							</CardContent>
						</Card>
					</Tabs>
				</section>
			</main>
		</>
	);
};