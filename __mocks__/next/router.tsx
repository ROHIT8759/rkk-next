export const useRouter = jest.fn(() => ({
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
}));

const Router = {
    events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
    },
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
};

export default Router;
