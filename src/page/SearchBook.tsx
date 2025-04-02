import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Caption, Title2, Body2 } from '../style/Text';
import { searchBookApi, BookType } from '../api';
import BookList from './BookList';

interface SearchBookType {
    likeBook: BookType[];
    setLikeBook: React.Dispatch<React.SetStateAction<BookType[]>>;
}
const useSearchBook = (query: string, page: number) => {
    return useQuery({
        queryKey: ['searchBook', query, page],
        queryFn: async () => {
            const oData = {
                query,
                sort: 'accuracy',
                page: page,
                size: 10,
            };
            return searchBookApi(oData);
        },
        enabled: !!query,
    });
};

const SearchBook: React.FC<SearchBookType> = ({ likeBook, setLikeBook }) => {
    const maxHistory = 8;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const { data } = useSearchBook(searchQuery, currentPage);
    const bookData = data?.data?.documents ?? [];
    const bookMetaData = data?.data.meta

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setSearchQuery(inputValue);
            setInputValue('');
            inputRef.current?.blur();
        }
    };
    const handleSelectHistory = (term: string) => {
        setInputValue(term);
        setSearchQuery(term);
        inputRef.current?.blur();
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) return;

        const updatedHistory = [
            searchQuery,
            ...searchHistory.filter((term) => term !== searchQuery),
        ].slice(0, maxHistory);

        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };
    const handleDelete = (term: string) => {
        const updatedHistory = searchHistory.filter((item) => item !== term);
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    useEffect(() => {
        setCurrentPage(1);
        handleSearch();
    }, [searchQuery]);
    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        setSearchHistory(storedHistory);
    }, []);

    return (
        <Style>
            <div>
                <Title2 className='searchBookTitle'>도서 검색</Title2>
                <div className='searchContent'>
                    <div className='searchInput'>
                        <img className='searchIcon' src='/assets/svg/searchIcon.svg' alt="검색 아이콘" />
                        <input
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            type="text"
                            placeholder='검색어를 입력하세요' />
                        {searchHistory.length > 0 && isFocused &&
                            <div className='hitoryWrap' onMouseDown={(e) => e.preventDefault()}>
                                {searchHistory.map((history: string, index: number) => (
                                    <div className='historyList' key={index} onClick={() => handleSelectHistory(history)}>
                                        <Caption className='historyTitle'>{history}</Caption>
                                        <button onClick={(e: any) => { e.stopPropagation(); handleDelete(history) }}>
                                            <img src='/assets/svg/remove.svg' alt="삭제 아이콘" />
                                        </button>
                                    </div>
                                ))}
                            </div>}
                    </div>
                    <button className='detailSearchBtn'><Body2 className='detailSearchBtnText'>상세검색</Body2></button>
                </div>
                <BookList type={'search'} likeBook={likeBook} setLikeBook={setLikeBook} bookData={bookData} bookMetaData={bookMetaData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>

        </Style>
    );
};

export default SearchBook;

const Style = styled.div`
.searchBookTitle{
    color: #1A1E27;
}
.searchContent {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top:16px;
    position: relative;
    z-index: 2;

    .detailSearchBtn {
        padding: 10px;
        border: 1px solid ${({ theme }) => theme.Color.subtitle};
        border-radius: 8px;
    }
    .detailSearchBtnText{
        color: ${({ theme }) => theme.Color.subtitle};
    }
}

.searchInput{
    flex:1;
    width: 100%;
    max-width: 480px;
    position:relative;
    padding: 0 51px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.Background.lightGray};

    .searchIcon{
        position: absolute;
        top: 30%;
        left: 5%;
    }
    input {
        width: 100%;
        padding: 18px 0 16px 0;
        background: none;
        border: none;
        outline: none;
    }
    input::placeholder {
        font-size: 16px;
        font-weight:500;
        color:${({ theme }) => theme.Color.subtitle};
    }
    .hitoryWrap {
        width: 100%;
        position: absolute;
        top: 60%;
        left: 0;
        padding: 38px 25px 12px 51px;
        background-color: ${({ theme }) => theme.Background.lightGray};
        z-index: -1;
        border-radius : 0 0 24px 24px;

        .historyList {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
            cursor: pointer;
            .historyTitle {
                color:${({ theme }) => theme.Color.subtitle};
            }
            img {
                width: 16px;
            }
        }
    }
}

`;