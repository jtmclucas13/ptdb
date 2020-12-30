import { GetStaticProps, GetStaticPaths } from 'next';
import { Play, Project } from 'types/project';
import { api } from 'utils/http';

interface ProjectPageProps {
    project: Play;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
    return <div>{JSON.stringify(project)}</div>;
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
