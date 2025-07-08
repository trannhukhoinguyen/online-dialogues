import { defineCollection, reference, z } from "astro:content";
import { glob } from 'astro/loaders';

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // Transform string to Date object
    date: z.coerce.date(),
    imageURL: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const characters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/characters" }),
  schema: z.object({
    name: z.string(),
    nationality: z.string(),
    fields: z.array(z.string()),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

const conversations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/conversations" }),
  schema: z.object({
    name: z.string(),
    topic: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    sentences: z.array(z.string()),
    character: reference('characters'),
  }),
});
export const collections = { blog, characters, conversations };
