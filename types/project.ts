export interface Project {
    contentWarnings: string[] | null;
    description: string | null;
    endDate: string;
    id: string;
    images: Array<{
        caption: string | null;
        credit: string | null;
        url: string;
    }> | null;
    startDate: string;
    subtitle: string | null;
    sources: string[];
    tagline: string | null;
    title: string;
}

export interface Play extends Project {
    artists: Array<{
        fullName: string;
        id: string;
        headshot: string | null;
        role: string;
    }>;
    director: string;
    playwright: string;
    press: Array<{
        date: string;
        link: string;
        publication: string;
        title: string;
    }> | null;
    producers: string[] | null;
    producingEntity: string;
    runtime: string | null;
    season: string | null;
    venue: string;
    website: string | null;
}
