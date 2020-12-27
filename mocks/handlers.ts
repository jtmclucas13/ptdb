import { rest } from 'msw';

export const handlers = [
    rest.get(`${process.env.ORIGIN}/theaters`, (req, res, ctx) => {
        return res(
            ctx.json({
                name: 'Hello, world',
            })
        );
    }),
];
