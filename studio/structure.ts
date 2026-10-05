import type {StructureResolver} from 'sanity/structure'
import {CogIcon} from '@sanity/icons/Cog'
import {HomeIcon} from '@sanity/icons/Home'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {TagIcon} from '@sanity/icons/Tag'
import {UsersIcon} from '@sanity/icons/Users'
import {PresentationIcon} from '@sanity/icons/Presentation'
import {BookIcon} from '@sanity/icons/Book'
import {RocketIcon} from '@sanity/icons/Rocket'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {ProjectsIcon} from '@sanity/icons/Projects'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('DEXLab')
    .items([
      S.listItem()
        .title('Home page')
        .icon(HomeIcon)
        .child(S.document().schemaType('page').documentId('page-home').title('Home page')),
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .filter('_type == "page" && _id != "page-home" && !(_id in path("drafts.page-home"))')
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('Blog posts')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('post')
            .title('Blog posts')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
      S.listItem()
        .title('Blog categories')
        .icon(TagIcon)
        .child(S.documentTypeList('category').title('Blog categories')),
      S.divider(),
      S.listItem()
        .title('Team')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Team')
            .items([
              ...[
                ['core', 'Core team'],
                ['intern', 'Interns'],
                ['associate', 'Associates'],
                ['alumni', 'Alumni'],
              ].map(([group, title]) =>
                S.listItem()
                  .title(title)
                  .child(
                    S.documentTypeList('person')
                      .title(title)
                      .filter('_type == "person" && group == $group')
                      .params({group})
                      .defaultOrdering([{field: 'order', direction: 'asc'}])
                      .initialValueTemplates([S.initialValueTemplateItem('person-in-group', {group})]),
                  ),
              ),
              S.divider(),
              S.listItem().title('Everyone').child(S.documentTypeList('person').title('Everyone')),
            ]),
        ),
      S.listItem().title('Workshops').icon(PresentationIcon).child(
        S.documentTypeList('workshop').title('Workshops').defaultOrdering([{field: 'order', direction: 'asc'}]),
      ),
      S.listItem().title('Projects').icon(ProjectsIcon).child(
        S.documentTypeList('project').title('Projects').defaultOrdering([{field: 'order', direction: 'asc'}]),
      ),
      S.listItem().title('Publications').icon(BookIcon).child(
        S.documentTypeList('publication').title('Publications').defaultOrdering([{field: 'year', direction: 'desc'}]),
      ),
      S.listItem().title('Equipment').icon(RocketIcon).child(
        S.documentTypeList('equipment').title('Equipment').defaultOrdering([{field: 'order', direction: 'asc'}]),
      ),
      S.listItem().title('FAQ').icon(HelpCircleIcon).child(
        S.documentTypeList('faq').title('FAQ').defaultOrdering([{field: 'order', direction: 'asc'}]),
      ),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site settings')),
    ])
