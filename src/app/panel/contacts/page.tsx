import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MailOpen, Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import { ContactDetailDialog } from "@/components/panel/contact-detail-dialog";
import { markContactAsReadAction, deleteContactAction } from "@/actions/contact-actions";
import { AdminPageHeader } from "@/components/panel/admin-page-header";

// Type definition
interface ContactRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  message: string;
  equipment: string | null;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default async function ContactRequestsPage() {
  // Fetch contact requests from the database
  const contactRequests: ContactRequest[] = await db.contactSubmission.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const unreadCount = contactRequests.filter(req => !req.isRead).length;

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="CONTACT REQUESTS"
        description="Manage and review contact form submissions."
        action={
          unreadCount > 0 ? (
            <Badge variant="destructive" className="rounded-none uppercase font-black tracking-wider px-3 py-1">
              {unreadCount} UNREAD
            </Badge>
          ) : undefined
        }
      />
      
      <div className="bg-white border-2 border-slate-900 overflow-hidden">
        <Table>
          <TableCaption className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">A list of recent contact form submissions.</TableCaption>
          <TableHeader className="bg-slate-50 border-b-2 border-slate-900">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[180px] font-black tracking-widest uppercase text-slate-900">Name</TableHead>
              <TableHead className="font-black tracking-widest uppercase text-slate-900">Contact Info</TableHead>
              <TableHead className="font-black tracking-widest uppercase text-slate-900">Equipment</TableHead>
              <TableHead className="w-[150px] font-black tracking-widest uppercase text-slate-900">Date</TableHead>
              <TableHead className="w-[100px] font-black tracking-widest uppercase text-slate-900">Status</TableHead>
              <TableHead className="text-right w-[120px] font-black tracking-widest uppercase text-slate-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contactRequests.map((request) => (
              <TableRow key={request.id} className={!request.isRead ? "bg-slate-100 hover:bg-slate-200 border-b border-slate-200" : "hover:bg-slate-50 border-b border-slate-200"}>
                <TableCell className="font-bold text-slate-900 uppercase">
                  {request.fullName}
                </TableCell>
                <TableCell>
                  <div className="text-xs font-medium text-slate-700">
                    <p>{request.email}</p>
                    {request.phone && <p>{request.phone}</p>}
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium text-slate-700">{request.equipment || "-"}</TableCell>
                <TableCell className="text-sm font-medium text-slate-700">{formatDate(request.createdAt)}</TableCell>
                <TableCell>
                  {!request.isRead ? (
                    <Badge className="rounded-none bg-primary text-white font-black hover:bg-primary tracking-widest uppercase text-[10px]">NEW</Badge>
                  ) : (
                    <Badge variant="outline" className="rounded-none border-2 border-slate-300 text-slate-500 font-bold tracking-widest uppercase text-[10px]">READ</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {/* Contact detail dialog */}
                    <ContactDetailDialog contactId={request.id} />
                    
                    {/* Mark as read button - Show only for unread messages */}
                    {!request.isRead && (
                      <form action={async () => {
                        'use server';
                        await markContactAsReadAction(request.id);
                      }}>
                        <Button variant="outline" size="sm" title="Mark as Read" type="submit" className="rounded-none border-2 border-slate-900 bg-white hover:bg-slate-900 hover:text-white text-slate-900 transition-colors h-9 w-9 p-0">
                          <MailOpen className="h-4 w-4" />
                        </Button>
                      </form>
                    )}
                    
                    {/* Delete button */}
                    <form action={async () => {
                      'use server';
                      await deleteContactAction(request.id);
                    }}>
                      <Button variant="outline" size="sm" title="Delete" type="submit"
                        className="rounded-none border-2 border-red-500 bg-white hover:bg-red-500 hover:text-white text-red-500 transition-colors h-9 w-9 p-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {contactRequests.length === 0 && (
        <div className="text-center py-16 bg-white border-2 border-slate-900">
          <p className="text-slate-500 font-bold uppercase tracking-widest">No contact requests found.</p>
        </div>
      )}
    </div>
  );
} 