import type { DocInfo } from "@prisma/client";

import { prisma } from "~/db.server";

export type { DocInfo } from "@prisma/client";

export function getDocInfo({
  id,
}: Pick<DocInfo, "id">) {
  return prisma.docInfo.findFirst({
    where: { id: id },
    select: { id: true, title: true },
  });
}

export function getDocInfoListItems() {
  return prisma.docInfo.findMany({
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
