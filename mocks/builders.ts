import { build, fake, oneOf } from '@jackfranklin/test-data-bot';
import faker from 'faker';
import { Play } from 'types/project';

const contentWarningDictionary = ['suicide', 'sexual assault', 'self-harm', 'race-based trauma'];

function fillRandomlyFromDictionary<T>(inputDictionary: Array<T>, itemsToSelect: number): Array<T> {
    const dictionary = inputDictionary.map((item) => JSON.parse(JSON.stringify(item)));
    const itemArray = Array(Math.floor(Math.random() * itemsToSelect) + 1).fill(undefined);
    return itemArray.map(() => {
        const randomIndex = Math.floor(Math.random() * (dictionary.length - 1));
        const selectedItem = dictionary[randomIndex];
        dictionary.splice(randomIndex, 1);
        return selectedItem;
    });
}

function pickOne(options: Array<any>): any {
    const max = options.length - 1;
    const randomIndex = Math.floor(Math.random() * max) + 1;
    return options[randomIndex];
}

export const playBuilder = build<Play>({
    fields: {
        artists: [],
        contentWarnings: oneOf([], null),
        description: oneOf('', null),
        director: fake((f) => f.name.findName()),
        endDate: fake((f) => f.date.recent(30)),
        id: fake((f) => f.random.uuid()),
        images: oneOf([], null),
        playwright: fake((f) => f.name.findName()),
        press: [],
        producers: oneOf([], null),
        producingEntity: fake((f) => f.company.companyName()),
        runtime: oneOf(
            '45 minutes',
            '60 minutes',
            '90 minutes without intermission',
            '120 minutes with intermission',
            null
        ),
        season: oneOf('2019 - 2020', '2020 - 2021', null),
        sources: [],
        subtitle: oneOf('An exploration in collaborative isolation', null),
        startDate: fake((f) => f.date.recent(40)),
        tagline: oneOf("True love is hard to come by. It's even harder to get rid of.", null),
        title: fake((f) => f.lorem.words()),
        venue: fake((f) => `${f.company.companyName()} Theater`),
        website: oneOf('https://www.joshuamclucas.com', null),
    },
    postBuild: (play) => {
        if (play.artists) {
            play.artists = Array(Math.floor(Math.random() * 8) + 1)
                .fill(undefined)
                .map(() => ({
                    fullName: faker.name.findName(),
                    id: faker.random.uuid(),
                    headshot: pickOne([faker.internet.url(), null]),
                    role: faker.name.firstName(),
                }));
        }
        if (play.images) {
            play.images = Array(Math.floor(Math.random() * 3) + 1)
                .fill(undefined)
                .map(() => ({
                    caption: pickOne([faker.lorem.sentence(), null]),
                    credit: pickOne([`Photo by ${faker.name.findName()}`, null]),
                    url: faker.image.sports(),
                }));
        }
        if (play.press) {
            play.press = Array(Math.floor(Math.random() * 3) + 1)
                .fill(undefined)
                .map(() => ({
                    date: faker.date.recent(35).toISOString(),
                    link: faker.internet.url(),
                    publication: faker.company.companyName(),
                    title: faker.lorem.words(),
                }));
        }
        if (play.contentWarnings) {
            play.contentWarnings = fillRandomlyFromDictionary(contentWarningDictionary, 3);
        }
        if (play.producers) {
            play.producers = Array(Math.floor(Math.random() * 3) + 1)
                .fill(undefined)
                .map(() => faker.name.findName());
        }
        play.sources = Array(Math.floor(Math.random() * 3) + 1)
            .fill(undefined)
            .map(() => faker.internet.url());

        return play;
    },
});
