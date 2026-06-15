export default {
  name: 'book',
  title: 'Books',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Book Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
    },
    {
      name: 'color',
      title: 'Cover Color (CSS gradient or hex)',
      type: 'string',
    },
    {
      name: 'previewText',
      title: 'Preview / Nigerian Context Text',
      type: 'text',
    },
  ],
}
