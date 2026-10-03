// Hand-migrated content from www.sbe-dexlab.com (Wix), October 2026.
// Structure follows the Sanity schemas in studio/schemas. Copy is kept as on the
// old site, with typos fixed and Wix placeholder text removed.
import fs from 'node:fs'
import {img, arrImg, file, ref, arrRef, slug, link, pt, section, card, kv, key} from './lib.mjs'

const focus = JSON.parse(fs.readFileSync(new URL('./photo-focus.json', import.meta.url), 'utf8'))
const EMAIL = 'sbe-dexlab@maastrichtuniversity.nl'
const mailto = (subject) => `mailto:${EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
const SBE = 'https://www.maastrichtuniversity.nl/about-um/faculties/school-business-and-economics'
const BOOKER = 'https://resourcebooker.maastrichtuniversity.nl/'

// ---------------------------------------------------------------- settings
export const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  title: 'DEXLab',
  description:
    'The Digital Experience Lab (DEXLab) at Maastricht University School of Business and Economics investigates how digital technologies transform human experience.',
  announcement: {enabled: false},
  navigation: [
    {_key: key(), _type: 'navItem', label: 'About', href: '/about', children: [
      {_key: key(), _type: 'navChild', label: 'Equipment', href: '/equipment'},
      {_key: key(), _type: 'navChild', label: 'Media', href: '/media'},
      {_key: key(), _type: 'navChild', label: 'FAQ', href: '/faq'},
    ]},
    {_key: key(), _type: 'navItem', label: 'Meet the Team', href: '/meet-the-team'},
    {_key: key(), _type: 'navItem', label: 'Our Work', href: '/our-work', children: [
      {_key: key(), _type: 'navChild', label: 'Build & Implement', href: '/executive-education'},
      {_key: key(), _type: 'navChild', label: 'Educate & Inspire', href: '/education'},
      {_key: key(), _type: 'navChild', label: 'Explore & Research', href: '/research'},
    ]},
    {_key: key(), _type: 'navItem', label: 'Workshops', href: '/workshops', children: [
      {_key: key(), _type: 'navChild', label: 'Emerging Technologies Workshop', href: '/workshops/emerging-technologies'},
      {_key: key(), _type: 'navChild', label: 'Immersive Technologies Workshop', href: '/workshops/immersive-technologies'},
      {_key: key(), _type: 'navChild', label: 'DEXLab Showcase', href: '/workshops/dexlab-showcase'},
      {_key: key(), _type: 'navChild', label: 'DEXplore GenAI Workshop', href: '/workshops/dexplore-genai'},
      {_key: key(), _type: 'navChild', label: 'Presentation Skills Training', href: '/workshops/presentation-skills-training'},
    ]},
    {_key: key(), _type: 'navItem', label: 'Publications', href: '/publications'},
    {_key: key(), _type: 'navItem', label: 'Blog', href: '/blog'},
    {_key: key(), _type: 'navItem', label: 'Visit Us', href: '/visit-us'},
    {_key: key(), _type: 'navItem', label: 'Contact', href: '/contact'},
  ],
  email: EMAIL,
  address: 'Tapijnkazerne 11 (I1.017)\n6211 ME Maastricht\nThe Netherlands',
  socials: [
    {_key: key(), _type: 'social', platform: 'linkedin', url: 'https://www.linkedin.com/company/sbedexlab'},
    {_key: key(), _type: 'social', platform: 'instagram', url: 'https://www.instagram.com/sbe.dexlab/'},
    {_key: key(), _type: 'social', platform: 'youtube', url: 'https://www.youtube.com/watch?v=ObP_syT_xpY'},
  ],
  newsletter: {
    enabled: true,
    heading: 'Join DEXLab mailing list',
  },
  footerNote: 'Photos by Nils Backes',
}

// ---------------------------------------------------------------- categories
export const categories = [
  ['meet-the-team', 'Meet the team!'],
  ['digital-education', 'Digital Education'],
  ['food-for-thought', 'Food for thought'],
  ['experiments', 'Experiments'],
  ['thesis-projects', 'Thesis projects'],
  ['interviews', 'Interviews'],
  ['research', 'Research'],
  ['events', 'Events'],
].map(([s, title], i) => ({_id: `category-${s}`, _type: 'category', title, slug: slug(s), order: (i + 1) * 10}))

// ---------------------------------------------------------------- people
const person = (id, name, role, group, order, photo, linkedin) => ({
  _id: `person-${id}`,
  _type: 'person',
  name,
  role,
  group,
  order,
  ...(photo && {photo: img(photo, `Portrait of ${name}`)}),
  ...(linkedin && {linkedin}),
})

// Bios as on the old Wix team page, shown when hovering over (or tapping) a portrait.
const bios = {
  "jonas-heller": "Jonas Heller is a tenured Assistant Professor of Marketing at Maastricht University School of Business and Economics and co-founder and Scientific Director of DEXLab. His research examines how artificial intelligence, augmented and virtual reality, and other emerging technologies such as brain-computer interfaces shape consumer decision-making, service experiences, and well-being. He holds a PhD in Marketing from the University of New South Wales and has published more than 30 peer-reviewed articles.",
  "tim-hilken": "Tim Hilken is an Associate Professor in the Department of Marketing and Supply Chain Management at Maastricht University School of Business and Economics and a co-founder of DEXLab. His research focuses on the user experience of augmented reality in consumer and business markets, in particular the psychological mechanisms through which AR creates experiential value and improves decision-making. He also studies digital marketing and the role of virtual reality and artificial intelligence, and collaborates with technology providers and firms on lab and field studies.",
  "dominik-mahr": "Dominik Mahr is Professor of Digital Innovation and Marketing at Maastricht University School of Business and Economics, Scientific Director of the Service Science Factory, and a co-founder of DEXLab. His work integrates research, education and business practice in marketing, innovation, digitization, strategy, services and design thinking. His research covers customer co-creation, service innovation and emerging technologies such as service robots, the Internet of Things and augmented reality.",
  "roberta-di-palma": "Roberta Di Palma is an Assistant Professor in Educational Research and Development at Maastricht University School of Business and Economics and a co-founder of DEXLab, where she leads projects on digital and immersive technologies. Her research examines technology-enabled services in education and business, with a focus on virtual reality, including the role of feedback in VR-based presentation skills training. She holds a Bachelor's in International Business and a Master's in Strategic Marketing, both from Maastricht University.",
  "stefan-bos": "PhD candidate at SBE. His research focuses on emotional and behavioral change using Virtual Reality, in particular how Virtual Reality can be used to increase empathy and understanding towards stigmatized groups of people or situations.",
  "nea-saarreharju": "Nea Saarreharju is the DEXLab Manager and supports the lab's research, education and the management of its technologies. She holds a Bachelor's in Educational Science from a German university and a Master's in Educational Science and Technology from the University of Twente. Her research interests center on how technology and games can support learning, in particular speaking and communication skills in foreign languages.",
  "ilias-massignan": "Intern of the DEXLab and a Master student at Maastricht University. He is currently pursuing a Master’s in Strategic Marketing and writing his thesis on how immersive technologies can be connected to real-world applications in marketing and education.",
  "yosune-uribe": "Intern at the DEXLab and a Master’s student at Maastricht University. She is currently following the Strategic Marketing programme and exploring how AI-generated fashion recommendations can influence consumers’ sense of self-expression and purchase intentions.",
  "wojciech-mandrysch": "Intern at the DEXLab and a Master’s student at Maastricht University. He is currently following the Supply Chain programme and writing his thesis on how agentic AI can be used in procurement negotiations, while also contributing to projects investigating LLM use cases in education.",
  "corinna-rott": "PhD candidate in psychology at Maastricht University and the University of Antwerp, specializing in stress regulation and team performance. Her research combines wearable technology, psychophysiological assessment, and immersive environments. At DEXLab, she co-hosted the (De)Stress VR study, exploring how virtual reality can induce and reduce stress through tailored interventions.",
  "anna-krispin": "Researcher focusing on VR- and AI-based training for oral communication skills. Examining how immersive environments and generative AI can support learners in practicing public speaking and workplace interactions with realistic feedback. She investigates how these technologies can enhance communication skills, build confidence, and improve training outcomes in both educational and professional contexts."
}

export const people = [
  person('jonas-heller', 'Jonas Heller', 'Co-Founder & DEXLab Director', 'core', 10, '9aa9b6_e62b00529193489098998e434efd57dc~mv2.png', 'https://www.linkedin.com/in/hellerjonas/'),
  person('tim-hilken', 'Tim Hilken', 'Co-Founder & DEXLab Director', 'core', 20, '9aa9b6_d3c982bb3abe4881ad3cdf6660ecdee5~mv2.png', 'https://www.linkedin.com/in/timhilken/'),
  person('dominik-mahr', 'Dominik Mahr', 'Co-Founder & DEXLab Director', 'core', 30, '9aa9b6_405e0be02ffa4ddb80dd1e113b45a1d7~mv2.jpeg', 'https://www.linkedin.com/in/dominik-mahr-5820083/'),
  {...person('roberta-di-palma', 'Roberta Di Palma', 'Co-Founder & DEXLab Coordinator', 'core', 40, '9aa9b6_f1d5a18fd9b94aedaa3e0d2566b3e8b1~mv2.jpeg', 'https://www.linkedin.com/in/roberta-di-palma/'), email: 'r.dipalma@maastrichtuniversity.nl'},
  {
    ...person('nea-saarreharju', 'Nea Saarreharju', 'DEXLab Manager', 'core', 5, '9aa9b6_d296bb4552c14e4f9cc7ace706447deb~mv2.jpg'),
    email: 'nea.saarreharju@maastrichtuniversity.nl',
  },
  person('ilias-massignan', 'Ilias Massignan', 'DEXLab Intern', 'intern', 10, '9aa9b6_0afef63ea2b643a6b93afb94b8fd02ac~mv2.jpg', 'https://www.linkedin.com/in/ilias-massignan-5a49b2241/'),
  person('yosune-uribe', 'Yosune Uribe', 'DEXLab Intern', 'intern', 20, '9aa9b6_6c91e094eda14787966f9d7d5a951ff3~mv2.jpg', 'https://www.linkedin.com/in/yosuneuribe'),
  person('wojciech-mandrysch', 'Wojciech Mandrysch', 'DEXLab Intern', 'intern', 30, '9aa9b6_087e4e61290940be93a3e29958446b78~mv2.jpg', 'https://www.linkedin.com/in/wojciech-mandrysch/'),
  person('corinna-rott', 'Corinna Rott', 'PhD Candidate', 'associate', 10, '9aa9b6_94e13b3fad2d494e88b0fc42a679c124~mv2.jpg'),
  person('anna-krispin', 'Anna Krispin', 'PhD Candidate', 'associate', 20, '9aa9b6_d59ed18501f14dc1a79f350945c57e75~mv2.png'),
  person('roman-briker', 'Roman Briker', 'Assistant Professor', 'associate', 30, '9aa9b6_c7c5b392528b49ddbc7581c8a0d03c8a~mv2.png', 'https://www.linkedin.com/in/roman-briker-607265a1'),
  person('joana-duhamel', 'Joana Duhamel', 'PhD Candidate', 'associate', 40, '9aa9b6_2a0beea703d04005ad39265cd9c8fac5~mv2.png', 'https://www.linkedin.com/in/joanaduhamel/'),
  person('mark-becker', 'Mark Becker', 'Assistant Professor', 'associate', 50, '9aa9b6_8b5891cd9a5942a8a312a378c2509c07~mv2.png'),
  person('alexandru-maris', 'Alexandru Maris', 'PhD Candidate', 'associate', 60, '9aa9b6_dc03a800f9834a63b9695e61a938baac~mv2.png', 'https://www.linkedin.com/in/marisalexandru/'),
  person('ibrahim-humdi', 'Ibrahim Humdi', 'PhD Candidate', 'associate', 70, '9aa9b6_d35e0e1598b34fd7bdcc6d2f58db022f~mv2.png'),
  {...person('stefan-bos', 'Stefan Bos', 'PhD Candidate', 'associate', 80), linkedin: 'https://www.linkedin.com/in/stefan-bos97/', photo: img('9aa9b6_ed4463295fb949e9825fc42cd7211b85~mv2.jpg', 'Portrait of Stefan Bos', 'imageWithAlt', 0.3)},
].map((p) => (bios[p._id.slice(7)] ? {...p, bio: bios[p._id.slice(7)]} : p))

// Former managers and interns, from their "Meet our new ..." blog posts (photos from the same posts).
// period = the academic year they started (September to August); order sorts within the year.
const alum = (id, name, role, period, post, photo, order) => ({
  _id: `person-${id}`,
  _type: 'person',
  name,
  role,
  group: 'alumni',
  period,
  introPost: ref(`post-${post}`),
  photo: img(`9aa9b6_${photo}`, `Portrait of ${name}`),
  order,
})
people.push(
  alum('noah-moonen', 'Noah Moonen', 'DEXLab Manager', '2022/23', 'meet-the-new-dexlab-manager', '5b180593bf02408ea83aa1d283b2d8d6~mv2.jpg', 10),
  alum('philipp', 'Philipp', 'DEXLab Intern', '2022/23', 'meet-the-new-dexlab-intern', '9a0c8b59cb4a4a9181417a2c9919befa~mv2.png', 20),
  alum('moritz-wigger', 'Moritz Wigger', 'Thesis Intern', '2022/23', 'meet-our-first-international-intern', '2a93fd3d22634d9d8bdfb72ba38b50a2~mv2.png', 30),
  alum('david-grigorjan', 'David Grigorjan', 'DEXLab Manager', '2023/24', 'meet-our-new-dexlab-manager-starting-in-february', 'be17fc3a748f47fab3c9c1784032dd43~mv2.jpg', 110),
  alum('claudia-fasano', 'Claudia Fasano', 'DEXLab Intern', '2023/24', 'meet-our-new-intern-claudia-fasano', '2af159f058b94766a7ccc4c97e52e94b~mv2.png', 120),
  alum('thies-verbraak', 'Thies Verbraak', 'DEXLab Intern', '2023/24', 'meet-our-new-intern-thies-verbraak', 'cb8631cf58494307ad60961ca5390354~mv2.jpeg', 130),
  alum('lakkoju-nikhilesh-sai-acharya', 'Lakkoju Nikhilesh Sai Acharya', 'DEXLab Intern', '2023/24', 'meet-our-new-intern-lakkoju-nikhilesh-sai-acharya', '3a8e8544aa3c4dd097b804212809655f~mv2.jpeg', 140),
  alum('chau-giang-nguyen', 'Chau Giang Nguyen', 'DEXLab Intern', '2023/24', 'meet-our-new-intern-chau-giang-nguyen', '17d99b9d949647b49dacaf92aadc99e5~mv2.jpeg', 150),
  alum('steve-biewer', 'Steve Biewer', 'DEXLab Intern', '2023/24', 'meet-our-new-intern-steve-biewer', '04a8cd24c3bc43feb91bfb42c49e25bd~mv2.png', 160),
  alum('adam-knaus', 'Adam Knaus', 'Thesis Intern', '2023/24', 'our-team-is-expanding-introducing-our-new-interns', '91f31ebc94b44c10978472586f8e94db~mv2.png', 170),
  alum('angela-fasana-vacca', 'Angela Fasana Vacca', 'Thesis Intern', '2023/24', 'our-team-is-expanding-introducing-our-new-interns', '0fa2d5d6d73d47fcbdcaa3b314448059~mv2.png', 180),
  alum('botond-kovacs', 'Botond Kovács', 'Thesis Intern', '2023/24', 'our-team-is-expanding-introducing-our-new-interns', 'a322986d62ca4be4b984ee59c808f95f~mv2.png', 190),
  alum('michael-kallas', 'Michael Kallas', 'Thesis Intern', '2023/24', 'our-team-is-expanding-introducing-our-new-interns', '3c67a926426349a29403853678d7f505~mv2.png', 200),
  alum('malina-alizei', 'Malina Alizei', 'Thesis Intern', '2023/24', 'our-team-is-expanding-introducing-our-new-interns', 'b1eddc90351f41909fea89ceaef12a10~mv2.jpg', 210),
  alum('mariska-geerts', 'Mariska Geerts', 'Thesis Intern', '2023/24', 'our-team-is-expanding-introducing-our-new-interns', '4451e7d3ff8649e5ad81138ef9982807~mv2.png', 220),
  alum('brian-arets', 'Brian Arets', 'DEXLab Manager', '2024/25', 'meet-our-new-dexlab-manager', 'c1287cbce02643899445fec2b0505635~mv2.jpg', 310),
  alum('martina-pagano', 'Martina Pagano', 'Thesis Intern', '2024/25', 'welcome-new-thesis-internship-students', '5ca45d540f364b6d8831013380b2bfec~mv2.jpeg', 320),
  alum('ayat-azzimani', 'Ayat Azzimani', 'Thesis Intern', '2024/25', 'welcome-new-thesis-internship-students', '766d917953c745bda3cecef7ea864bdf~mv2.jpeg', 330),
  alum('lara-grunschel', 'Lara Grunschel', 'Thesis Intern', '2024/25', 'welcome-new-thesis-internship-students', '07baaa19d6e24689933a6d6f8be6c705~mv2.jpeg', 340),
  alum('laura-grisi-chavarria', 'Laura Grisi Chavarria', 'Thesis Intern', '2024/25', 'welcome-new-thesis-internship-students', 'e49bc722bc864c689e979faa19c1be64~mv2.jpg', 350),
)

// Face-centred focal points (and, for alumni, a square head-and-shoulders crop), detected from
// the photos with OpenCV and checked by eye. See migration/photo-focus.json.
for (const p of people) if (p.photo && focus[p._id]) Object.assign(p.photo, focus[p._id])

// ---------------------------------------------------------------- equipment
const eq = (name, category, quantity, image, order) => ({
  _id: `equipment-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}`,
  _type: 'equipment',
  name,
  category,
  quantity,
  order,
  image: img(image, name),
})
export const equipment = [
  eq('Oculus Quest 2', 'immersive', 17, '9aa9b6_f0509f04d0f24c7cb63c1c60951d5c90~mv2.png', 10),
  eq('Oculus Quest 3', 'immersive', 15, '9aa9b6_1ca1c9c3134c48e2b4a31b5d315d9469~mv2.jpg', 20),
  eq('Microsoft HoloLens 2', 'immersive', 2, '9aa9b6_6ace5e51c4fc467696c9b0b0db6abbed~mv2.png', 30),
  eq('Magic Leap 1', 'immersive', 3, '9aa9b6_0aaf7dd9e2fd468bafabd7b2dff86a6d~mv2.png', 40),
  eq('Apple Vision Pro', 'immersive', 1, '9aa9b6_558fe0123527480798ecece429d49170~mv2.png', 50),
  eq('Meta Ray-Ban', 'immersive', 1, '9aa9b6_623c5a6d0aaf43d2981050829f9cd68d~mv2.png', 60),
  eq('Insta360 EVO', 'immersive', 1, '9aa9b6_33ad8dbd02144d5eabfdc93ce6f1b60f~mv2.png', 70),
  eq('Temi Service Robot', 'robotics', 1, '9aa9b6_ceececbaf0c242ef9dc5650bfe6cf2cb~mv2.png', 110),
  eq('Sanbot Elf', 'robotics', 2, '9aa9b6_f3742ddf3d094b02b43f6ddd7a3054f2~mv2.png', 120),
  eq('Vector Robot', 'robotics', 1, '9aa9b6_ae684e4ff66d4cf18b9f928b88f668a9~mv2.png', 130),
  eq('Abii Robot', 'robotics', 1, '9aa9b6_b52ba4b05a5f458981f2cf38cc9e868a~mv2.png', 140),
  eq('Hiro-Chan', 'robotics', 3, '9aa9b6_181530be6dfd499681c4a2ca71383d55~mv2.png', 150),
  eq('Apple iPad (2021)', 'mobile', 10, '9aa9b6_4cda5c9f65174a26b430e5a841927662~mv2.png', 210),
  eq('Windows Laptop', 'mobile', 13, '9aa9b6_4f8d1b2fb77c42a3ae2b30076164a06d~mv2.png', 220),
  eq('HD Webcam', 'mobile', 6, '9aa9b6_4942dff7967c495c84c6585351b1220b~mv2.png', 230),
  eq('Eyetech VT3 Mini', 'biometric', 1, '9aa9b6_15032035317f4d5f9fae1b0f1a12c2f9~mv2.jpeg', 310),
  eq('Shimmer3 GSR+ Unit', 'biometric', 6, '9aa9b6_ad82e8e972b44c2ab2c1195ec182f62c~mv2.png', 320),
]

// ---------------------------------------------------------------- FAQ
const faqItem = (n, question, ...answer) => ({_id: `faq-${n}`, _type: 'faq', question, order: n * 10, answer: pt(answer)})
export const faqs = [
  faqItem(1, 'What services does the DEXLab offer?',
    'DEXLab is a research and development lab that focuses on digital technologies for educational and research purposes.',
    'It provides specialised workshops on business digital tools, immersive Virtual Reality training for skills such as presentations and interviews, and custom digital breakout sessions for academic courses.',
    "In addition, advanced digital tools and lab space are available for research and business support. DEXLab's mission is to help individuals navigate the digital landscape, enrich their academic initiatives, and drive innovative technology research.",
    '[Read more about DEXLab](/about)'),
  faqItem(2, 'How can I book the DEXLab?',
    "To book the DEXLab for an experiment or digital breakout session, start by familiarising yourself with the lab's guidelines to ensure you understand all the necessary procedures. For experiments, consider seeking ethical approval, though this is optional.",
    `- **Checking lab availability:** use the [Resource Booker](${BOOKER}) platform to view available dates and times for the DEXLab.`,
    '- **Selecting your activity:** clearly specify your activity type when booking to facilitate efficient scheduling.',
    '- **Submitting required forms:** attach the necessary forms, the "Experiment Application Form" and the "Equipment Disclaimer Form" for experiments, and only the latter for other activities.',
    '- **Being mindful of timing:** consider the availability of student participants, especially during vacations and exam periods.',
    '- **Preparation and cancellation:** ensure your experimental design is complete and ethically approved before booking. Avoid frequent cancellations.',
    '- **Final steps:** after following these steps, your request will be reviewed and confirmed upon meeting all requirements.'),
  faqItem(3, "Can I also book the DEXLab's equipment?",
    "Yes, staff can book equipment from the DEXLab. It is available for in-lab use, subject to availability, but cannot be removed without special permission.",
    'For field studies or usage outside of the DEXLab, you can use the equipment lending form. Keep in mind that the equipment is intended primarily for experiments or digital breakout sessions.',
    "Users are responsible for the equipment's care and must report any damages to the lab manager.",
    '[See our equipment](/equipment)'),
  faqItem(4, "Can I get access to the DEXLab's premium software?",
    'Yes, DEXLab offers staff access to premium software tools such as ChatGPT, Midjourney, Doodle, and Canva Pro for enhancing academic and research projects.',
    `To use these resources, send an email request to [${EMAIL}](mailto:${EMAIL}) detailing the specific software you need, the duration of use, and the purpose it will serve.`,
    "Requests will be assessed based on availability and the software's applicability to your project. Approved users will receive guidance for software access and any necessary support."),
  faqItem(5, 'What digital technologies does the DEXLab offer?',
    'The DEXLab at Maastricht University offers a variety of digital technologies such as Augmented Reality (AR), Virtual Reality (VR), Mixed Reality (XR), service robots, and neuroscientific tools such as eye-tracking, galvanic skin response, or facial analysis.',
    'These technologies are used to enhance research and education, offering opportunities for innovative learning and collaboration.',
    'Besides that, we also have laptops and iPads that can be used in experiments or for conducting surveys.',
    '[See our equipment](/equipment)'),
  faqItem(6, 'I teach at Maastricht University. How can I integrate digital technologies into my courses?',
    'Integrating digital technologies into your courses involves several steps. Start by understanding the range of technologies available.',
    'Define how these can be used in your courses, aligning them with your educational objectives. You need to book the lab well in advance and design your session to make optimal use of the chosen technology.',
    "During the session, guide your students through the activities and follow the DEXLab guidelines to ensure a smooth experience. Afterwards, gather feedback to assess the session's impact and effectiveness.",
    'The DEXLab staff can advise and train you and your teaching staff in advance, but does not serve as teaching staff.',
    '[Learn more about education at DEXLab](/education)'),
  faqItem(7, "How can DEXLab's equipment and research activities help me in my academic journey?",
    "Using DEXLab's equipment and facilities can significantly enhance your academic journey.",
    'The lab offers access to advanced technologies like VR and AR, providing hands-on experience that is invaluable in various fields.',
    "It is an ideal environment for conducting experimental research, especially in studying human behaviour. The lab also supports educational activities and encourages interdisciplinary collaboration, which is crucial for academic and professional development.",
    'Additionally, attending workshops and training sessions at DEXLab can broaden your skill set and knowledge base.',
    '[Learn more about research at DEXLab](/research)'),
  faqItem(8, 'Can I do my (thesis) internship with DEXLab?',
    "For a thesis internship at DEXLab, you should initially consult with your thesis supervisor to align your research interests with the lab's capabilities.",
    'Following this, please contact the DEXLab administrators or the lab manager to obtain detailed information and determine the feasibility of your proposed project. This applies to both general internships and the Business Engineering Thesis Research Project (TRP).',
    `If you are interested in other internship opportunities at DEXLab, such as those related to technology management, digital innovation, or a specific project you have in mind, reach out directly to us at [${EMAIL}](mailto:${EMAIL}). We welcome discussions about the possibilities and are keen to support enthusiastic learners in their professional growth.`),
  faqItem(9, 'I am a professional. Can I run a workshop with my team using your equipment and facilities?',
    'At DEXLab, we are thrilled to offer workshops that allow professionals and their teams to delve into the world of emerging technologies like Augmented and Virtual Reality (AR and VR), service robots, and generative AI.',
    'These workshops, led by our expert faculty comprising world-leading academics in various fields, provide an in-depth understanding of how these technologies are reshaping industries and society. Participants will not only learn about the applications and transformative power of these technologies but also explore their potential to drive innovation and growth within their organisations.',
    `For those interested in participating or learning more, reach out to us at [${EMAIL}](mailto:${EMAIL}).`,
    '[See our workshops](/workshops)'),
]

// ---------------------------------------------------------------- workshops
const TECH = {
  SR: ['SR', 'Service Robots', '9aa9b6_17d36a54419247998b39dd84dcb7ec07~mv2.png'],
  VR: ['VR', 'Virtual Reality', '9aa9b6_560988cabbe84f2b9398d5c82eb23368~mv2.png'],
  AR: ['AR', 'Augmented Reality', '9aa9b6_be0b4625c27e432c8d85a7307f4f3d09~mv2.png'],
  AI: ['AI', 'Artificial Intelligence', '9aa9b6_4f72b67da7d24b96a22f722c8d46fdb9~mv2.png'],
}
const tech = (...codes) =>
  codes.map((c) => ({_type: 'technology', _key: key(), short: TECH[c][0], name: TECH[c][1], image: img(TECH[c][2], TECH[c][1])}))

const DEEP_DIVE = {
  AR: '**Augmented Reality (AR):** learn how AR can add a virtual layer of information to the real world, creating new marketing opportunities and enhancing experiences.',
  VR: '**Virtual Reality (VR):** discover the potential of VR in training, design, and storytelling, and how it can transform user experiences.',
  SR: '**Service Robots:** understand the roles and autonomy of service robots, and their applications in for instance healthcare, retail, and hospitality.',
  AI: '**Generative AI:** delve into the world of AI, its benefits, risks, and practical applications in various industries.',
}

export const workshops = [
  {
    _id: 'workshop-emerging-technologies',
    _type: 'workshop',
    title: 'Emerging Technologies Workshop',
    slug: slug('emerging-technologies'),
    order: 10,
    summary: 'Up to 15 participants immerse themselves with VR and AR glasses, engage with service robots and supercharge their productivity with AI.',
    cardImage: img('9aa9b6_6c290ce73c934678a641f695a31b4408~mv2.jpg', 'Participants trying VR headsets'),
    heroImage: img('9aa9b6_285b1a0227cf4a36b6940ffc03b33a0b~mv2.jpg', 'Emerging technologies workshop'),
    intro: 'This 3-hour workshop is designed for everybody who wants to experience the state of emerging technologies like Virtual Reality, Augmented Reality, Robotics, and Artificial Intelligence.',
    gallery: [
      arrImg('9aa9b6_e2d2643337014dd4a8fc6a9f0d2b11f1~mv2.jpg', 'Workshop participants'),
      arrImg('9aa9b6_fad959861f4a48948e57a08c96f5f26f~mv2.jpg', 'Workshop participants'),
      arrImg('9aa9b6_41948e9926f24d2e85d5a3b9bad0cd46~mv2.jpg', 'Workshop participants'),
    ],
    facts: [kv('3 hours'), kv('Up to 15 people'), kv('Hands-on', null, 'Everybody tries every technology')],
    technologies: tech('SR', 'VR', 'AR', 'AI'),
    outcomesHeading: 'What does the Emerging Technologies Workshop hold for you?',
    outcomes: ['Try out all technologies', 'Learn where these technologies are used', 'Learn how you could use these technologies effectively', 'Work on a business case'],
    body: pt('### The technologies in depth', DEEP_DIVE.AR, DEEP_DIVE.VR, DEEP_DIVE.SR, DEEP_DIVE.AI),
    contactSubject: 'Emerging Technologies Workshop',
  },
  {
    _id: 'workshop-immersive-technologies',
    _type: 'workshop',
    title: 'Immersive Technologies Workshop',
    slug: slug('immersive-technologies'),
    order: 20,
    summary: 'Up to 15 participants immerse themselves with VR and AR glasses. This workshop focuses purely on the immersive technologies of Virtual and Augmented Reality.',
    cardImage: img('9aa9b6_8cd4348dac4d41c0945a0de04fe474b0~mv2.jpg', 'Participants in VR'),
    heroImage: img('9aa9b6_cbcb65c720014ceb8bcb9cd114c0140d~mv2.jpg', 'Immersive technologies workshop'),
    intro: 'This 3-hour workshop is designed for everybody who wants to enter the metaverse with experiences in Virtual Reality and Augmented Reality.',
    gallery: [
      arrImg('9aa9b6_1ae96c9f6687426fbed6deb2b7c1c077~mv2.jpg', 'Workshop participants'),
      arrImg('9aa9b6_bf6b448368ad43a9af918763ec487236~mv2.jpg', 'Workshop participants'),
      arrImg('9aa9b6_14614a0ecf7f49c8b8f40d45d77a1a04~mv2.jpeg', 'Workshop participants'),
    ],
    facts: [kv('3 hours'), kv('Up to 15 people'), kv('VR & AR', null, 'A deep dive into immersive tech')],
    technologies: tech('VR', 'AR'),
    outcomesHeading: 'What does the Immersive Technologies Workshop hold for you?',
    outcomes: ['Try out Virtual Reality as well as Augmented Reality', 'Learn where these technologies are used', 'Learn how you could use these technologies effectively', 'Work on a business case'],
    body: pt('### The technologies in depth', DEEP_DIVE.AR, DEEP_DIVE.VR),
    contactSubject: 'Immersive Technologies Workshop',
  },
  {
    _id: 'workshop-dexlab-showcase',
    _type: 'workshop',
    title: 'DEXLab Showcase',
    slug: slug('dexlab-showcase'),
    order: 30,
    summary: 'Witness emerging digital technologies with a larger group. Hosted in English or Dutch, 2 to 3 hours, up to 35 people, available anywhere you want.',
    cardImage: img('9aa9b6_031adfbbd9304c1ab0e4ae60f5bbfc66~mv2.jpg', 'DEXLab showcase audience'),
    heroImage: img('9aa9b6_1b1a3c3771734ee2862cbd3d12fe1142~mv2.jpg', 'DEXLab showcase'),
    intro: 'This workshop is designed for big groups who want to experience emerging technologies in action!',
    gallery: [
      arrImg('9aa9b6_722bce25343d4b5aa2019b2258eee744~mv2.jpg', 'Showcase participants'),
      arrImg('9aa9b6_4621232cc2ae4d10b76581b9118fdae1~mv2.jpg', 'Showcase participants'),
      arrImg('9aa9b6_84eb940a5e6c42d6adf3dea44a92ae43~mv2.jpg', 'Showcase participants'),
    ],
    facts: [kv('2 to 3 hours'), kv('Up to 35 people'), kv('English or Dutch'), kv('Anywhere', null, 'At Maastricht University or on location')],
    technologies: tech('SR', 'VR', 'AR', 'AI'),
    outcomesHeading: 'What does the Showcase hold for you?',
    outcomes: ['See the technologies in action or volunteer to experience them first-hand', 'Learn where these technologies are used', 'Learn how you could use these technologies effectively', 'Work on a business case'],
    body: pt(
      '### The technologies in depth', DEEP_DIVE.AR, DEEP_DIVE.VR, DEEP_DIVE.SR, DEEP_DIVE.AI,
      '### What is the difference between the Showcase and the Workshop?',
      'In the workshop, we can guarantee that everybody can try on the technologies and use them, because the group is smaller. The showcase demonstrates what the technology can do, and one or two people can volunteer to try the technologies out. This allows bigger groups to be present and see the technologies in action.',
    ),
    contactSubject: 'DEXLab Showcase',
  },
  {
    _id: 'workshop-dexplore-genai',
    _type: 'workshop',
    title: 'DEXplore GenAI Workshop',
    slug: slug('dexplore-genai'),
    order: 40,
    summary: 'Discover AI and how you can use it in your own workflow. Hosted in English or Dutch, 3 hours, up to 35 people, at Maastricht University or in-house at your company.',
    cardImage: img('9aa9b6_624d455775c34a09a82455bdca1cbdfb~mv2.jpg', 'Participants working with GenAI'),
    heroImage: img('9aa9b6_f47c0e7d1c83425a9060a984b0dda324~mv2.jpg', 'DEXplore GenAI workshop'),
    intro: "This 3-hour workshop is designed for everybody who is curious about (generative) Artificial Intelligence and wants to understand how to better incorporate it into their workflow.",
    gallery: [
      arrImg('9aa9b6_3bbf33f9883041e79d5a3b1a9fe0eb2e~mv2.jpg', 'GenAI workshop'),
      arrImg('9aa9b6_47680d5e1efa4e0e9bf6bd2f33f06261~mv2.jpg', 'GenAI workshop'),
      arrImg('9aa9b6_913224adf29d4fd69e27fb6521dedf92~mv2.png', 'AI-generated illustration of an excited employee'),
    ],
    facts: [
      kv('3 hours', null, 'Enough time to dig deep into the topic and gain a profound understanding of the state of AI.'),
      kv('5 to 35 people', null, 'Scalable, so we can keep discussions and activities valuable and insightful.'),
      kv('Workflow analysis', null, 'We map your current workflow and find where AI would help.'),
      kv('Anywhere', null, 'Hosted at Maastricht University or at your company.'),
    ],
    technologies: tech('AI'),
    contactSubject: 'AI Workshop',
  },
  {
    _id: 'workshop-presentation-skills-training',
    _type: 'workshop',
    title: 'Presentation Skills Training',
    slug: slug('presentation-skills-training'),
    order: 50,
    summary: "Big presentation coming up and wondering how you could improve your presentation skills? Train your skills with the use of VR and AI.",
    cardImage: img('9aa9b6_c7551177a46f4aaa9b28312261c4cd82~mv2.jpg', 'Presenting in a virtual room'),
    heroImage: img('9aa9b6_a50eabd8f8614231b06744c06e67dae6~mv2.jpg', 'Presentation skills training in VR'),
    intro: 'Practise anything from giving a keynote in front of a big crowd to handling one-on-one negotiations about difficult topics. With Virtual Reality and Artificial Intelligence, an immersive experience is waiting for you to try out and learn from!',
    gallery: [
      arrImg('9aa9b6_ef882c65664c435cb1e071446fc48615~mv2.jpg', 'VR presentation training'),
      arrImg('9aa9b6_fad77f613ca445b9b21789ed83c6835a~mv2.jpg', 'VR presentation training'),
      arrImg('9aa9b6_9489d4889ef2455bbc334d38344c5afd~mv2.jpg', 'VR presentation training'),
    ],
    facts: [
      kv('Highly personalised', null, 'Thanks to smart AI integration, the software can learn and respond to any topic and any scenario.'),
      kv('Easy to use', null, 'The experience is intuitive and immersive, which creates a natural environment to apply and improve your skills.'),
      kv('Variety', null, 'Almost any scenario where you have to speak can be emulated.'),
      kv('Universal', null, 'Presenting is a skill used daily, which makes this training essential for almost everybody.'),
    ],
    technologies: tech('VR', 'AI'),
    contactSubject: 'Presentation Skills Training',
  },
  {
    _id: 'workshop-custom',
    _type: 'workshop',
    title: 'Custom Workshop',
    slug: slug('custom'),
    order: 60,
    externalOnly: true,
    summary: 'Want a completely custom workshop? We offer those too! Contact us and we will be happy to discuss the opportunities together.',
    cardImage: img('9aa9b6_0af994503fce47f7bfc0e3f58b50ced8~mv2.jpg', 'A full workshop room'),
    contactSubject: 'Custom Workshop',
  },
]

// ---------------------------------------------------------------- pages
const hero = (heading, subheading, image, extra = {}, focusY) =>
  section('sectionHero', {heading, subheading, layout: image ? 'banner' : 'plain', ...(image && {image: img(image, '', 'imageWithAlt', focusY)}), ...extra})
const contactCta = (heading, subject, extra = {}) =>
  section('sectionCta', {heading, intro: `Contact ${EMAIL}`, buttons: [link('Contact us', mailto(subject))], tone: 'default', ...extra})

const page = (s, title, sections, seo) => ({
  _id: `page-${s}`,
  _type: 'page',
  title,
  slug: slug(s),
  sections,
  ...(seo && {seo: {_type: 'seo', ...seo}}),
})

export const pages = [
  page('home', 'Home', [
    section('sectionHero', {
      heading: 'DEXLab the Digital Experience Lab',
      image: img('9aa9b6_622b7a14b9c941688d04edf7c37f7ccc~mv2.jpg', 'The DEXLab team holding VR headsets', 'imageWithAlt', 0.35),
      subheading:
        'We investigate how digital technologies transform human experience. Our work brings together immersive experiences, service robots, biometric tools, and artificial intelligence. Through cross-disciplinary collaboration, research, and hands-on workshops, we help students, researchers, and industry partners explore how technology can improve education, services, and society.',
      layout: 'split',
      buttons: [link('Read More', '/about')],
    }),
    section('sectionCards', {
      heading: 'DEXLab What We Do',
      intro: 'The SBE DEXLab offers a collaborative space for the SBE community and beyond, facilitating digital research and education through accessible, state-of-the-art technology and resources. We incorporate among others mixed reality, service robots, and GenAI in our workshops and research.',
      style: 'icon',
      columns: 3,
      items: [
        card('Education', 'DEXLab focuses on digital learning and research, embracing a project-based learning (PBL) approach. It encourages skill building by providing practical experiences with new technologies.', {image: img('9aa9b6_084c9eba0ae14fdab3c89ce8410d3cff~mv2.png', ''), link: link('View More', '/education')}),
        card('Research', 'DEXLab at Maastricht University specializes in academic research, exploring digital experiences with innovative technologies. It promotes collaborative research and modern education.', {image: img('9aa9b6_fbda0d19f2a94a40b5e9564b7e86bc62~mv2.png', ''), link: link('View More', '/research')}),
        card('Executive Education', 'DEXLab combines project-based learning and a network of experts to provide engaging education in digital technologies for companies and businesses and forward-thinking leaders.', {image: img('9aa9b6_388bb86ec358448ca1f049429f7c5938~mv2.png', ''), link: link('View More', '/executive-education')}),
      ],
    }),
    section('sectionText', {
      body: pt(
        '**Our goal is to provide a comprehensive suite of digital tools and facilities, not just for our immediate SBE community but also extending our reach beyond.**',
        '**We are here to support and enhance your research and education with applied and generative AI that powers experiments, prototypes, and data-driven insights, alongside immersive technologies, service robots, and biometric tools.**',
        '**Through thoughtful planning, organization, and guidance, we help turn ideas into impactful digital projects.**',
      ),
      image: img('9aa9b6_ea197c62f5d44b6380f9664d2d83bbfa~mv2.png', 'Students interacting with the service robot Temi'),
      imagePosition: 'right',
      buttons: [link('Read our FAQ', '/faq')],
      tone: 'muted',
    }),
    section('sectionCollection', {heading: 'Latest news', source: 'posts', limit: 3}),
  ], {description: 'The Digital Experience Laboratory drives new discoveries in leveraging new technologies to enhance user experience at Maastricht University.'}),

  page('about', 'About', [
    hero('About DEXLab', 'A lab to drive innovation, digital experience research and education', '9aa9b6_622b7a14b9c941688d04edf7c37f7ccc~mv2.jpg', {}, 0.12),
    section('sectionText', {
      body: pt(
        `The DEXLab is part of the [School of Business and Economics (SBE)](${SBE}) at Maastricht University. It functions as a hub for digital research and technology-enhanced learning (TEL) and education.`,
        'Our mission is to cultivate a thriving ecosystem where research on emerging technologies and innovation in education converge, providing a dynamic space for the exchange of knowledge centered on digital experiences in business settings. We explore and apply artificial intelligence alongside immersive technologies, service robots, and biometric tools to better understand and shape these experiences. As a beacon of open and accountable science, we foster collaboration and strengthen a network of initiatives that advance responsible and impactful innovation.',
      ),
    }),
    section('sectionCta', {
      icon: img('9aa9b6_ac0d3ca1ac654c2395abbcae93d66e4f~mv2.png', ''),
      heading: 'Focusing on digital experiences with AR/VR, service robots, biometrics, and AI to advance research and education.',
      intro: 'The DEXLab is a gateway to the future, offering a rich array of state-of-the-art digital technology and modern research methodologies designed to enhance consumer experiences.',
      buttons: [link('Read More', '/post/dexlab-launches-at-the-sbe'), link('Equipment', '/equipment')],
      tone: 'default',
    }),
    section('sectionCards', {
      anchor: 'services',
      heading: 'DEXLab Services',
      intro: 'DEXLab provides a dynamic environment for exploring digital technologies and their application in educational and research contexts. Our offerings include:',
      style: 'steps',
      items: [
        card('Workshops', 'We host specialized workshops focusing on the use of digital technologies in various business scenarios, helping professionals and students alike to understand and leverage these tools for their advancement.', {image: img('9aa9b6_f236133202f34746b52e808ce0fc5890~mv2.png', '')}),
        card('Training Sessions in Virtual Reality', 'Our Virtual Reality setup is ideal for immersive training sessions. Whether it is for presentation skills, practicing interviews, preparing for a thesis defense, or other educational applications, VR offers a realistic and impactful learning experience.', {image: img('9aa9b6_e3c3030265914d19addb8ab853c83eec~mv2.png', '')}),
        card('Digital Breakout Sessions', 'Custom-designed sessions are available to be incorporated into academic courses, giving students practical experience with innovative technologies and enabling them to apply classroom learning in an interactive digital setting.', {image: img('9aa9b6_02b57943e64b48a7a82e4f98ccbf003c~mv2.png', '')}),
        card('Research Support', 'Researchers can access our advanced digital tools, including the lab space and premium software, to support or become the focal point of their investigative projects.', {image: img('9aa9b6_0ba131c39f4c4b758bf7fb42ff61f219~mv2.png', '')}),
      ],
      tone: 'muted',
    }),
  ]),

  page('our-work', 'Our Work', [
    hero('DEXLab Our Work', 'At DEXLab we work with curious minds to turn ideas into real impact. By exploring, executing, educating, and engaging, we use AI, immersive technology, service robots, and biometrics to help students, researchers, and industry partners shape better learning, services, and society.'),
    section('sectionCards', {
      heading: 'Our Core Activities',
      style: 'steps',
      items: [
        card('Explore', 'We investigate how emerging technologies shape digital experiences in business and society. Our team runs innovative experiments with partners to test ideas and uncover new insights.', {image: img('9aa9b6_388bb86ec358448ca1f049429f7c5938~mv2.png', '')}),
        card('Execute', 'We transform prototypes into practical solutions that create value in education, healthcare, hospitality, retail, and policy. Our work bridges research with real-world implementation to drive meaningful change.', {image: img('/icons/execute.svg', '')}),
        card('Educate', 'We design and deliver workshops, courses, and professional programs that give students and executives hands-on experience with advanced digital technologies. Learning is active, applied, and connected to real innovation.', {image: img('9aa9b6_0de0df38dd50475695790594041076e4~mv2.png', '')}),
        card('Engage', 'We share our knowledge through events, blog posts, and policy briefs that open dialogue about responsible technology and its impact. Our goal is to connect researchers, industry, and the public in shaping the digital future.', {image: img('/icons/engage.svg', '')}),
      ],
    }),
  ]),

  page('education', 'Educate & Inspire', [
    hero('DEXLab Educate and Inspire', 'At Maastricht University and at the School of Business and Economics, our resources empower researchers to collect firsthand data and engage in innovative studies, establishing DEXLab as a central hub for digital research and hands-on learning. Our unwavering commitment ensures that SBE remains a pioneer in modern education and research, drawing the brightest minds from academia and industry alike.', '9aa9b6_5d38533fe2494a5b8b69e4036016aea5~mv2.jpeg'),
    section('sectionText', {
      body: pt(
        'DEXLab gives students and educators access to state-of-the-art equipment and experimental learning spaces. Immersive classrooms, VR training sessions, and digital breakout activities bring theory to life, while AI-driven insights and biometric tools deepen understanding of human behavior and decision-making.',
        'Our approach encourages problem-based learning (PBL) and interdisciplinary collaboration, helping students gain practical skills while exploring the impact of emerging technology on business and society.',
        'By joining DEXLab workshops, training sessions, and thesis internships, students strengthen their digital expertise, connect with researchers and industry partners, and contribute to real-world innovation projects in technology management and digital transformation.',
      ),
      image: img('9aa9b6_95d924e3167743a680f07a782b70270e~mv2.png', 'DEXLab activities: workshops, VR training, digital breakouts'),
      imagePosition: 'right',
      tone: 'muted',
    }),
    section('sectionText', {
      heading: 'Improving Teaching and Learning at Maastricht University',
      body: pt(
        '- Maastricht University students boost learning by integrating advanced digital technologies into their academic courses.',
        '- DEXLab offers diverse thesis internship opportunities, aligning student research with lab resources.',
        '- Students can engage in innovative projects in technology management and digital innovation at DEXLab.',
      ),
    }),
    section('sectionText', {
      heading: 'How can VR shape the future of education. Conversation with Roberta Di Palma',
      video: 'https://www.youtube.com/watch?v=kjDb5VkKf_k',
      imagePosition: 'right',
    }),
    contactCta('Are you a student at Maastricht University interested in how this technology can aid your academic journey?', 'Student enquiry'),
    section('sectionCollection', {source: 'posts', limit: 3, category: ref('category-digital-education')}),
  ]),

  page('research', 'Explore & Research', [
    hero('DEXLab Explore and Research', `The DEXLab, part of Maastricht University's [School of Business and Economics (SBE)](${SBE}), leads the way in exploring digital experiences. The DEXLab uses modern mobile and wearable devices that are easy to use without needing a lot of technical help. These devices cover a wide range of digital tools, including Virtual Reality (VR), Augmented Reality (AR), Brain-Computer-Interfaces, Neuroscientific tools, artificial intelligence, and service robots.`.replace(/\[(.+?)\]\(.+?\)/, '$1'), '9aa9b6_d1dc7690d4d74527a140f57c6cdfb937~mv2.jpeg'),
    section('sectionStats', {caption: 'Years 2022 - 2025', items: [kv('38', 'Research studies'), kv('6100', 'Participants'), kv('114', 'Days of research')], tone: 'muted'}),
    section('sectionText', {
      heading: 'Advancing Research and Education',
      body: pt(
        '- DEXLab at Maastricht University is crucial for pioneering studies and digital research, offering tools for firsthand data collection.',
        '- DEXLab serves as a collaborative hub, uniting researchers, educators, students, and external partners for innovative learning and research.',
        "- SBE's commitment to DEXLab positions it as a leader in modern education and research, attracting top academic and industry talents.",
      ),
    }),
    section('sectionCards', {
      heading: 'DEXLab Research Areas',
      style: 'rows',
      items: [
        card('Augmented ReseARch Group', 'A global research group, with experts from the Netherlands, Australia, and the UK, which explores the impact of AR/VR technologies on consumer decision-making in B2C and B2B contexts including marketing, retail, and logistics.', {image: img('9aa9b6_d210e443a19b4eb58a8596ba762ffc21~mv2.png', 'Researcher wearing AR glasses'), link: link('Read More', 'https://www.augmented-research.com/')}),
        card('Maastricht Center for Robots (MCR)', 'The Maastricht Center for Robots explores service and social robot advancements, collaborating with international academic and industry partners to promote adoption and assess impacts on diverse stakeholders.', {image: img('9aa9b6_59e7ffe65bd846b3be46e289480fdc12~mv2.png', 'Service robot Pepper'), link: link('Read More', 'https://www.maastrichtuniversity.nl/research/maastricht-center-robots')}),
        card('Neuro-DM Initiative', 'The Neuro-DM Initiative, spearheaded by the Decision Sciences study group at SBE, merges marketing, psychology, and neuroscience to analyze consumer decision-making and reactions to advertising.', {image: img('9aa9b6_1bf5f7cdbb3345ada3d0ba8fabb956c1~mv2.png', 'Neuromarketing'), link: link('Read More', 'https://www.linkedin.com/company/neurodm-research-initiative/about/')}),
      ],
    }),
    section('sectionText', {
      heading: 'How Augmented Reality Research can increase sales. Conversation with Jonas Heller',
      video: 'https://www.youtube.com/watch?v=s9y_CLuMXlA',
      imagePosition: 'right',
    }),
    section('sectionCta', {buttons: [link('View Publications', '/publications')], tone: 'default'}),
    section('sectionCollection', {source: 'posts', limit: 3, category: ref('category-research')}),
  ]),

  page('executive-education', 'Build & Implement', [
    hero('DEXLab Build and Implement', 'DEXLab provide workshops designed to revolutionise a variety of industries, and expertly conducted by our team to increase productivity and encourage teamwork in a variety of workfields. Our immersive, interactive workshops that focus on our core activities can transform business operations and employee collaboration.', '9aa9b6_08b2e94a72ae411cb4a1eddff6a3d2fa~mv2.jpeg'),
    section('sectionCards', {
      heading: 'Emerging technology is transforming the way businesses operate across various sectors:',
      style: 'tiles',
      columns: 6,
      items: [
        ['Marketing', '9aa9b6_bf162281a981493481aa7e4df1377d4e~mv2.png'],
        ['Healthcare', '9aa9b6_dc7facd068f7418db4fd6da54c7db55f~mv2.png'],
        ['Education', '9aa9b6_4c6f2371090445a1a3c22a5c9bb84e38~mv2.png'],
        ['Agriculture', '9aa9b6_13d0ac3ab50e4d6f95c4559bc3a5e2e7~mv2.png'],
        ['Design', '9aa9b6_3053e900716840f89926434b7598d454~mv2.png'],
        ['Real Estate', '9aa9b6_426bd4dc1eaf4b4babfc15ee85b1da1b~mv2.png'],
        ['Art & Entertainment', '9aa9b6_0bf29fcceaef4ae2ba907e818194a37c~mv2.png'],
        ['Tourism', '9aa9b6_4bdfeb730d34429d8a5830a002fcb483~mv2.png'],
        ['Retail', '9aa9b6_eb894764bea94a3cbf71e864717ac4b1~mv2.png'],
        ['Food Service', '9aa9b6_66f5f79537e44f25bb5630bbf623e67b~mv2.png'],
        ['Manufacturing', '9aa9b6_04a4d7570f0b49b596a3da79c15e72bc~mv2.png'],
        ['Insurance', '9aa9b6_a663a45ccb9940ff93e46f44dd4f5832~mv2.png'],
      ].map(([t, i]) => card(t, undefined, {image: img(i, '')})),
    }),
    section('sectionText', {
      body: pt(
        'At DEXLab, we are deeply influenced by the "Problem Based Learning" (PBL) philosophy when engaging in executive education. This approach, coupled with our extensive network of academic experts, seasoned business professionals, and bright students, enables us to craft dynamic, intimate learning environments.',
        'These platforms not only offer fresh insights but also yield tangible outcomes for modern-day challenges. A standout feature of our workshops and master classes is the involvement of worldwide leading scholars in the realm of emerging technologies.',
      ),
      image: img('9aa9b6_e4b3335b9117464db6fe1c72c47bdc9b~mv2.jpeg', 'Executive education session'),
      imagePosition: 'right',
    }),
    section('sectionCards', {
      heading: 'Shaping Future Leaders and Innovators',
      style: 'rows',
      items: [
        card('Comprehensive Expertise and Leadership Development', 'DEXLab merges expertise in current and emerging tech with leadership training for the digital age. Scholars provide insights on trends, equipping professionals with tools for effective leadership in dynamic digital environments.', {image: img('9aa9b6_3475fa55b06441c796cb9906328b8991~mv2.jpeg', '')}),
        card('Integration of Academic Rigor and Industry Relevance', 'Rooted in academic research and enriched by global industry ties, DEXLab offers a practical and theoretical approach to foster innovative thinking and competitive industry performance.', {image: img('9aa9b6_22711be7f83f4a0cbfc29d677d6987d8~mv2.jpeg', '')}),
        card('Customized Educational and Professional Development', 'Offering a range of educational programs like MBAs, executive masters, and management courses, DEXLab also creates tailored programs for teams and organizations worldwide, promoting innovation and a forward-thinking mindset.', {image: img('9aa9b6_57022ba597da41c0a199695fea763230~mv2.jpeg', '')}),
      ],
    }),
    contactCta('Are you a professional looking to utilize advanced technology in a tailor-made workshop for your business or company?', 'Executive education'),
  ]),

  page('workshops', 'Workshops', [
    hero('DEXLab Workshops', 'We offer a wide range of different events designed to help you understand and leverage digital technologies. We currently offer the options below.', '9aa9b6_3de7fe192df14acd80e9bef273f029aa~mv2.jpg'),
    section('sectionCollection', {source: 'workshops'}),
    section('sectionQuotes', {
      items: [{_type: 'quote', _key: key(), quote: 'We thoroughly enjoyed the workshop on generative AI. It was incredibly engaging and insightful. The practical approach, combined with the background information and tailored cases, made the experience both enjoyable and highly educational. Highly recommended!', source: 'Centraal Bureau voor de Statistiek (CBS)'}],
    }),
    section('sectionText', {
      heading: 'Experience the newest technologies in our workshops',
      body: pt(
        'What makes our workshops a truly unique and amazing experience for you and your team is the access to a wide range of technologies made available to you during the workshops!',
        'We own over 35 VR and AR headsets, including the Meta Quest 3, enabling fully immersive learning and simulation. Through our partnership with the Maastricht Center for Robots, we bring service robots like Temi into real-world business scenarios. And with our AI capabilities, from generative design tools to data-driven analytics and intelligent assistants, we connect and enhance these experiences, helping you build, test, and refine innovative solutions in a single, seamless environment.',
      ),
      image: img('9aa9b6_0076d657979d4142b8cbc1eeeccb6ddf~mv2.jpg', 'Workshop participant with a service robot'),
    }),
    section('sectionGallery', {images: [arrImg('9aa9b6_086d3e6d6f7947c0bec07e2c8437c2ea~mv2.jpg', 'A DEXLab workshop')]}),
  ]),

  page('equipment', 'Equipment', [
    hero('DEXLab Equipment', 'The DEXLab offers an extensive range of advanced digital technologies focused on consumer experiences, along with contemporary research methodologies. Our team is skilled in various data collection techniques, including controlled lab experiments, quasi-experiments, online and in-lab surveys, and field studies.', '9aa9b6_8320b7be60ca4018bf0ca8530c99ddc2~mv2.jpeg'),
    section('sectionCards', {
      style: 'photo',
      columns: 4,
      items: [
        card('Immersive Technology', 'A variety of immersive technologies, including VR Goggles for complete virtual experiences and AR Goggles that enhance reality, facilitating innovative learning and research in digital environments.', {image: img('9aa9b6_2941cf610dcb4166b0f322011e1f3f31~mv2.jpeg', 'Student using a VR headset')}),
        card('Robotic Technology', 'We work with service robots, AI-powered machines, capable of autonomously or semi-autonomously performing tasks, providing assistance in diverse fields such as healthcare, hospitality, and domestic environments.', {image: img('9aa9b6_0678d4f99c1c41e399c594fcec842d77~mv2.jpeg', 'Service robot')}),
        card('Mobile Technology', 'We offer personal computing devices like iPads for portable, versatile tasks and laptops for more powerful, diverse applications, catering to a wide range of educational and research needs.', {image: img('9aa9b6_cac081b997ec4b338631034483c0f11c~mv2.jpeg', 'Laptops and tablets')}),
        card('Biometric Technology', 'We offer advanced biometric technology, including eye-tracking and EEG, for measuring and analyzing biological data, crucial for understanding and interpreting human behavior and responses.', {image: img('9aa9b6_afe8b1c2643d4410a76c7150610d79a3~mv2.png', 'Biometric sensors')}),
      ],
    }),
    section('sectionText', {
      heading: "Working with DEXLab's Equipment",
      body: pt(
        'Staff members and students at Maastricht University can book equipment from the DEXLab for their needs, primarily for use in experiments or digital breakout sessions.',
        `To book equipment, visit the [Resource Booker](${BOOKER}) platform. This platform allows you to check equipment availability and make reservations.`,
        "- **In-Lab Use:** The equipment is available for use within the DEXLab, subject to availability. Ensure you follow the lab's guidelines while using the equipment.",
        "- **Special Permission for Outside Use:** For field studies or usage outside the DEXLab, fill out an equipment lending form. This is necessary for proper management and tracking of the lab's resources.",
        '- **Responsibility and Care:** Users are responsible for the care of the equipment during their booking period. Any damages or issues must be reported to the lab manager immediately.',
      ),
      tone: 'muted',
    }),
    section('sectionCollection', {anchor: 'inventory', source: 'equipment'}),
    contactCta('Are you a researcher interested in leveraging state-of-the-art technology for your next project?', 'Equipment for research'),
  ]),

  page('media', 'Media', [
    hero('DEXLab Media'),
    section('sectionVideos', {
      items: [
        {_type: 'video', _key: key(), title: 'Technology-enhanced PBL at Maastricht University | Virtual Reality', url: 'https://www.youtube.com/watch?v=ObP_syT_xpY'},
        {_type: 'video', _key: key(), title: 'Immersive Technologies & AI | Jonas Heller | SBE Podcast #17', url: 'https://www.youtube.com/watch?v=s9y_CLuMXlA'},
        {_type: 'video', _key: key(), title: 'How to market products in 2023 and beyond? | Dr. Tim Hilken | SBE Podcast #002', url: 'https://www.youtube.com/watch?v=UtbvzstA910'},
        {_type: 'video', _key: key(), title: 'How can VR shape the future of education? | Roberta Di Palma | SBE Podcast #011', url: 'https://www.youtube.com/watch?v=kjDb5VkKf_k'},
      ],
    }),
  ]),

  page('faq', 'FAQ', [
    hero('DEXFAQ'),
    section('sectionCollection', {source: 'faq'}),
  ]),

  page('meet-the-team', 'Meet the Team', [
    hero('Meet the DEXLab Team', 'Get to know the brilliant minds behind DEXLab. Each member brings unique expertise and passion to our research center.'),
    section('sectionCollection', {source: 'team', groups: ['core', 'intern', 'associate', 'alumni']}),
  ]),

  page('publications', 'Publications', [
    hero('DEXLab Publications', undefined, '11062b_249d2c048677471d814256f756daf17e~mv2_d_8192_5462_s_4_2.jpg'),
    section('sectionCollection', {source: 'publications'}),
    section('sectionCta', {buttons: [link('View Research', '/research')], tone: 'default'}),
  ]),

  page('visit-us', 'Visit Us', [
    // The building photo is only 800px wide: shown beside the text rather than as a full-width banner
    hero('Visit the DEXLab', 'The DEXLab is located in the beautiful Tapijnkazerne 11 building.', '9aa9b6_abde939f4755455ba16b3f6e11f71954~mv2.jpeg', {layout: 'split'}),
    section('sectionLocation', {
      intro: 'The DEXLab is in room I1.017 of Tapijnkazerne 11. The video shows the route inside the building.',
      video: file('https://video.wixstatic.com/video/9aa9b6_d4db8fb24874439297eb0f82a8653f4a/720p/mp4/file.mp4'),
      directions: pt(
        '### Reaching the DEXLab by car',
        '1. Exit Prins Bisschopsingel into Tapijnkazerne campus (red arrow).',
        '2. Pass the boom barrier to the parking lot on the left-hand side of the gate (red parking sign).',
        '3. Walk to the Tapijn 11 building (orange arrow).',
        '4. Walk down the stairs to level -1 of the building to the main entrance (blue arrow).',
        '5. Follow the video above to find the lab within the building.',
      ),
      directionsImage: img('9aa9b6_b322936333ac4af4b81bed32b23bf3de~mv2.png', 'Campus map of the Tapijnkazerne with the route to the DEXLab'),
      mapQuery: 'Tapijnkazerne 11, 6211 ME Maastricht',
    }),
    section('sectionCta', {buttons: [link('Contact Us', '/contact')], tone: 'default'}),
  ]),

  page('contact', 'Contact', [
    hero('Contact DEXLab', 'Researchers, companies, and curious minds: DEXLab wants to connect with you. Have questions or are you interested in collaborating? You want to explore our equipment for your thesis or research? Reach out!', 'ec01129eebde4653a19735c451d56dfb.jpg'),
    section('sectionContact', {intro: 'Contact us for booking the lab or questions by filling this contact form:', showDepartment: true}),
  ]),
]

// Draft privacy statement: to be checked by the UM privacy team before launch.
pages.push(
  page('privacy', 'Privacy statement', [
    hero('Privacy statement', 'How the DEXLab website handles your personal data.'),
    section('sectionText', {
      body: pt(
        'The DEXLab is part of the School of Business and Economics of Maastricht University. Maastricht University is the controller for personal data collected through this website.',
        '## What we collect and why',
        '- **Contact form:** your name, email address, and optionally your phone number, position, department and message. We use these only to answer your question or request, for example a lab booking or a workshop enquiry.',
        '- **Mailing list:** your email address, used only to send you DEXLab news. You can unsubscribe at any time via the link in every email or by emailing us.',
        'We process this data based on your consent, which you give by ticking the box on the form. You can withdraw it at any time.',
        '## Who processes your data',
        'Form submissions are stored by our hosting provider Netlify, which acts as a processor on our behalf. We do not sell or share your data with anyone else.',
        '## How long we keep it',
        'Contact messages are deleted once your request has been handled, and at the latest after one year. Mailing list addresses are kept until you unsubscribe.',
        '## Cookies and tracking',
        'This website does not use tracking or advertising cookies. Videos are embedded through YouTube in privacy-enhanced mode (youtube-nocookie.com), which only loads YouTube content when you play a video. Maps are provided by OpenStreetMap.',
        '## Your rights',
        `You have the right to access, correct or delete your personal data, and to object to its processing. Email us at [${EMAIL}](mailto:${EMAIL}). For more information, or to file a complaint, see the privacy information of [Maastricht University](https://www.maastrichtuniversity.nl) or contact the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).`,
      ),
    }),
  ]),
)

// ---------------------------------------------------------------- publications
// Parsed from the old publications page; see build-seed.mjs.
export const publicationsSource = 'migration/wix-export/publications.txt'

// Map of Wix blog author names to team members.
// Posts written by a team member but published under a generic Wix account.
export const postAuthors = {
  'meet-our-new-dexlab-manager-nea': 'person-nea-saarreharju',
}

export const authorMap = {
  'Roberta di Palma': 'person-roberta-di-palma',
  'Jonas Heller': 'person-jonas-heller',
}
export {arrRef}
