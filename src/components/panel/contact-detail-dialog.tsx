'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { getContactDetailsAction } from '@/actions/contact-actions';

interface ContactDetailProps {
  contactId: string;
}

interface ContactData {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  equipment: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export function ContactDetailDialog({ contactId }: ContactDetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = async () => {
    setIsOpen(true);
    setIsLoading(true);
    setError(null);

    try {
      const result = await getContactDetailsAction(contactId);
      if (result.success && result.data) {
        setContact(result.data as unknown as ContactData);
      } else {
        setError(result.error || "Error loading contact details.");
      }
    } catch (err) {
      setError("Error loading contact details.");
      console.error("Error loading contact details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen} variant="outline" size="sm" className="rounded-none border-2 border-slate-900 bg-white hover:bg-slate-900 hover:text-white text-slate-900 font-bold uppercase tracking-widest text-xs h-9 transition-colors focus-visible:ring-0">
          <Eye className="h-4 w-4 mr-2" /> VIEW
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-2xl px-0 py-0 rounded-none border-2 border-slate-900 bg-white">
        {isLoading ? (
          <div className="py-12 text-center bg-slate-50">
            <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">Loading Details...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center bg-slate-50">
            <p className="text-red-600 font-bold uppercase tracking-widest text-xs">{error}</p>
            <DialogClose asChild>
              <Button variant="outline" className="mt-6 rounded-none border-2 border-slate-900 font-bold uppercase tracking-widest text-xs h-9">Close</Button>
            </DialogClose>
          </div>
        ) : contact ? (
          <>
            <DialogHeader className="p-6 border-b-2 border-slate-900 bg-slate-50">
              <DialogTitle className="text-2xl font-black uppercase tracking-widest text-slate-900">Contact Details</DialogTitle>
              <DialogDescription className="text-slate-600 font-medium uppercase tracking-wider text-xs mt-2">
                Sent on {formatDate(contact.createdAt)}
              </DialogDescription>
            </DialogHeader>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 pb-4 border-b-2 border-slate-100">
                <div className="text-xs font-black uppercase tracking-widest text-slate-900">Full Name:</div>
                <div className="col-span-2 font-medium text-slate-900">{contact.fullName}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 pb-4 border-b-2 border-slate-100">
                <div className="text-xs font-black uppercase tracking-widest text-slate-900">Email:</div>
                <div className="col-span-2 font-medium text-slate-900">{contact.email}</div>
              </div>
              {contact.phone && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 pb-4 border-b-2 border-slate-100">
                  <div className="text-xs font-black uppercase tracking-widest text-slate-900">Phone:</div>
                  <div className="col-span-2 font-medium text-slate-900">{contact.phone}</div>
                </div>
              )}
              {contact.equipment && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 pb-4 border-b-2 border-slate-100">
                  <div className="text-xs font-black uppercase tracking-widest text-slate-900">Equipment:</div>
                  <div className="col-span-2 font-medium text-slate-900">{contact.equipment}</div>
                </div>
              )}
              <div className="pt-2">
                <div className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3">Message:</div>
                <div className="border-2 border-slate-300 p-4 bg-slate-50 font-medium text-slate-900 whitespace-pre-wrap min-h-[100px]">
                  {contact.message}
                </div>
              </div>
            </div>
            <div className="p-6 border-t-2 border-slate-900 bg-slate-50 flex justify-end">
              <DialogClose asChild>
                <Button className="rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-xs h-12 px-8">Close Details</Button>
              </DialogClose>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
} 