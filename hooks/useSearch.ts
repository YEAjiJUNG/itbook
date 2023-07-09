import { useRouter } from 'next/router';
import { FormEvent, useState, useRef, MouseEventHandler, useEffect, useMemo } from 'react';
import { searchBooks as SearchAPI } from '@/pages/api/index';

function useSearch() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter();
  //
  // const debounce = (func, ms) => {
  //   let timeout;
  //
  //   return () => {
  //     if (timeout) {
  //       clearTimeout(timeout)
  //     }
  //     timeout = setTimeout(() => {func();}, ms);
  //   }
  // };
  const searchBooks = async (keyWord) => {
    SearchAPI.getBookList(keyWord).then((data) => {
      console.log('data', data);

    })
  }

  const onSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputRef.current) {
      return
    }

    const inputValue = inputRef.current?.value
    if(!inputValue) return;
    if (inputValue.replace(/\s+/g, '').length === 0) {
      return
    }

    router.push({
        pathname: `/${inputValue}`,
      });

    formRef.current?.reset()
  }

  return { formRef, inputRef, onSearch }
}
//     e.preventDefault()
//
//     console.log(inputRef.current?.value, 'inputRef');
//     //
//     // if (!inputRef.current) {
//     //   return
//     // }
//
//     const inputValue = inputRef.current?.value
//     if (!inputValue) return;
//     if (inputValue.replace(/\s+/g, '').length === 0) {
//       return
//     }
//     router.push('/', { query: { keyword: inputValue } });
//
//     //   if(inputValue.includes('|')){
//     //     const values = inputValue.split("|");
//     //     console.log(values, 'values');
//     //
//     //     // await searchBooks(values[0]);
//     //     setKeywordOne(values[0]);
//     //     setKeywordTwo(values[1]);
//     //     setType('or');
//     //   }
//     //   else if(inputValue.includes('-')){
//     //     const values = inputValue.split("-");
//     //     setKeywordOne(values[0]);
//     //     setKeywordTwo(values[1]);
//     //     setType('not');
//     //   }
//     //   else{
//     //     setKeywordOne(inputValue);
//     //     setKeywordTwo('');
//     //     setType('');
//     //   }
//     // }
//
//     // useEffect(() => {
//     //   SearchAPI.getBookList(keywordOne).then((data) => {
//     //     console.log('data', data);
//     //     //@ts-ignore
//     //     setListOne(data);
//     //   });
//     // },[keywordOne])
//     //
//     // useEffect(() => {
//     //   SearchAPI.getBookList(keywordOne).then((data) => {
//     //     //@ts-ignore
//     //     setListTwo(data);
//     //   });
//     // },[keywordTwo])
//
//     return { formRef, inputRef, onSearch, keywordOne, keywordTwo, type }
// }

export default useSearch
