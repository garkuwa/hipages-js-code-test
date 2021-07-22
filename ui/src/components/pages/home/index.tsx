import Tabs from 'components/shared';
import Snackbar from 'components/shared/snackbar';
import { useEffect , useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { parseQueryNumberParam } from 'utils';
import AcceptedJobsContainer from '../jobs/accepted';
import InvitedJobsContainer from '../jobs/invited';
import { HomeContainerDiv } from './styled';

const TAB_QUERY_PARAM_NAME = 'tab';

export default function HomeContainer() {
    const { search } = useLocation();
    const { push } = useHistory();
    const [currentTab, setCurrentTab] = useState<number>(
        parseQueryNumberParam(search, TAB_QUERY_PARAM_NAME) ?? 0,
    );
    const onTabChange = (_: number, nextTab: number) => {
        push({
            search: `?${TAB_QUERY_PARAM_NAME}=${nextTab}`,
        });
    };
    const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>();

    useEffect(() => {
        setCurrentTab(parseQueryNumberParam(search, TAB_QUERY_PARAM_NAME) ?? 0);
    }, [search]);

    return (
        <HomeContainerDiv>
            <Tabs changeTabsManually activeTabIndex={currentTab} onTabChange={onTabChange}>
                <Tabs.Tab name="Invited">
                    <InvitedJobsContainer
                        setSnackbarMessage={setSnackbarMessage}
                        setIsLoadingState={setIsLoadingState}
                    />
                </Tabs.Tab>
                <Tabs.Tab name="Accepted">
                    <AcceptedJobsContainer
                        setSnackbarMessage={setSnackbarMessage}
                        setIsLoadingState={setIsLoadingState}
                    />
                </Tabs.Tab>
            </Tabs>
            {isLoadingState && (
                <div className="loader-mask">
                    <div className="loader" />
                </div>
            )}
            {snackbarMessage && <Snackbar text={snackbarMessage} />}
        </HomeContainerDiv>
    );
}
