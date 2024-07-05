"use client";

import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: Readonly<{ error: any }>) {
	useEffect(() => {}, [error]);

	return (
		<html lang="en-AU">
			<body>
				<Error statusCode={404} />
			</body>
		</html>
	);
}
