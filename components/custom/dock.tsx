'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { DockItem, DockProps } from '@/types/dock.types';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftRight, 
  PlusSquare 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const defaultItems: DockItem[] = [
  { label: 'transactions', icon: ArrowLeftRight, route:'/pages/transactions' },
  { label: 'add transaction', icon: PlusSquare, route:'/pages/add-transaction' },
];
export const Dock: React.FC<DockProps> = ({ 
  items, 
  className,
  variant = 'default',
  orientation = 'horizontal',
  showLabels = true,
  animated = false
}) => {
  const finalItems = useMemo(() => {
     const isValid = items && Array.isArray(items) && items.length >= 2 && items.length <= 8;
     if (!isValid) {
        console.warn("Dock: 'items' prop is invalid or missing. Using default items.", items);
        return defaultItems;
     }
     return items;
  }, [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlineLeft, setUnderlineLeft] = useState(0);
  
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
      if (activeIndex >= finalItems.length) {
          setActiveIndex(0);
      }
  }, [finalItems, activeIndex]);
  const handleItemClick = (index: number, item: DockItem) => {
    router.push(item.route);
    setActiveIndex(index);
    item.onClick?.();
  };
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'p-1',
          item: 'p-2 min-w-12',
          icon: 'h-4 w-4',
          text: 'text-xs'
        };
      default:
        return {
          container: 'p-0',
          item: 'p-2 min-w-14',
          icon: 'h-7 w-7',
          text: 'text-[10px] -mt-1'
        };
    }
  };
  const styles = getVariantStyles();
  const router = useRouter();
  return (
    <nav
      className={cn(
        'overflow-x-hidden inline-flex justify-center rounded-0 bg-card border-t-2',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        styles.container,
        className
      )}
      role="navigation"
    >
      {finalItems.map((item, index) => {
        const isActive = index === activeIndex;
        const IconComponent = item.icon;
        return (
          <button
            key={`${item.label}-${index}`}
            ref={(el) => { itemRefs.current[index] = el; }}
            className={cn(
              'relative flex flex-col items-center justify-center rounded-lg transition-all duration-200',
              'hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              styles.item,
              isActive && 'text-primary',
              !isActive && 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => handleItemClick(index, item)}
            aria-label={item.label}
            type="button"
          >
            <div className={cn(
              'flex items-center justify-center transition-all duration-200',
              animated && isActive && 'animate-bounce',
              orientation === 'horizontal' && showLabels ? 'mb-1' : '',
              orientation === 'vertical' && showLabels ? 'mb-1' : ''
            )}>
              <IconComponent className={cn(styles.icon, 'transition-colors duration-200')} />
            </div>
            
            {showLabels && (
              <span
                ref={(el) => { textRefs.current[index] = el; }}
                className={cn(
                  'font-medium transition-colors duration-200 capitalize',
                  styles.text,
                  'whitespace-nowrap'
                )}
              >
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};