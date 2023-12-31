import useSearch from '@/hooks/useSearch';
import styled from 'styled-components';

const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  form{
    width: 100%;
    line-height:12px;
    display: flex;
    button{
      width: 50px;
    }
    input{
      width: 100%;
      background-color: transparent;
      font-size: 12px;
      line-height: 12px;
      padding: 5px;
      color: black;
      &::placeholder{
        color: rgba(0,0,0,0.5);
      }
      &:focus{
        outline: none;
      }
    }
  }
`

function SearchInput(){
  const { formRef, inputRef, onSearch } = useSearch();

  return(
    <SearchInputWrapper>
      <form ref={formRef} className="search-form" onSubmit={onSearch}>
        <input ref={inputRef} type={'text'} className="search-input" placeholder="|(or), -(not)" required />
        <button onClick={() => onSearch}>검색</button>
      </form>
    </SearchInputWrapper>
  )
}

export default SearchInput;