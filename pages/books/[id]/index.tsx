import { BookDetailType } from '@/types/bookInfo';
import { GetServerSidePropsContext } from 'next';
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