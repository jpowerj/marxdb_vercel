import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getDocinfo } from "~/models/docinfo.server";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.docinfoId, "docinfoId not found");
  console.log("loader()");
  console.log(params);
  const docinfo = await getDocinfo({ id: params.docinfoId });
  if (!docinfo) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ docinfo });
}

export default function DocinfoDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.docinfo.title}</h3>
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
