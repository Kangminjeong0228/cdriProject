import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Title1, Title2, Body2 } from '../style/Text';
import searchIcon from '../assets/svg/searchIcon.svg';
import { searchBookApi } from '../api';


const SearchBook: React.FC = () => {
    const searchBook = async () => {
        const oData = {
            query: '미움받을 용기',
            target: 'title', 
            sort: 'accuracy', 
            page: 1, 
            size: 10,
          };

        try {
          const result = await searchBookApi(oData);
          console.log('result--->', result)
        } catch (err) {
        } 
      };
    return (
        <Style>
            <div>
                <Title2 className='searchBookTitle'>도서 검색</Title2>
                <div className='searchContent'>
                    <div className='searchInput'>
                        <img src={searchIcon} alt="검색 아이콘" />
                        <input type="text" placeholder='검색어를 입력하세요' />
                    </div>
                    <button onClick={searchBook}><Body2 className='searchBtnText'>상세검색</Body2></button>
                </div>
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

    button {
        padding: 10px;
        border: 1px solid ${({ theme }) => theme.Color.subtitle};
        border-radius: 8px;
    }
    .searchBtnText{
        color: ${({ theme }) => theme.Color.subtitle};
    }
}
.searchInput{
    flex:1;
    max-width: 480px;
    position:relative;
    padding: 0 51px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.Background.lightGray};

    img{
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
}

`;