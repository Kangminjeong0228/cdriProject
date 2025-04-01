import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Title3, Body2, Caption, } from '../style/Text';
import Pagenation from '../component/Pagenations';


interface BookListType {
    bookData: BookType[];
    bookMetaData: BookMetaDataType;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}
interface BookMetaDataType {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
}
interface BookType {
    authors: string[];
    contents: string;
    datetime: string;
    isbn: string;
    price: number;
    publisher: string;
    sale_price: number;
    status: string;
    thumbnail: string;
    title: string;
    translators: string[];
    url: string;
}


const BookList: React.FC<BookListType> = ({ bookData, bookMetaData, currentPage, setCurrentPage }) => {
    const [detailIndex, setDetailIndex] = useState<number | null>(null);
    const [detailBookData, setDetailBookData] = useState<BookType>();

    const handleToggle = (index: number, data: BookType) => {
        setDetailIndex(prevIndex => (prevIndex === index ? null : index));
        setDetailBookData(data)
    };

    useEffect(() => {
        setDetailIndex(null);
    }, [bookData]);

    // 검색 결과 책 개수
    const BookListLength = () => {
        return (
            <div className='bookListLengthWrap'>
                <p>도서 검색 결과</p>
                <p>총 <span>{bookMetaData?.total_count ?? 0}</span>건</p>
            </div>
        )
    }
    // 검색 결과 없을 때
    const BookListEmpty = () => {
        return (
            <div className='bookListContentWrap'>
                <BookListLength />
                <div className='emptyWrap'>
                    <img src='/assets/img/bookIcon.png' alt="책 아이콘" />
                    <Caption className='emptyText'>검색된 결과가 없습니다.</Caption>

                </div>

            </div>
        )
    }
    // 검색 결과 리스트
    const BookList = () => {

        return (
            <div className='bookListContentWrap'>
                <BookListLength />
                <div className='bookListWrap'>
                    {bookData.map((data, idx: number) => {
                        const authorText = data.authors.length > 1
                            ? `${data.authors[0]} 외 ${data.authors.length - 1}명`
                            : data.authors[0];
                        return (
                            <div key={idx}>
                                <div className='bookList row'>
                                    {data.thumbnail ? <img className='bookImage' src={data.thumbnail} alt="책표지" /> : <div className='bookImage'></div>}
                                    <div className='bookInfo row'>
                                        <Title3 className='bookTitle'>{data.title}</Title3>
                                        <Body2 className='bookAuthors'>{authorText}</Body2>
                                    </div>
                                    <Title3 className='bookPrice'>{data.sale_price > 0 ? data.sale_price.toLocaleString() : data.price.toLocaleString()}원</Title3>
                                    <button className='buyBtn'><Caption>구매하기</Caption></button>
                                    <button onClick={() => handleToggle(idx, data)} className='detailBtn row'><Caption>상세보기</Caption>
                                        <img src={`/assets/svg/arrow${detailIndex === idx ? 'Up' : 'Down'}.svg`} alt="상세보기 아이콘" /></button>
                                </div>
                                {detailIndex === idx && <DetailBook />}
                            </div>
                        )
                    })}
                    <Pagenation bookMetaData={bookMetaData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>

            </div>

        )
    }
    // 책 상세 정보
    const DetailBook = () => {
        const salePrict = Number(detailBookData?.sale_price) > 0;
        const buyBookSuccess = detailBookData?.status === "정상판매"
        return (
            <div className='detailBookWrap row'>
                {detailBookData?.thumbnail &&
                    <img className='bookDetailImage' src={detailBookData.thumbnail} alt="책표지" />
                }
                <div className='bookDetailContentWrap'>
                    <div className='bookTitle row'>
                        <h3 className='bookName'>{detailBookData?.title}</h3>
                        <Caption className='bookAuthors'>{detailBookData?.authors}</Caption>
                    </div>
                    {detailBookData?.contents &&
                        <>
                            <h4>책 소개</h4>
                            <p>{detailBookData?.contents}</p>
                        </>
                    }
                </div>
                <div className='bookBuyWrap'>
                    <div className='priceWrap row'><h5>원가</h5><h3 className={` ${salePrict && "sale"}`}>{detailBookData?.price.toLocaleString()}원</h3></div>
                    {salePrict &&
                        <div className='priceWrap row'><h5>할인가</h5><h3>{detailBookData?.sale_price.toLocaleString()}원</h3></div>
                    }
                    <button className={`buyBtn ${!buyBookSuccess && "soldOut"}`}>{buyBookSuccess ? '구매하기' : '품절'}</button>
                </div>

            </div>
        )
    }

    return (
        <Style>
            <div>
                {bookData.length > 0 ? <BookList /> : <div><BookListEmpty /></div>}
            </div>
        </Style>
    );
};

export default BookList;

const Style = styled.div`
    /* 공통 */
    .bookListContentWrap {
        margin-top: 24px;
    }
    .bookListLengthWrap{
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
    .emptyWrap{
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
    .bookListWrap{
        margin-top: 36px;
    }
    .bookList{
        width: 100%;
        gap: 8px;
        padding: 16px;
        border-bottom: 1px solid #D2D6DA;

        .bookImage {
            width: 48px;
            min-width: 48px;
            height: 68px;
            margin: 0 32px 0 40px;
        }
        .bookInfo{
            flex: 1;
            gap: 16px;
            justify-content: flex-start;

            .bookTitle{
                max-width: 280px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: ${({ theme }) => theme.Color.primary};
            }
            .bookAuthors{
                color: ${({ theme }) => theme.Color.secondary};
            }
        }
        .bookPrice{
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
            background:${({ theme }) => theme.Background.primary}; 
            color: #fff;
        }
        .detailBtn {
            gap : 5px;
            background:${({ theme }) => theme.Background.lightGray};
            color: ${({ theme }) => theme.Color.secondary}; 
        }
    }
    /* 책 상세 정보 */
    .detailBookWrap{
        gap: 32px;
        padding: 24px 16px 39px 54px;
        border-bottom: 1px solid #D2D6DA;
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
            font-size:14px;
            font-weight: 700;
            line-height: 26px;
            color: ${({ theme }) => theme.Color.primary};
        }
        h5 {
            font-size:10px;
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
    .bookBuyWrap{
        margin-top: auto;
        text-align: right;

        .priceWrap {
            margin-top: 8px;
            gap: 8px;
            justify-content: flex-end;

            .sale {
                text-decoration:line-through;
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
            background:${({ theme }) => theme.Background.primary};
            color: #fff;
            border-radius: 8px;
        }
        .buyBtn.soldOut {
            background-color: ${({ theme }) => theme.Background.gray};
            color: ${({ theme }) => theme.Color.subtitle};
        }
    }
    
`;