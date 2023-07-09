export type BookDetailType =
{
  error: string;
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  isbn10: string;
  isbn13: string;
  pages: string;
  year: string;
  rating: string;
  desc: string;
  price: string;
  image: string;
  url: string;
  pdf: {
    'Chapter 2': string;
    'Chapter 5': string;
  }
}


export type Book = {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export type BookListType = {
  total: string;
  page: string;
  books: Book[];
}