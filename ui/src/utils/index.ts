export const formatDate = (input: string) => {
    if (Number.isNaN(Date.parse(input))) return '';
    const date = new Date(input);
    const monthAndYear = date.toLocaleString('en-au', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    const time = date.toLocaleString('en-au', { hour: 'numeric', minute: 'numeric', hour12: true });

    return `${monthAndYear} @ ${time}`;
};

export const parseQueryNumberParam = (search: string, paramName: string) => {
    const queryParams = new URLSearchParams(search);
    const param = queryParams.get(paramName);

    return param && +param ? +param : undefined;
};
