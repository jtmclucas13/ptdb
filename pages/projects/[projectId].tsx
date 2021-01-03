import {
    Avatar,
    Badge,
    Box,
    Flex,
    Heading,
    Img,
    Link,
    List,
    ListItem,
    Stack,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Head } from 'components/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Play, Project } from 'types/project';
import { api } from 'utils/http';

interface ProjectPageProps {
    project: Play;
}

const dateTimeOptions = { year: 'numeric', month: 'long', day: 'numeric' };

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
    const {
        artists,
        contentWarnings,
        description,
        director,
        endDate,
        images,
        playwright,
        press,
        producers,
        producingEntity,
        runtime,
        season,
        startDate,
        subtitle,
        sources,
        tagline,
        title,
        venue,
        website,
    } = project;

    return (
        <Box>
            <Head title={title} />
            <Flex padding={10} paddingLeft={images ? 10 : 0}>
                <Box>
                    {images && (
                        <Box position="relative">
                            <Img alt={images[0].caption || ''} borderRadius={10} src={images[0].url} />
                            {images[0].credit && (
                                <Text
                                    backgroundColor="rgba(0, 0, 0, 0.5)"
                                    borderBottomLeftRadius={10}
                                    borderTopRightRadius={10}
                                    bottom={0}
                                    color="gray.100"
                                    left={0}
                                    padding={1}
                                    position="absolute"
                                >
                                    {images[0].credit}
                                </Text>
                            )}
                        </Box>
                    )}
                </Box>
                <Box paddingX={10}>
                    <Heading as="h1" color="primary.500" marginBottom={subtitle ? 1 : 8} textStyle="h1">
                        {title}
                    </Heading>
                    {subtitle && (
                        <Heading as="h2" marginBottom={8} textStyle="h2">
                            {subtitle}
                        </Heading>
                    )}
                    <Heading as="h3" marginBottom={8} textStyle="h3">
                        Presented by {producingEntity}
                    </Heading>
                    <Heading color="primary.500" marginBottom={1} textStyle="h4">
                        By {playwright}
                    </Heading>
                    <Heading color="primary.500" marginBottom={1} textStyle="h4">
                        Directed by {director}
                    </Heading>
                    <Heading color="primary.500" textStyle="h4">
                        {new Intl.DateTimeFormat('en-US', dateTimeOptions).format(new Date(startDate))} -{' '}
                        {new Intl.DateTimeFormat('en-US', dateTimeOptions).format(new Date(endDate))}
                    </Heading>
                </Box>
            </Flex>

            <Flex marginBottom={10} paddingX={10}>
                <Box flex={1} marginRight={4} minWidth={250}>
                    <Stack direction="column">
                        {producers && <Text>Produced by {producers.join(', ')}</Text>}
                        {season && <Text>{season} Season</Text>}
                        <Text>{venue}</Text>
                        {runtime && <Text>{runtime}</Text>}
                        {website && (
                            <Link href={website} isExternal={true}>
                                Original Webpage <ExternalLinkIcon marginBottom={1} marginLeft={1} />
                            </Link>
                        )}
                        {contentWarnings && (
                            <Wrap direction="row">
                                {contentWarnings.map((warning) => (
                                    <WrapItem key={warning}>
                                        <Badge colorScheme="primary" fontSize="sm">
                                            {warning}
                                        </Badge>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        )}
                    </Stack>
                </Box>
                <Box flex={3}>
                    {(tagline || description) && (
                        <Box>
                            {tagline && (
                                <Text fontSize="xl" fontStyle="italic" fontWeight="bold" marginBottom={4}>
                                    {tagline}
                                </Text>
                            )}
                            {description && <Text marginBottom={10}>{description}</Text>}
                        </Box>
                    )}
                    <Box>
                        {press && (
                            <Box>
                                <Heading marginBottom={1}>Press</Heading>
                                <List>
                                    {press.map((article) => (
                                        <ListItem key={article.link}>
                                            <Link href={article.link} isExternal={true}>
                                                <Text display="inline" fontStyle="italic">
                                                    {article.title}
                                                </Text>{' '}
                                                <Text display="inline">
                                                    - {article.publication} (
                                                    {new Intl.DateTimeFormat('en-US', dateTimeOptions).format(
                                                        new Date(article.date)
                                                    )}
                                                    )
                                                </Text>{' '}
                                                <ExternalLinkIcon marginBottom={1} marginLeft={1} />
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Flex>

            <Box backgroundColor="secondary.300" marginBottom={10} padding={10}>
                <Heading marginBottom={6}>Team</Heading>
                <Wrap spacing="40px">
                    {artists.map(({ fullName, id: artistId, headshot, role }) => (
                        <WrapItem key={artistId}>
                            <Stack align="center" direction="column">
                                <Avatar name={fullName} size="xl" src={headshot || ''} />
                                <Text fontWeight="bold">{fullName}</Text>
                                <Text>{role}</Text>
                            </Stack>
                        </WrapItem>
                    ))}
                </Wrap>
            </Box>

            <Box paddingBottom={10} paddingX={10}>
                <Heading marginBottom={1}>Sources</Heading>
                <List>
                    {sources.map((source) => (
                        <ListItem key={source}>
                            <Link href={source} isExternal={true}>
                                {source} <ExternalLinkIcon marginBottom={1} marginLeft={1} />
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default ProjectPage;

export const getStaticPaths: GetStaticPaths<{ projectId: string }> = async () => {
    const allProjects = await api<Project[]>(`${process.env.ORIGIN}/projects`);

    const paths = allProjects.map((project) => ({ params: { projectId: project.id } }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ project: Project }, { projectId: string }> = async ({ params }) => {
    if (!params) {
        throw new Error('No projects found');
    }

    const project = await api<Play>(`${process.env.ORIGIN}/projects/${params.projectId}`);

    return { props: { project } };
};
