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
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contact Requests</h2>
        <p className="text-muted-foreground">
          Manage contact form submissions from your website.
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} unread
            </Badge>
          )}
        </p>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of recent contact form submissions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Name</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead className="w-[150px]">Date</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="text-right w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contactRequests.map((request) => (
              <TableRow key={request.id} className={!request.isRead ? "bg-blue-50/50 dark:bg-blue-950/20" : ""}>
                <TableCell className="font-medium">
                  {request.fullName}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{request.email}</p>
                    {request.phone && <p className="text-muted-foreground">{request.phone}</p>}
                  </div>
                </TableCell>
                <TableCell>{request.equipment || "-"}</TableCell>
                <TableCell>{formatDate(request.createdAt)}</TableCell>
                <TableCell>
                  {!request.isRead ? (
                    <Badge>New</Badge>
                  ) : (
                    <Badge variant="outline">Viewed</Badge>
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
                        <Button variant="outline" size="icon" title="Mark as Read" type="submit">
                          <MailOpen className="h-4 w-4" />
                        </Button>
                      </form>
                    )}
                    
                    {/* Delete button */}
                    <form action={async () => {
                      'use server';
                      await deleteContactAction(request.id);
                    }}>
                      <Button variant="outline" size="icon" title="Delete" type="submit"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50">
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
        <div className="text-center py-10">
          <p className="text-muted-foreground">No contact requests yet.</p>
        </div>
      )}
    </div>
  );
} 