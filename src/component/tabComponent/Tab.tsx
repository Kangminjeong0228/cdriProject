// src/components/Tab.tsx
import React from "react";
import styled from 'styled-components';
import { Body1 } from '../../style/Text';

type TabItem = {
    id: number;
    label: string;
};
type TabProps = {
    tabData: TabItem[];
    activeTab: number;
    setActiveTab: (id: number) => void;
};

const Tab: React.FC<TabProps> = ({ tabData, activeTab, setActiveTab }) => {
    return (
        <Style>
            <div className="tabWrap">
                {tabData.map((tab, idx) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`tabList ${activeTab === idx && "active"}`}
                    >
                        <Body1 className="tabText">{tab.label}</Body1>
                    </button>
                ))}
            </div>
        </Style>
    );
};

export default Tab;

const Style = styled.div`
.tabWrap {
    display: flex;
    gap: 56px;
}
.tabList {
    padding-bottom: 4px;
}
.tabList.active {
    border-bottom: 1px solid ${({ theme }) => theme.Background.primary};
    
}
.tabText {
    color: ${({ theme }) => theme.Color.primary};
}
`
