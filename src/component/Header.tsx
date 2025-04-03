import { useEffect, useState } from "react";
import styled from "styled-components";
import { Title1 } from "../style/Text";
import Tab from "./tabComponent/Tab";
import { tabHeaderData } from "../component/tabComponent/TabHeaderData";

type HeaderProps = {
  activeTab: number;
  setActiveTab: (id: number) => void;
};

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Style>
      <div className="headerWrap">
        <Title1 className="headerTitle">CERTICOS BOOKS</Title1>
        <Tab
          tabData={tabHeaderData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </Style>
  );
};

export default Header;

const Style = styled.div`
  .headerWrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 10%;
  }
  .headerTitle {
    position: absolute;
    left: 10%;
    color: ${({ theme }) => theme.Color.primary};
  }

  @media (max-width: 1000px) {
    .headerWrap {
      padding: 24px 3vw;
    }
  }
`;
