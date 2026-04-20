import rss from '@astrojs/rss';

export const prerender = true;

export async function GET(context) {
  return rss({
    title: 'David Schuchert — Full-Stack Developer & Dozent',
    description:
      'Full-Stack Developer und Dozent für Webentwicklung in Bad Hersfeld. Spezialisiert in TypeScript, React, Angular und Laravel.',
    site: context.site,
    items: [
      {
        title: 'Willkommen auf meinem Portfolio',
        pubDate: new Date('2026-04-20'),
        description:
          'Portfolio von David Schuchert — Full-Stack Developer, Dozent bei der DBE-Academy, und AI/MLOps Enthusiast.',
        link: '/',
      },
    ],
    customData: `<language>de-de</language>`,
  });
}
