import bookItem from '@/components/BookItem';
import { BookDetailType } from '@/types/bookInfo';
import { dehydrate, useQuery } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { searchBooks as SearchAPI } from '@/pages/api';

type IProps = {
  bookInfo: BookDetailType;
}

const BookDetailWrapper = styled.div`
  .detail{
    display: flex;
    .img-holder{
      flex:1;
      position: relative;
      width: 300px;
      height: 400px;
      >img{
        width: 100%;
        height: 100%;
      }
      .rate{
        display: block;
        width: 30px;
        height: 30px;
        background-color: red;
        border-radius: 50px;
        position: absolute;
        top: 0;
        right: 0;
      }
     }
    .info{
      flex: 1;
      padding-top: 30px;
      .title{
        line-height: 1.2em;
        color: #333;
        font-size: 23px;
        font-weight: 600;
      }
      .sub-title{
        line-height: 1.2em;
        color: rgba(0,0,0,0.5);
        font-size: 14px;
      }
      .sub-info{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .authors{
          font-size: 12px;
          line-height: 20px;
        }
        .divider{
          width: 1px;
          height: 12px;
          margin: 0 4px;
          background-color: #ccc;
        }
        .publisher{
          font-size: 12px;
          line-height: 20px;
        }
      }
      .price-rate-holder{
        display: flex;
        font-size: 13px;
        margin-top: 20px;
      }
    }
  }
  .desc{
    font-size: 13px;
    line-height: 20px;
  }
`

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: bookInfo } = await SearchAPI.getBookItem(context.query.id);
  return{
    props: {
      bookInfo,
    }
  }
}


function BookDetail({bookInfo}: IProps){
  // const params = useSearchParams();

  // const [id, setId] = useState('');

  // useEffect(() => {
  //   setId(params.get('id'));
  // },[params.get('id')])

  // const {data: bookInfo} = useQuery(['bookInfo', id], () => SearchAPI.getBookItem(id),{ staleTime: 2000 })

  // const res = async () => {
  //   return await SearchAPI.getBookItem(params.get('id'));
  //   // The return value is *not* serialized
  //   // You can return Date, Map, Set, etc.
  // }
  //
  // useEffect(() => {
  //   if(!bookInfo) return;
  // },[bookInfo])



  // const { data } = useQuery(['info'], () => SearchAPI.getBookItem(params.get('id')));
  // useEffect(() => {
  //   console.log('book', data);
  // },[data])
  return (
    <BookDetailWrapper>{
      bookInfo && (
        <>
          <div className="detail">
          <div className="img-holder">
            <img src={bookInfo.image} alt="book-img"/>
          </div>
          <div className="info">
            <div className="title-holder">
              <div className="title">{bookInfo.title}</div>
              <div className="sub-title">{bookInfo.subtitle}</div>
            </div>
            <div className="sub-info">
              <div className="authors">{bookInfo.authors}</div>
              <div className="divider"/>
              <div className="publisher">{bookInfo.publisher}</div>
            </div>
            <div className="price-rate-holder">
              <div className="price">{`price: ${bookInfo.price}`}</div>
              <div className="rate">{bookInfo.rating === '0' ? '' : bookInfo.rating}</div>
            </div>
          </div>
        </div>
        <div className="desc">{bookInfo.desc}</div>
        </>
      )
    }

    </BookDetailWrapper>
  )
}

export default BookDetail;