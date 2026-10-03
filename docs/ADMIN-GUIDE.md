# DEXLab website: guide for admins

You edit the website at **https://www.sbe-dexlab.com/admin**. Log in with the account you were invited with (Google, GitHub, or email and password).

Changes are saved as drafts automatically. Nothing is public until you press **Publish**. About a minute after publishing, the change is live.

## The menu on the left

| Item | What it is |
|---|---|
| **Home page** | The front page |
| **Pages** | About, Equipment, FAQ, Contact, Visit us, Research, and so on |
| **Blog posts** | News, interviews, experiments |
| **Blog categories** | The filters on the blog page |
| **Team** | Core team, interns, affiliated researchers, alumni |
| **Workshops** | Each workshop has a card on /workshops and its own page |
| **Publications** | The list on /publications, newest first |
| **Equipment** | The inventory on /equipment |
| **FAQ** | The questions on /faq |
| **Site settings** | Menu, footer, email address, social media, announcement bar, newsletter text |

## Common tasks

**Write a blog post.** Blog posts → **+** (top right). Fill in the title, click *Generate* next to the slug, add a cover image, write the post, pick a category under *Details*, then Publish. It appears on /blog and in "Latest news" on the home page automatically.

**A new intern starts.** Team → Interns → **+**. Add name, role ("DEXLab Intern"), a portrait photo (3:4, upright) and LinkedIn. Use *Order* to set the position (lower numbers first).

**An intern leaves.** Open the person and change *Group* to *Alumni*. They disappear from the team page but stay in the system (and remain linked as the author of their blog posts).

**Add a publication.** Publications → **+**. Fill in authors exactly as in the citation, year, title, journal/venue, and the DOI link. Lab members' names are shown in bold automatically.

**Update the equipment list.** Equipment → open an item → change the quantity → Publish.

**Show an announcement on every page** (e.g. an event). Site settings → General → Announcement bar → switch on, write the text, optionally add a link.

**Change the menu.** Site settings → Menu. Drag items to reorder; add submenu items under *Submenu*.

## Editing pages

Every page is a stack of **sections**. Open a page, then under *Page sections*:

- click a section to edit it,
- drag the handle to reorder sections,
- use **Add item** to insert a new section,
- use the **⋯** menu to duplicate or remove a section.

Available sections:

| Section | Use it for |
|---|---|
| Hero / page header | The big title at the top of a page, with optional photo and buttons |
| Text (with optional image) | Paragraphs, lists and links, with a photo or YouTube video on the side |
| Cards / features grid | Two to four cards with icon or photo, title, text and link |
| Key figures | Big numbers, e.g. "38 research studies" |
| Tag list | A row of labels, e.g. sectors |
| Testimonials | Quotes from participants |
| Photo strip | One wide photo, or three photos side by side |
| Videos | YouTube videos |
| Call to action | A short line with buttons on a coloured background |
| List from the database | Automatically shows blog posts, team, workshops, publications, equipment or FAQ |
| Contact form | The contact form |
| Location & directions | Map, route video and directions |

**Tip:** writing "DEXLab" in any heading automatically shows it in the brand colours.

## Images

- Upload photos at least 1600 px wide for page headers, 1200 px for everything else. The website resizes them.
- After uploading, click the crop icon to set the **hotspot** (the part of the image that should always stay visible, usually faces).
- Always fill in *Alternative text*: a short description for blind visitors and Google.

## Adding a new page

Pages → **+** → title and slug (the slug becomes the web address: `summer-school` → sbe-dexlab.com/summer-school). Add sections, publish, then add it to the menu in Site settings → Menu.

## Undo a mistake

Every document has a full history. Click the clock icon (top right of the document) to see earlier versions and restore one.

## Forms and the mailing list

Contact form messages are emailed to sbe-dexlab@maastrichtuniversity.nl. Newsletter sign-ups are collected in Netlify (Forms → newsletter) and can be downloaded as CSV. Ask a technical admin for access.

## Need something the editor cannot do?

New section types, layout changes or features are code changes. Open a session with Claude Code on this repository (see CLAUDE.md) or ask a technical admin.
