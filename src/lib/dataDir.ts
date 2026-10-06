import path from "node:path";

/**
 * Where admin data (leads, posts, pages, authors, case studies) is stored as JSON.
 * On Railway set DATA_DIR to the mount path of a Volume (e.g. /data), otherwise files are lost on every deploy.
 */
export const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
