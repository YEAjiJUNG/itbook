import SearchInput from '@/components/SearchInput';
import type { NextPage } from 'next'
import styled from 'styled-components';

const HomeWrapper = styled.div`
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  align-items: center;
  
`

const Home: NextPage = () => {

  return (
    <HomeWrapper>
      <h3>보고싶은 책을 검색해보세요!</h3>
      <SearchInput />
    </HomeWrapper>
  )

}

export default Home
