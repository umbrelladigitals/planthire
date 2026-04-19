import { auth } from "@/auth";

/**
 * Call this at the top of any mutating server action that requires admin privileges.
 * Returns an error object if unauthorized, or null if the caller is an admin.
 *
 * Usage:
 *   const authError = await requireAdmin();
 *   if (authError) return authError;
 */
export async function requireAdmin(): Promise<{ success: false; error: string } | null> {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return { success: false, error: "Unauthorized" };
  }
  return null;
}
