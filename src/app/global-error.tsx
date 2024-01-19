"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError ({ error }: Readonly<{ error: any }>)
{
  useEffect(() =>
  {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en-AU">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}