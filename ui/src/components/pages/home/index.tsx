import Tabs from 'components/shared';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AcceptedJobsContainer from '../jobs/accepted';
import InvitedJobsContainer from '../jobs/invited';
import { HomeContainerDiv } from './styled';

const TAB_QUERY_PARAM_NAME = 'tab';
const parseNumberQueryParam = (search: string, paramName: string) => {
    const queryParams = new URLSearchParams(search);
    const param = queryParams.get(paramName);

    return param && +param ? +param : undefined;
};

export default function HomeContainer() {
    const { search } = useLocation();
    const { push } = useHistory();
    const [currentTab, setCurrentTab] = useState<number>(
        parseNumberQueryParam(search, TAB_QUERY_PARAM_NAME) ?? 0,
    );

    useEffect(() => {
        setCurrentTab(parseNumberQueryParam(search, TAB_QUERY_PARAM_NAME) ?? 0);
    }, [search]);

    const onTabChange = (_: number, nextTab: number) => {
        push({
            search: `?${TAB_QUERY_PARAM_NAME}=${nextTab}`,
        });
    };

    return (
        <HomeContainerDiv>
            <Tabs changeTabsManually={true} activeTabIndex={currentTab} onTabChange={onTabChange}>
                <Tabs.Tab name="Invited">
                    <InvitedJobsContainer />
                </Tabs.Tab>
                <Tabs.Tab name="Accepted">
                    <AcceptedJobsContainer />
                </Tabs.Tab>
            </Tabs>
        </HomeContainerDiv>
    );
}
