import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Title1, Title2 } from '../style/Text';
import Header from '../component/Header';
import SearchBook from "./SearchBook";
import BookList from "./BookList";
import { BookType } from '../api';
import { tabHeaderData } from "../component/tabComponent/TabHeaderData";

const MainPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [likeBook, setLikeBook] = useState<BookType[]>(() => {
        const savedBooks = localStorage.getItem('likeBook');
        return savedBooks ? JSON.parse(savedBooks) : [];
    });
    console.log('likeBook>>>',likeBook)
    return (
        <Style>
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='contentWrap'>
                <div>{activeTab === 0 && <SearchBook likeBook={likeBook} setLikeBook={setLikeBook} />}</div>
                <div>{activeTab === 1 && <></>}</div>
            </div>

        </Style>
    );
};

export default MainPage;

const Style = styled.div`
    .contentWrap {
        width: 1000px;
        margin: 0 auto;
        padding: 80px 0;
    }
    @media (max-width: 1000px) {
        .contentWrap {
            width: 100%;
            padding: 0 3vw;
        }
    }
`;