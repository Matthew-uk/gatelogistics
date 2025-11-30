// components/ContactSection.tsx
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Mail, Clock, Send } from 'lucide-react';
import { cn } from '@/lib/utils'; // optional helper - remove if you don't have it
import { Label } from '@/components/ui/label'; // <-- adapt this import to your shadcn path
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: { name: '', email: '', message: '' },
  });

  async function onSubmit(values: ContactFormValues) {
    // Replace this with your API call
    console.log('submit', values);

    // Simulate a small delay and then reset
    await new Promise((r) => setTimeout(r, 600));
    reset();
    // You may show a toast/snackbar here
  }

  return (
    <section className="max-w-7xl mx-auto px-6 xl:px-0 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: heading, description, contact info */}
        <div className="lg:col-span-6">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
            Feel Free To Leave A Message
          </h2>

          <p className="text-lg text-gray-500 max-w-xl mb-8 leading-relaxed">
            If you have any questions about what we offer for consumers or for
            business, you can always email us via the below details. We’ll reply
            within 24 hours.
          </p>

          <div className="mt-6 space-y-4">
            {/* Email row */}
            <div className="flex items-start gap-1">
              <div className="shrink-0 mt-0">
                <div className="w-9 h-9 rounded-full bg-orange-400/10 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-orange-400 flex items-center justify-center text-white shadow-sm">
                    <Mail size={14} />
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-700 mt-2">
                  support@24topglobalxpress.com
                </div>
              </div>
            </div>

            {/* Hours row */}
            <div className="flex items-start gap-1">
              <div className="shrink-0">
                <div className="w-9 h-9 rounded-full bg-orange-400/10 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-orange-400 flex items-center justify-center text-white shadow-sm">
                    <Clock size={14} />
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-700 mt-2">
                  Sat - Thu: 8AM - 7PM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: form */}
        <div className="lg:col-span-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-xl"
            noValidate
          >
            {/* Name */}
            <div>
              <Label className="sr-only" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name"
                {...register('name', {
                  required: 'Please enter your name',
                  maxLength: { value: 80, message: 'Name is too long' },
                })}
                aria-invalid={!!errors.name}
                className={cn(
                  'border border-gray-200 placeholder-gray-400 h-14',
                  errors.name ? 'ring-1 ring-red-500' : '',
                )}
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                {...register('email', {
                  required: 'Please enter your email',
                  pattern: {
                    value:
                      // simple email regex
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email',
                  },
                })}
                aria-invalid={!!errors.email}
                className={cn(
                  'border border-gray-200 placeholder-gray-400 h-14',
                  errors.email ? 'ring-1 ring-red-500' : '',
                )}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <Label className="sr-only" htmlFor="message">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Message"
                rows={6}
                {...register('message', {
                  required: 'Please enter a message',
                  minLength: { value: 6, message: 'Message is too short' },
                  maxLength: { value: 2000, message: 'Message is too long' },
                })}
                aria-invalid={!!errors.message}
                className={cn(
                  'border border-gray-200 placeholder-gray-400 resize-none',
                  errors.message ? 'ring-1 ring-red-500' : '',
                )}
              />
              {errors.message && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <div>
              <Button
                type="submit"
                className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-4 rounded-none shadow-none flex items-center gap-3 cursor-pointer"
                disabled={isSubmitting}
              >
                <span className="uppercase tracking-wider">Send Message</span>
                <Send size={16} />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Utility styles to tighten visuals and match pixel spacing */}
      <style jsx>{`
        section :global(.input),
        section :global(.textarea) {
          background: transparent;
        }
        /* Make sure button sits left like design on wide screens */
        @media (min-width: 1024px) {
          section form div:last-child {
            margin-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
