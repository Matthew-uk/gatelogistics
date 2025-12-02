'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils'; // optional; replace with your helper or inline concat
import { Input } from '@/components/ui/input'; // adapt to your shadcn exports
import { Button } from '@/components/ui/button'; // adapt to your shadcn exports
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type FormValues = {
  trackingNumber: string;
};

export default function TrackingSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { trackingNumber: '' },
  });

  const router = useRouter();

  const [result, setResult] = useState<null | {
    status: string;
    summary: string;
    code: string;
    trackingCode: string;
  }>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: FormValues) {
    // router.push(`/trackings/${values.trackingNumber}`);
    setError(null);
    setResult(null);
    try {
      const resp = await axios.post('/api/trackings', {
        trackingNumber: values.trackingNumber,
      });
      setResult(resp.data);
      // keep the tracking number in the input or reset depending on UX; I'll reset
      reset();
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ??
          'Could not fetch tracking info. Please try again.',
      );
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-6 xl:px-0 py-16">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 text-center mb-8">
        Track Your Shipment
      </h2>

      {/* Form row centered like design */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center mb-12"
        aria-label="Track your shipment form"
      >
        <div className="w-full max-w-3xl flex items-stretch">
          {/* Input: large light-gray background and thin border */}
          <div className="flex-1">
            {/* We use a plain input (or shadcn Input) — sized to match screenshot */}
            <Input
              id="trackingNumber"
              {...register('trackingNumber', {
                required: 'Please enter a tracking number',
                minLength: { value: 3, message: 'Enter at least 3 characters' },
              })}
              placeholder="Tracking Number..."
              className={cn(
                'h-12 lg:h-14 px-2 md:px-6 border border-gray-200 bg-[#efefef] placeholder-gray-500 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none rounded-none text-sm',
                errors.trackingNumber ? 'ring-1 ring-red-500' : '',
              )}
              aria-invalid={!!errors.trackingNumber}
            />
          </div>

          {/* Search button: fixed square orange block aligned on the right */}
          <div className="w-[56px] lg:w-[56px]">
            <Button
              type="submit"
              className="w-full h-full bg-orange-400 hover:bg-orange-500 text-white rounded-none flex items-center justify-center px-0"
              disabled={isSubmitting}
              aria-label="Search tracking"
            >
              <Search size={18} />
            </Button>
          </div>
        </div>
        {errors.trackingNumber && (
          <p className="text-xs text-start max-w-3xl md:min-w-3xl text-red-600 mt-2">
            {errors.trackingNumber.message}
          </p>
        )}
      </form>

      {/* Big image centered */}
      {!result && !error && (
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-3xl h-[240px] lg:h-[460px]">
            <Image
              src="/faq-truck.jpg"
              alt="truck and forklift"
              fill
              style={{ objectFit: 'contain' }}
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
            />
          </div>
        </div>
      )}

      {/* Result / error area (subtle box centered under image) */}
      <div className="mt-10 flex justify-center">
        <div className="w-full max-w-3xl">
          {error && (
            <div className="text-center text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {result && (
            <div className="border border-gray-200 rounded p-6 flex items-center justify-between bg-white shadow-sm">
              <div>
                <h2 className="text-3xl">{result?.trackingCode}</h2>
                <p className="text-sm text-gray-500">Tracking status:</p>
                <p className="mt-1 text-lg font-semibold text-orange-600">
                  {result.status}
                </p>
                <p className="mt-1 text-sm text-gray-600">{result.summary}</p>
                <Link
                  href={`/trackings/${result.code}`}
                  className="inline-block py-1 text-xs font-semibold text-orange-600 rounded underline cursor-pointer mt-4"
                >
                  View Details
                </Link>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-100 rounded">
                  Live
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Build this Tracking Section with Next js and tailwindcss (.tsx), use shacn components where necessary, add react-hook-form and axios post build it to be a pixel perfect match the design. Think long and hard, no shortcuts and don't be lazy
