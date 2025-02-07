/**
 * https://openlibrary.org/developers/api
 */
const OPEN_LIBRARY_BASE = 'https://openlibrary.org';

export type OpenLibrarySorts =
  | 'old'
  | 'new'
  | 'rating'
  | 'rating asc'
  | 'rating desc'
  | 'title'
  | 'key';

export type OpenLibraryFields =
  | 'key'
  | 'author_name'
  | 'author_key'
  | 'title'
  | 'subtitle'
  | 'edition_count'
  | 'ia'
  | 'has_fulltext'
  | 'first_publish_year'
  | 'cover_i'
  | 'cover_edition_key'
  | 'language';

export interface OpenLibraryParameters {
  q: string;
  fields?: OpenLibraryFields[];
  sort?: OpenLibrarySorts;
  lang?: string;
  limit?: number;
  page?: number;
}

// Provided default fields
export interface OpenLibraryBook {
  author_key: string[];
  author_name: string[];
  cover_edition_key: string;
  first_publish_year: number;
  key: string;
  title: string;
}

export interface OpenLibraryResponse {
  docs: OpenLibraryBook[];
  documentation_url: string;
  numFound: number;
  numFoundExact: boolean;
  num_found: number;
  offset: number | null;
  q: string;
  start: number;
}

export async function searchOpenLibrary(
  parameters: OpenLibraryParameters
): Promise<OpenLibraryResponse> {
  const url = new URL(`${OPEN_LIBRARY_BASE}/search.json`);
  const defaultFields: OpenLibraryFields[] = [
    'key',
    'author_name',
    'author_key',
    'title',
    'cover_edition_key',
    'first_publish_year',
  ];
  parameters.fields = [
    ...defaultFields,
    ...(parameters?.fields ? parameters.fields : []),
  ];
  Object.keys(parameters).forEach((key) => {
    const value = parameters[key as keyof OpenLibraryParameters]?.toString();
    if (value) url.searchParams.set(key, value);
  });
  return fetch(url.href).then((res) => res.json());
}

export function coverImageUrl(olid: string, size: 'S' | 'M' | 'L' = 'L') {
  const url = new URL(
    `https://covers.openlibrary.org/b/olid/${olid}-${size}.jpg`
  );
  // Return 404 if not found
  url.searchParams.set('default', 'false');
  return url.href;
}
