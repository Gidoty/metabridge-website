export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Graduate Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Job Title',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'stars',
      title: 'Star Rating (1–5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: 'programme',
      title: 'Programme',
      type: 'string',
      options: {
        list: ['Cybersecurity', 'Data Analytics', 'Artificial Intelligence', 'Blockchain'],
      },
    },
  ],
}
