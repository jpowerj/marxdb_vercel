import { Link } from "@remix-run/react";

export default function MainIndexPage() {
  return (
    <p>
      Click{" "}
      <Link to="notes" className="text-blue-500 underline">
        here
      </Link>{" "}
      to view notes.
    </p>
  );
}
