export type WorkItem = {
  slug: string;
  clientName: string;
  videoName: string;
  coverImage: string;
  videoSrc: string;
  poster?: string;
};

export const works: WorkItem[] = [
  {
    slug: "serdar-paradise",
    clientName: "Serdar",
    videoName: "Paradise",
    coverImage: "/Section-4/1F5A8270.webp",
    videoSrc: "/video/TasVegias.mp4",
    poster: "/Section-4/1F5A8270.webp",
  },
  {
    slug: "cotki-zatlar-film",
    clientName: "Cotki Zatlar",
    videoName: "Campaign Film",
    coverImage: "/Section-4/1F5A8053.webp",
    videoSrc: "/video/output.mp4",
    poster: "/Section-4/1F5A8053.webp",
  },
  {
    slug: "edemen-yakinda-teaser",
    clientName: "Edemen Yakinda",
    videoName: "Teaser",
    coverImage: "/Section-4/1F5A7357.webp",
    videoSrc: "/video/1.MOV",
    poster: "/Section-4/1F5A7357.webp",
  },
  {
    slug: "tas-vegias-launch",
    clientName: "TAS",
    videoName: "Vegias Launch",
    coverImage: "/Section-4/_DSF1938.webp",
    videoSrc: "/video/TasVegias.mp4",
    poster: "/Section-4/_DSF1938.webp",
  },
  {
    slug: "ast-ast-cut",
    clientName: "Ast Ast",
    videoName: "Director's Cut",
    coverImage: "/Section-4/_DSF1986.webp",
    videoSrc: "/video/output.mp4",
    poster: "/Section-4/_DSF1986.webp",
  },
];

export const worksBySlug = works.reduce<Record<string, WorkItem>>(


    (acc, work) => {
     acc[work.slug] = work;
     return acc;
    }



, {});
