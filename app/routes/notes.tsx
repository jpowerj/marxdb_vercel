import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getNoteListItems } from "~/models/note.server";

export async function loader({ request }: LoaderArgs) {
  const noteListItems = await getNoteListItems();
  return json({ noteListItems });
}

const dbs = [
  {
    name: "Register",
    route: "reg",
    icon: "📕",
  },
  {
    name: "Chronicle",
    route: "chron",
    icon: "📅",
  },
];

export default function NotesPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Marx-Engels Digital Cyclopedia</Link>
        </h1>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          {dbs.length === 0 ? (
            <p className="p-4">No DBs yet</p>
          ) : (
            <ol>
              {dbs.map((db) => (
                <li key={db.route}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={db.route}
                  >
                    {db.icon}{" "}{db.name}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
