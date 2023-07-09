import { Book } from '@/types/bookInfo';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const BookItemWrapper = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  >img{
    width: 80px;
    height: 100px;
  }
  .title{
    font-size: 18px;
    line-height: 24px;
    display: block;
    width: 300px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sub-title{
    font-size: 12px;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.6);
  }
`

type IProps = {
  data: Book;
}

function BookItem({data}: IProps){
  const router = useRouter();
  const onClickHandler = (id) => router.push({pathname: `/books/${id}`});

  return(
    <BookItemWrapper onClick={() => onClickHandler(data.isbn13)}>
      <img src={data.image} alt="data-img"/>
      <div className="title">{data.title}</div>
      <div className="sub-title">{data.subtitle}</div>
      <div className="price">{data.price}</div>
    </BookItemWrapper>
  )
}

export default BookItem;