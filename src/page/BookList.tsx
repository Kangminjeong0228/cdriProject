import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
// import bookIcon from '../assets/img/bookIcon.png';
import { Caption } from '../style/Text';

interface BookListType {
    bookData: BookType[];
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


const BookList: React.FC<BookListType> = ({ bookData }) => {
    const BookListLength = () => {
        return (
            <div className='bookListLengthWrap'>
                <p>도서 검색 결과</p>
                <p>총 <span>{bookData.length}</span>건</p>
            </div>
        )
    }
    const BookList = () => {
        return (
            <div className='bookListContentWrap'>
                <BookListLength />
                {bookData.map((data) => data.title)}
            </div>
        )
    }
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
    console.log('bookData>>', bookData)
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
    .bookListContentWrap {
        margin-top: 24px;
    }
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
    
`;