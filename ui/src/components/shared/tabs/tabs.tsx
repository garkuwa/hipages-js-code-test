import { useEffect, Children, ReactElement, useState } from 'react';
import { TabButtonContainerDiv, TabButtonDiv, TabContainerDiv, TabDiv } from './styled';

export interface ITabsProps {
    children: React.ReactNode[];
    activeTabIndex?: number;
    onTabChange?: (prevIndex: number, newIndex: number) => void;
    changeTabsManually?: boolean;
}

export interface ITabProps {
    children: React.ReactNode;
    name: string;
}

export default function Tabs({
    children,
    activeTabIndex,
    onTabChange,
    changeTabsManually = false,
}: ITabsProps) {
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(activeTabIndex || 0);
    const tabNames = Children.map(children, tab => {
        const tabEl = tab as ReactElement;
        if (tabEl.type !== Tabs.Tab) {
            throw new Error('Tabs component should have Tabs.Tab as immediate children');
        }
        return tabEl.props.name;
    });
    const changeTabs = (tabIndex: number) => {
        if (!changeTabsManually) {
            setCurrentTabIndex(tabIndex);
        }
        onTabChange && onTabChange(currentTabIndex, tabIndex);
    };

    useEffect(() => {
        if (activeTabIndex !== undefined) setCurrentTabIndex(+activeTabIndex);
    }, [activeTabIndex]);

    return (
        <TabContainerDiv>
            <TabButtonContainerDiv>
                {tabNames?.map((name, index) => (
                    <TabButtonDiv
                        data-testid={name}
                        isActive={currentTabIndex === index}
                        onClick={() => changeTabs(index)}
                        key={name}>
                        {name}
                    </TabButtonDiv>
                ))}
            </TabButtonContainerDiv>
            {children[currentTabIndex]}
        </TabContainerDiv>
    );
}

// eslint-disable-next-line func-names
Tabs.Tab = function ({ children }: ITabProps) {
    return <TabDiv>{children}</TabDiv>;
};
