import { formatDate, parseQueryNumberParam } from 'utils';

describe('formatDate', () => {
    it('should format the date that has been passed', () => {
        const date = '2021-07-22 10:34:0';
        const expectedFormat = 'July 22, 2021 @ 10:34 AM';

        expect(formatDate(date)).toBe(expectedFormat);
    });

    it('should return an empty string if a wrong date is passed', () => {
        const date = 'a wrong date';
        const expectedFormat = '';

        expect(formatDate(date)).toBe(expectedFormat);
    });
});

describe('parseQueryNumberParam', () => {
    it('should return the value of a number param', () => {
        const query = '?param=520';

        expect(parseQueryNumberParam(query, 'param')).toBe(520);
    });

    it('should return undefined if a parameter cannot be converted to a number', () => {
        const query = '?param=some_wrong_value';

        expect(parseQueryNumberParam(query, 'param')).toBe(undefined);
    });
});
