import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

export default function ChronPage() {
    return (
        <div>
            <div className="font-bold">Marx-Engels Digital Chronicle</div>
            <Outlet />
        </div>
    );
}