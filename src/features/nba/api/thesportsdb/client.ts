const THESPORTSDB_BASE_URL = "https://www.thesportsdb.com/api/v1/json";

type TheSportsDbFetchOptions = {
    revalidate?: number;
};

export async function theSportsDbFetch<T>(
    path: string,
    options: TheSportsDbFetchOptions = {}
): Promise<T> {
    const apiKey = process.env.THESPORTSDB_API_KEY ?? "3";

    const url = `${THESPORTSDB_BASE_URL}/${apiKey}${path}`;


    const response = await fetch(url, {
        next: {
            revalidate: options.revalidate ?? 60 * 60 * 24,
        },
    });

    if (!response.ok) {
        throw new Error(`TheSportsDB request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
}