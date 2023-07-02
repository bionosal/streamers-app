export async function jsonFetcher<T>(
  resource: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(resource, init);
  if (!res.ok) {
    const error = Error();
    try {
      error.message = JSON.stringify(
        await res.json().then((json) => json.message)
      );
    } catch (e) {
      if (e instanceof SyntaxError) {
        error.message = JSON.stringify(res.body);
      }
    }
    throw error;
  }
  try {
    return await res.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      const message = "Couldn't parse JSON";
      throw Error(message);
    }
  }
  throw Error();
}
