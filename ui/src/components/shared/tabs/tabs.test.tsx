import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import Tabs from './tabs';

describe('Tabs', () => {
    const leftClick = { button: 0 };

    it('should render Tabs with three tabs', () => {
        const tabs = renderer.create(
            <Tabs>
                <Tabs.Tab name="One">One</Tabs.Tab>
                <Tabs.Tab name="Two">Two</Tabs.Tab>
                <Tabs.Tab name="Three">Three</Tabs.Tab>
            </Tabs>,
        );

        expect(tabs).toMatchSnapshot();
    });

    it('should call the tab change handler on a tab change', () => {
        const tabChange = jest.fn();
        const { getByTestId } = render(
            <Tabs onTabChange={tabChange}>
                <Tabs.Tab name="One">One</Tabs.Tab>
                <Tabs.Tab name="Two">Two</Tabs.Tab>
                <Tabs.Tab name="Three">Three</Tabs.Tab>
            </Tabs>,
        );
        fireEvent.click(getByTestId('One'), leftClick);

        expect(tabChange).toBeCalledTimes(1);
    });

    it('should set an active tab', () => {
        const { getByTestId } = render(
            <Tabs activeTabIndex={2}>
                <Tabs.Tab name="One">One</Tabs.Tab>
                <Tabs.Tab name="Two">Two</Tabs.Tab>
                <Tabs.Tab name="Three">Three</Tabs.Tab>
            </Tabs>,
        );

        expect(getByTestId('Two')).toBeInTheDocument();
    });
});
