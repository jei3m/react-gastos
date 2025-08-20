import type { HTMLAttributes, ReactNode } from 'react';

export function TypographyH1({
    children,
    ...props
}: HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
        {...props}
    >
      {children}
    </h1>
  )
};

export function TypographyH2({
    children,
    ...props
}: HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) {
  return (
    <h2 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance"
        {...props}
    >
      {children}
    </h2>
  )
};

export function TypographyH3({
    children,
    ...props    
}: HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight"
        {...props}
    >
      {children}
    </h3>
  )
};

export function TypographyH4({
    children,
    ...props  
}: HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight"
        {...props}
    >
      {children}
    </h4>
  )
};

export function TypographyP({
    children,
    ...props  
}: HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6"
        {...props}
    >
      {children}
    </p>
  )
};