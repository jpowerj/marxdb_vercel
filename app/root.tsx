import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

import tailwindStylesheetUrl from "./styles/tailwind.css";
//import { getUser } from "./session.server";

const robotoUrl = "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: robotoUrl }
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Marx-Engels Digital Cyclopedia",
  viewport: "width=device-width,initial-scale=1",
});

/*
export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}
*/

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

const theme = responsiveFontSizes(createTheme(themeOptions));
theme.typography.h4 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.0rem',
  },
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <ThemeProvider theme={theme}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ThemeProvider>
      </body>
    </html>
  );
}
