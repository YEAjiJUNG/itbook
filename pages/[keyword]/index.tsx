import BookItem from '@/components/BookItem';
import useObserver from '@/hooks/useObserver';
import { Book } from '@/types/bookInfo';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { searchBooks as SearchAPI } from '@/pages/api/index';

const BookListWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 100px;
  row-gap: 40px;
  flex-wrap: wrap;
`

function BookList(){
  const params = useSearchParams();
  const bottom = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('params', params.get('keyword'));
  },[params.get('keyword')])

  const { data, fetchNextPage, status}  = useInfiniteQuery(
    ['getList',  params.get('keyword')],
    ({pageParam = 1}) => SearchAPI.getBookList({keyword: params.get('keyword') as string, page: pageParam}
    ),{
      getNextPageParam: (lastPage) => {
        const page = Number(lastPage.data.page);
        const last = Number(lastPage.data.total % 10) > 0 ? Number(lastPage.data.total / 10) + 1 : Number(lastPage.data.total / 10);
        if(last === page) return;
        return page + 1;
      }
    });

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  })

  return(
    <BookListWrapper>
      {
      status === 'success' && data && data.pages?.map((page) => {
        const list = page.data.books as Book[];
        return list.map((book, idx) => {
          return (
            <div key={`book-${idx}`}>
              <BookItem data={book} />
            </div>
          )
        })
      })
    }

      <div ref={bottom} style={{ width: '100%', height: 30 }} />
    </BookListWrapper>)
}

export default BookList;