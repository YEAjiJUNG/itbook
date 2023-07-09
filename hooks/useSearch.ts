import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';

function useSearch() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter();


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

    await router.push({
        pathname: `/${inputValue}`,
      });

    formRef.current?.reset()
  }

  return { formRef, inputRef, onSearch }
}

export default useSearch
