export default {
  name: 'announcement',
  title: 'Announcements',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'visible',
      title: 'Visible on Website',
      type: 'boolean',
      initialValue: true,
    },
  ],
}
