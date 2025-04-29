export async function callApi<TRequest, TResponse>(
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	requestBody?: TRequest
): Promise<TResponse> {
	const res = await fetch(url, {
		method,
		headers: { "Content-Type": "application/json" },
		body: requestBody ? JSON.stringify(requestBody) : undefined,
	});

	if (!res.ok) {
		// You can read error details from the response body if your API returns JSON errors
		const errorBody = await res.text().catch(() => null);
		throw new Error(
			`HTTP ${res.status} ${res.statusText}${
				errorBody ? ` — ${errorBody}` : ""
			}`
		);
	}

	return (await res.json()) as TResponse;
}
