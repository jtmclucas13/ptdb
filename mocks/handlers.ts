import { rest } from 'msw';
import { playBuilder } from 'mocks/builders';

export const handlers = [
    rest.get(`${process.env.ORIGIN}/theaters`, (req, res, ctx) => {
        return res(
            ctx.json({
                name: 'Hello, world',
            })
        );
    }),
    rest.get(`${process.env.ORIGIN}/projects`, (req, res, ctx) => {
        return res(ctx.json([{ id: 'abc-123' }, { id: 'xyz' }, { id: 'jtmrulz' }]));
    }),
    rest.get(`${process.env.ORIGIN}/projects/:projectId`, (req, res, ctx) => {
        const { projectId } = req.params;
        return res(ctx.json(playBuilder({ overrides: { id: projectId } })));
    }),
];
