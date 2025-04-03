import { useEffect, useState } from "react";
import styled from "styled-components";
import { Title3, Body2, Caption } from "../style/Text";
import { BookType } from "../api";

interface BookListType {
  likeBook: BookType[];
  setLikeBook: React.Dispatch<React.SetStateAction<BookType[]>>;
  type: string;
  bookData: BookType[];
  totalBookCount: number;
}
const BookList: React.FC<BookListType> = ({
  likeBook,
  setLikeBook,
  type,
  bookData,
  totalBookCount,
}) => {
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const [detailBookData, setDetailBookData] = useState<BookType>();

  const handleToggle = (index: number, data: BookType) => {
    setDetailIndex((prevIndex) => (prevIndex === index ? null : index));
    setDetailBookData(data);
  };
  const handleClick = (book: BookType) => {
    const isClicked = likeBook.some((b) => b.isbn === book.isbn);

    if (isClicked) {
      const updatedBooks = likeBook.filter((b) => b.isbn !== book.isbn);
      setLikeBook(updatedBooks);
      localStorage.setItem("likeBook", JSON.stringify(updatedBooks));
    } else {
      const updatedBooks = [...likeBook, book];
      setLikeBook(updatedBooks);
      localStorage.setItem("likeBook", JSON.stringify(updatedBooks));
    }
  };

  useEffect(() => {
    setDetailIndex(null);
  }, [bookData]);

  const mainTitle = type === "search" ? "" : "내가 찜한 책";
  const subTitle = type === "search" ? "도서 검색 결과" : "찜한 책";
  const contentText =
    type === "search" ? "검색된 결과가 없습니다." : "찜한 책이 없습니다.";

  // 검색 결과 책 개수
  const BookListLength = () => {
    return (
      <div className="bookListLengthWrap">
        <p>{subTitle}</p>
        <p>
          총 <span>{totalBookCount}</span>건
        </p>
      </div>
    );
  };
  // 검색 결과 없을 때
  const BookListEmpty = () => {
    return (
      <div className="bookListContentWrap">
        <BookListLength />
        <div className="emptyWrap">
          <img src="/assets/img/bookIcon.png" alt="책 아이콘" />
          <Caption className="emptyText">{contentText}</Caption>
        </div>
      </div>
    );
  };
  // 검색 결과 리스트
  const BookList = () => {
    return (
      <div className="bookListContentWrap">
        <BookListLength />
        <div className="bookListWrap">
          {bookData.map((data, idx: number) => {
            const authorText =
              data.authors.length > 1
                ? `${data.authors[0]} 외 ${data.authors.length - 1}명`
                : data.authors[0];
            return (
              <div key={idx}>
                <div className="bookList row">
                  <div className="bookImage">
                    {data.thumbnail ? (
                      <img src={data.thumbnail} alt="책표지" />
                    ) : (
                      <div></div>
                    )}
                    <img
                      onClick={() => handleClick(data)}
                      className="likeIcon"
                      src={`/assets/svg/${
                        likeBook.some((b) => b.isbn === data.isbn)
                          ? "likeFill"
                          : "like"
                      }.svg`}
                      alt="하트 아이콘"
                    />
                  </div>
                  <div className="bookInfo row">
                    <Title3 className="bookTitle">{data.title}</Title3>
                    <Body2 className="bookAuthors">{authorText}</Body2>
                  </div>
                  <Title3 className="bookPrice">
                    {data.sale_price > 0
                      ? data.sale_price.toLocaleString()
                      : data.price.toLocaleString()}
                    원
                  </Title3>
                  <button className="buyBtn">
                    <Caption>구매하기</Caption>
                  </button>
                  <button
                    onClick={() => handleToggle(idx, data)}
                    className="detailBtn row"
                  >
                    <Caption>상세보기</Caption>
                    <img
                      src={`/assets/svg/arrow${
                        detailIndex === idx ? "Up" : "Down"
                      }.svg`}
                      alt="상세보기 아이콘"
                    />
                  </button>
                </div>
                {detailIndex === idx && <DetailBook />}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  // 책 상세 정보
  const DetailBook = () => {
    const salePrict = Number(detailBookData?.sale_price) > 0;
    const buyBookSuccess = detailBookData?.status === "정상판매";
    return (
      <div className="detailBookWrap row">
        {detailBookData?.thumbnail && (
          <div className="detailBookImage">
            <img
              className="bookDetailImage"
              src={detailBookData.thumbnail}
              alt="책표지"
            />
            <img
              onClick={() => handleClick(detailBookData)}
              className="likeIcon"
              src={`/assets/svg/${
                likeBook.some((b) => b.isbn === detailBookData.isbn)
                  ? "likeFill"
                  : "like"
              }.svg`}
              alt="하트 아이콘"
            />
          </div>
        )}
        <div className="bookDetailContentWrap">
          <div className="bookTitle row">
            <h3 className="bookName">{detailBookData?.title}</h3>
            <Caption className="bookAuthors">{detailBookData?.authors}</Caption>
          </div>
          {detailBookData?.contents && (
            <>
              <h4>책 소개</h4>
              <p>{detailBookData?.contents}</p>
            </>
          )}
        </div>
        <div className="bookBuyWrap">
          <div className="priceWrap row">
            <h5>원가</h5>
            <h3 className={` ${salePrict && "sale"}`}>
              {detailBookData?.price.toLocaleString()}원
            </h3>
          </div>
          {salePrict && (
            <div className="priceWrap row">
              <h5>할인가</h5>
              <h3>{detailBookData?.sale_price.toLocaleString()}원</h3>
            </div>
          )}
          <button className={`buyBtn ${!buyBookSuccess && "soldOut"}`}>
            {buyBookSuccess ? "구매하기" : "품절"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <Style>
      <h2>{mainTitle}</h2>
      <div>
        {bookData.length > 0 ? (
          <BookList />
        ) : (
          <div>
            <BookListEmpty />
          </div>
        )}
      </div>
    </Style>
  );
};

export default BookList;

const Style = styled.div`
  /* 공통 */
  h2 {
    font-size: 22px;
    font-weight: 700;
    line-height: 32px;
    color: ${({ theme }) => theme.Color.title};
  }
  .bookListContentWrap {
    margin-top: 24px;
  }
  .bookListLengthWrap {
    display: flex;
    align-items: center;
    gap: 16px;

    p {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: ${({ theme }) => theme.Color.primary};
    }
    span {
      color: ${({ theme }) => theme.Background.primary};
    }
  }

  /* 책 리스트 없을때 */
  .emptyWrap {
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;

    .emptyText {
      color: ${({ theme }) => theme.Color.secondary};
    }
    img {
      width: 80px;
    }
  }
  /* 책 리스트 있을때 */
  .bookListWrap {
    margin-top: 36px;
  }
  .bookList {
    width: 100%;
    gap: 8px;
    padding: 16px;
    border-bottom: 1px solid #d2d6da;

    .bookImage {
      position: relative;
      width: 48px;
      min-width: 48px;
      height: 68px;
      margin: 0 32px 0 40px;

      img {
        width: 100%;
      }
      .likeIcon {
        width: 16px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
      }
    }
    .bookInfo {
      flex: 1;
      gap: 16px;
      justify-content: flex-start;

      .bookTitle {
        max-width: 280px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${({ theme }) => theme.Color.primary};
      }
      .bookAuthors {
        color: ${({ theme }) => theme.Color.secondary};
      }
    }
    .bookPrice {
      flex: 0 0 10%;
      text-align: center;
      color: ${({ theme }) => theme.Color.primary};
      margin-right: 56px;
    }
    button {
      flex: 1;
      flex: 0 0 10%;
      white-space: nowrap;
      padding: 16px 28px;
      border-radius: 8px;
    }
    .buyBtn {
      background: ${({ theme }) => theme.Background.primary};
      color: #fff;
    }
    .detailBtn {
      gap: 5px;
      background: ${({ theme }) => theme.Background.lightGray};
      color: ${({ theme }) => theme.Color.secondary};
    }
  }
  /* 책 상세 정보 */
  .detailBookWrap {
    gap: 32px;
    padding: 24px 16px 39px 54px;
    border-bottom: 1px solid #d2d6da;
    justify-content: flex-start;
    align-items: flex-start;
    img {
      width: 210px;
      height: 280px;
    }
    h3 {
      font-size: 18px;
      font-weight: 700;
      line-height: 26px;
      color: ${({ theme }) => theme.Color.primary};
    }
    h4 {
      font-size: 14px;
      font-weight: 700;
      line-height: 26px;
      color: ${({ theme }) => theme.Color.primary};
    }
    h5 {
      font-size: 10px;
      font-weight: 500;
      color: ${({ theme }) => theme.Color.subtitle};
    }
    p {
      font-size: 10px;
      font-weight: 500;
      line-height: 16px;
      color: ${({ theme }) => theme.Color.primary};
      white-space: pre-line;
      word-break: keep-all;
    }
    .detailBookImage {
      position: relative;
      .likeIcon {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 8px;
        right: 8px;
      }
    }
  }
  .bookDetailContentWrap {
    flex: 1;
    .bookTitle {
      gap: 16px;

      .bookAuthors {
        color: ${({ theme }) => theme.Color.subtitle};
      }
    }
    h4 {
      margin: 16px 0 12px 0;
    }
  }
  .bookBuyWrap {
    margin-top: auto;
    text-align: right;

    .priceWrap {
      margin-top: 8px;
      gap: 8px;
      justify-content: flex-end;

      .sale {
        text-decoration: line-through;
        font-weight: 300;
      }
      h3 {
        flex: 0 0 32%;
        text-align: right;
      }
    }
    .buyBtn {
      width: 100%;
      min-width: 240px;
      padding: 12px;
      margin-top: 28px;
      background: ${({ theme }) => theme.Background.primary};
      color: #fff;
      border-radius: 8px;
    }
    .buyBtn.soldOut {
      background-color: ${({ theme }) => theme.Background.gray};
      color: ${({ theme }) => theme.Color.subtitle};
    }
  }
`;
