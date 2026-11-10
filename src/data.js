export const tracks = {
  '1': {
    label: '1-Month Internship',
    days: 30,
    perProject: 10,
    summary: 'Students finish 2 trainer-given projects first, then 1 project of their own choice.',
    projects: [
      { no: 1, source: 'Trainer gives', days: 10, range: 'Day 1 to 10', level: 'Beginner', rule: 'Same brief for all students' },
      { no: 2, source: 'Trainer gives', days: 10, range: 'Day 11 to 20', level: 'Intermediate', rule: 'Builds on Project 1 skills' },
      { no: 3, source: 'Student finds', days: 10, range: 'Day 21 to 30', level: "Student's choice", rule: 'Idea approved by trainer before Day 18' },
    ],
    dates: [
      ['Day 1', 'Hand over Project 1 brief and this checklist'],
      ['Day 10', 'Project 1 review and marks'],
      ['Day 11', 'Hand over Project 2 brief'],
      ['Day 15', 'Students submit their own project idea (use the approval form)'],
      ['Day 18', 'Trainer approves or changes the idea'],
      ['Day 20', 'Project 2 review and marks'],
      ['Day 30', 'Project 3 final review and certificate decision'],
    ],
  },
  '4': {
    label: '4-Month Internship',
    days: 120,
    perProject: 24,
    summary: 'Students finish 3 trainer-given projects first, then 2 projects of their own choice. The order can be changed if you prefer to mix them.',
    projects: [
      { no: 1, source: 'Trainer gives', days: 24, range: 'Day 1 to 24', level: 'Beginner', rule: 'Same brief for all students' },
      { no: 2, source: 'Trainer gives', days: 24, range: 'Day 25 to 48', level: 'Beginner to intermediate', rule: 'New technology added' },
      { no: 3, source: 'Trainer gives', days: 24, range: 'Day 49 to 72', level: 'Intermediate', rule: 'Full-stack or backend added' },
      { no: 4, source: 'Student finds', days: 24, range: 'Day 73 to 96', level: "Student's choice", rule: 'Idea approved before Day 70' },
      { no: 5, source: 'Student finds', days: 24, range: 'Day 97 to 120', level: 'Advanced (final)', rule: 'Idea approved before Day 94; counts as final project' },
    ],
    dates: [
      ['Day 24, 48, 72', 'Review of trainer projects and marks'],
      ['Day 65', 'Students submit idea for Project 4'],
      ['Day 70', 'Trainer approves or changes the idea'],
      ['Day 90', 'Students submit idea for Project 5'],
      ['Day 94', 'Trainer approves or changes the idea'],
      ['Day 96', 'Project 4 review and marks'],
      ['Day 120', 'Final presentation, Project 5 review, certificate decision'],
    ],
  },
}

export const ideas = [
  { type: 'Landing / portfolio site', examples: 'Company landing page, personal portfolio, restaurant page', level: 'Beginner', slot: '1-month P1, 4-month P1' },
  { type: 'Business website', examples: 'Travel agency, clinic, school, real estate site', level: 'Beginner to intermediate', slot: '1-month P2, 4-month P2' },
  { type: 'E-commerce', examples: 'Fashion store, grocery store, book store', level: 'Intermediate to advanced', slot: '1-month P3, 4-month P3' },
  { type: 'Booking / management system', examples: 'Hospital appointments, hotel booking, library system', level: 'Intermediate', slot: '4-month P3 or P4' },
  { type: 'Blog / CMS', examples: 'News blog, WordPress theme, course blog', level: 'Beginner to intermediate', slot: '1-month P1 or P2' },
  { type: 'Education / quiz app', examples: 'Online quiz, student result portal, mini LMS', level: 'Intermediate', slot: '4-month P3 or P4' },
  { type: 'Dashboard / admin panel', examples: 'Sales dashboard, inventory tracker, expense analytics', level: 'Intermediate to advanced', slot: '4-month P4 or P5' },
  { type: 'Mobile app (Flutter)', examples: 'Expense tracker, to-do app, habit tracker', level: 'Intermediate', slot: '4-month P4 or P5' },
  { type: 'API / backend', examples: 'REST API with login, notes API, product API', level: 'Intermediate', slot: '4-month P3' },
  { type: 'Social / community', examples: 'Matrimony site, chat app, job portal', level: 'Advanced', slot: '4-month P5' },
]

export const phases = [
  {
    key: 'planning', title: 'Phase 1: Planning', name: 'Planning and requirements', d10: 'Day 1', d24: 'Day 1 to 2',
    items: ['Project title, goal and target users written', 'Feature list made (must have, nice to have)', 'Technology stack chosen', 'Tasks and day plan shared with the trainer'],
  },
  {
    key: 'design', title: 'Phase 2: Design', name: 'Design (wireframe, database, UI)', d10: 'Day 2 to 3', d24: 'Day 3 to 5',
    items: ['Wireframes or page layouts ready', 'Database or data structure planned (if needed)', 'Colors, fonts and basic UI style decided'],
  },
  {
    key: 'dev', title: 'Phase 3: Development', name: 'Development', d10: 'Day 4 to 7', d24: 'Day 6 to 17',
    items: ['Project folder and Git repository created', 'Core pages or screens built', 'Main features working (login, forms, listing, cart or equivalent)', 'Works on mobile and desktop screens', 'Code committed to Git at least once per day'],
  },
  {
    key: 'test', title: 'Phase 4: Testing', name: 'Testing and bug fixing', d10: 'Day 8', d24: 'Day 18 to 20',
    items: ['Every feature tested with sample data', 'Forms and error cases checked', 'Bugs fixed and re-tested'],
  },
  {
    key: 'deploy', title: 'Phase 5: Deployment and documentation', name: 'Deployment and documentation', d10: 'Day 9', d24: 'Day 21 to 22',
    items: ['Project deployed online (Netlify, Vercel or similar)', 'README written (about, features, how to run)', 'Screenshots added'],
  },
  {
    key: 'review', title: 'Phase 6: Final review', name: 'Final review and presentation', d10: 'Day 10', d24: 'Day 23 to 24',
    items: ['Live demo given to the trainer', 'Trainer feedback noted', 'Marks recorded in the tracking sheet'],
  },
]

export const approvalFields = [
  ['name', 'Student name'],
  ['track', 'Internship track (1-month or 4-month)'],
  ['projectNo', 'Project number (3, 4 or 5)'],
  ['title', 'Project title'],
  ['type', 'Project type'],
  ['problem', 'Problem it solves and target users'],
  ['features', 'Main features (at least 5)'],
  ['stack', 'Technology stack'],
  ['dates', 'Start date and end date'],
  ['reference', 'Similar existing project or reference'],
]

export const approvalChecks = [
  'Idea is original and not a copy of a trainer project',
  'Scope fits the available days (10 or 24)',
  'Has at least 5 working features',
  'Uses technologies the student has already learned',
]

export const criteria = [
  ['Planning and requirements', 10],
  ['UI and design', 15],
  ['Working features', 30],
  ['Code quality and Git use', 15],
  ['Testing', 10],
  ['Deployment', 10],
  ['Documentation and demo', 10],
]
