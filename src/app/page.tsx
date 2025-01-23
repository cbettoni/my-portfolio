'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Header from '@/components/header';
import '@/styles/globals.scss';


export default function Home() {
  return (
      <main>
          <Header />
          <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
              THIS IS A TEST
          </div>
      </main>


  );
}
