/** Browser-safe helpers for uploaded client logos (the file handling itself lives in lib/logos.ts, server only). */
export const FILE_RE = /^[a-z0-9-]{1,80}\.(png|jpg|webp)$/;
export const logoUrl = (name?: string) => (name && FILE_RE.test(name) ? `/media/logos/${name}` : undefined);
