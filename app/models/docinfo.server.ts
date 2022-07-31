import type { Docinfo } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Docinfo } from "@prisma/client";

export function getDocinfo({
  id,
}: Pick<Docinfo, "id">) {
  return prisma.docinfo.findFirst({
    where: { id: id },
    select: { id: true, title: true },
  });
}

export function getDocinfoListItems() {
  return prisma.docinfo.findMany({
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

/*
export function createDoc({
  body,
  title,
}: Pick<Note, "body" | "title">) {
  return prisma.note.create({
    data: {
      title,
      body,
    },
  });
}
*/

/*
export function deleteNote({
  id,
}: Pick<Note, "id">) {
  return prisma.note.deleteMany({
    where: { id },
  });
}
*/
