'use client';
import React, {useEffect} from 'react'

export default function page() {
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/tests');
      const data = await res.json();
      console.log(data)
    })();
  }, []);
  return (
    <div>page</div>
  )
};
