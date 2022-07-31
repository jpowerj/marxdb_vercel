import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getDocInfo } from "~/models/docInfo.server";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.docInfoId, "docInfoId not found");
  console.log("loader()");
  console.log(params);
  const docInfo = await getDocInfo({ id: params.docInfoId });
  if (!docInfo) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ docInfo });
}

export default function DocInfoDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.docInfo.title}</h3>
      <p>Document fulltext</p>
      <hr className="my-4" />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Document not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
