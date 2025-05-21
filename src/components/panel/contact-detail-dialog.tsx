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
        <Button onClick={handleOpen} variant="outline" size="icon" title="View Details">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        {isLoading ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-red-500">{error}</p>
            <DialogClose asChild>
              <Button variant="outline" className="mt-4">Close</Button>
            </DialogClose>
          </div>
        ) : contact ? (
          <>
            <DialogHeader>
              <DialogTitle>Contact Details</DialogTitle>
              <DialogDescription>
                Sent on {formatDate(contact.createdAt)}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Full Name:</div>
                <div className="col-span-2">{contact.fullName}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Email:</div>
                <div className="col-span-2">{contact.email}</div>
              </div>
              {contact.phone && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Phone:</div>
                  <div className="col-span-2">{contact.phone}</div>
                </div>
              )}
              {contact.equipment && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Equipment:</div>
                  <div className="col-span-2">{contact.equipment}</div>
                </div>
              )}
              <div className="pt-2">
                <div className="font-medium mb-2">Message:</div>
                <div className="border border-gray-200 rounded-md p-3 bg-gray-50 whitespace-pre-wrap">
                  {contact.message}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
} 