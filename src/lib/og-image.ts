import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const siteUrl = 'https://nicotomasin.com.ar';

export interface OgImageOptions {
  title: string;
  description?: string;
  category?: string;
}

let inter400: ArrayBuffer | null = null;
let inter700: ArrayBuffer | null = null;

async function loadFonts() {
  if (!inter400 || !inter700) {
    const fontDir = path.join(__dirname, '../../node_modules/@fontsource/inter/files');

    const [font400, font700] = await Promise.all([
      fs.readFile(path.join(fontDir, 'inter-latin-400-normal.woff')),
      fs.readFile(path.join(fontDir, 'inter-latin-700-normal.woff')),
    ]);

    inter400 = font400.buffer.slice(font400.byteOffset, font400.byteOffset + font400.byteLength);
    inter700 = font700.buffer.slice(font700.byteOffset, font700.byteOffset + font700.byteLength);
  }

  return { inter400, inter700 };
}

export async function generateOgImage(options: OgImageOptions): Promise<Buffer> {
  const { title, description, category } = options;
  const fonts = await loadFonts();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a0a0f',
          padding: '64px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                          },
                          children: [
                            {
                              type: 'span',
                              props: {
                                style: {
                                  fontSize: '48px',
                                  fontWeight: 700,
                                  color: '#00ff88',
                                },
                                children: 'N',
                              },
                            },
                            {
                              type: 'span',
                              props: {
                                style: {
                                  fontSize: '48px',
                                  fontWeight: 700,
                                  color: '#e4e4e7',
                                },
                                children: 'T',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '2px',
                                  height: '32px',
                                  backgroundColor: '#1e1e2e',
                                  marginLeft: '16px',
                                  marginRight: '16px',
                                },
                              },
                            },
                            {
                              type: 'span',
                              props: {
                                style: {
                                  fontSize: '20px',
                                  color: '#a1a1aa',
                                  fontFamily: 'monospace',
                                },
                                children: 'Blog',
                              },
                            },
                          ],
                        },
                      },
                      category
                        ? {
                            type: 'div',
                            props: {
                              style: {
                                padding: '10px 20px',
                                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                                border: '1px solid rgba(0, 255, 136, 0.3)',
                                borderRadius: '10px',
                                display: 'flex',
                              },
                              children: {
                                type: 'span',
                                props: {
                                  style: {
                                    fontSize: '18px',
                                    color: '#00ff88',
                                    fontFamily: 'monospace',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                  },
                                  children: category,
                                },
                              },
                            },
                          }
                        : {
                            type: 'div',
                            props: {
                              style: {
                                display: 'none',
                              },
                            },
                          },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px',
                      marginTop: '48px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                          },
                          children: {
                            type: 'span',
                            props: {
                              style: {
                                fontSize: title.length > 60 ? '64px' : '72px',
                                fontWeight: 700,
                                color: '#e4e4e7',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                                maxWidth: '900px',
                              },
                              children: title,
                            },
                          },
                        },
                      },
                      description
                        ? {
                            type: 'div',
                            props: {
                              style: {
                                display: 'flex',
                              },
                              children: {
                                type: 'span',
                                props: {
                                  style: {
                                    fontSize: '28px',
                                    color: '#a1a1aa',
                                    lineHeight: 1.5,
                                    maxWidth: '800px',
                                  },
                                  children:
                                    description.length > 150
                                      ? description.slice(0, 150) + '...'
                                      : description,
                                },
                              },
                            },
                          }
                        : {
                            type: 'div',
                            props: {
                              style: {
                                display: 'none',
                              },
                            },
                          },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                      paddingTop: '32px',
                      borderTop: '1px solid #1e1e2e',
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '22px',
                            color: '#a1a1aa',
                          },
                          children: siteUrl,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            gap: '4px',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '8px',
                                  height: '8px',
                                  backgroundColor: '#00ff88',
                                  borderRadius: '50%',
                                  opacity: 0.6,
                                },
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '8px',
                                  height: '8px',
                                  backgroundColor: '#00ff88',
                                  borderRadius: '50%',
                                  opacity: 0.6,
                                },
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '8px',
                                  height: '8px',
                                  backgroundColor: '#00ff88',
                                  borderRadius: '50%',
                                  opacity: 0.6,
                                },
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fonts.inter400!,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: fonts.inter700!,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}
