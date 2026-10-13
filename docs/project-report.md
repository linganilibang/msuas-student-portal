# DSI236 Practical Assignment Report
## MSUAS Student Services Information Portal

**Project type:** Responsive and interactive multimedia web application prototype  
**Institution:** Manicaland State University of Applied Sciences (MSUAS)  
**Module:** DSI236  
**Team:** Group of five (insert member names and student numbers before submission)  
**Date:** October 2026

## 1. Case Study Analysis
The case study identifies a student-information problem: students may need to check different channels—noticeboards, social platforms, departmental offices and static pages—to find information about learning, health, finance, accommodation, student life and university administration. Information spread across multiple places increases the effort required to find the right office and may cause students to rely on outdated posts.

The prototype consolidates a set of commonly needed service summaries in one responsive interface and points to official MSUAS pages for confirmation. It is an information-finding layer, not a replacement for university systems.

## 2. Problem Identification
**Problem statement:** Students need a simple, mobile-friendly way to discover student services and understand basic next steps without navigating many disconnected sources.

**Target users:** Current students, prospective students, new students, student representatives and visitors who need public service information. The main design priority is a student using a phone or laptop with varying levels of digital confidence.

## 3. Purpose and Objectives
**Purpose:** Provide a single, usable portal that helps students locate service information and official next steps.

**Objectives:**
1. Present service summaries for health, library/research, bursar/fees, admissions, e-learning/student portals, student affairs and counselling guidance.
2. Provide live in-page keyword search and category filtering.
3. Make important service details expandable so the interface remains scannable.
4. Provide quick navigation to service cards and an enquiry form that prepares an email.
5. Demonstrate semantic HTML5, CSS Grid/Flexbox, responsive breakpoints, JavaScript DOM events, form validation, multimedia and p5.js.
6. Improve accessibility through labels, keyboard focus indicators, a skip link, status announcements and reduced-motion support.

## 4. Planning and Main Features
- Responsive header and navigation.
- Hero panel with custom illustrative campus banner.
- Quick-access cards.
- Seven service cards containing summaries and selected details.
- Search input, category filter and no-results message.
- Expand/collapse controls for details.
- p5.js interactive network diagram; node descriptions are announced in a status area.
- Enquiry form with required fields, email validation and a `mailto:` draft.
- Sidebar directory search and official contact information.
- Official-source links for verifying information.

### Scope and limitations
The prototype does not authenticate students, access private student records, send email from a server, book accommodation, process payments, or provide a real-time API feed. Information is manually summarised from public official pages and may need updating. Residence allocation and separate counselling-office contact details were not independently verified; the interface says so rather than inventing details.

## 5. Technologies Used
- **HTML5:** semantic structure, navigation, forms, buttons, links, accessible labels.
- **CSS3:** custom properties, Grid, Flexbox, media queries, transitions, focus styling and reduced-motion preference.
- **JavaScript:** arrays, strings, functions, event listeners, filtering, DOM updates, validation and email draft generation.
- **p5.js:** interactive, responsive service-network visualisation.
- **Multimedia:** original generated campus banner; official web links. The prototype uses no audio or video because neither is needed for the selected student-information task.
- **Documentation assets:** sitemap, user flow, wireframe and screenshot previews.

## 6. Interface Design and Aesthetics
The design uses deep teal/navy for trust and contrast, muted teal for supportive actions, warm gold for primary calls to action, and off-white backgrounds to separate content. Rounded panels, consistent spacing, concise headings and service-specific tags establish visual hierarchy. The main content and directory form a two-column layout on wider screens; on tablets and phones the layout stacks and navigation becomes collapsible.

## 7. HTML5 Development
The application uses `header`, `nav`, `main`, `section`, `article`, `aside`, `form` and `footer` landmarks. Heading levels are organised hierarchically. Inputs have explicit labels; links that open a new tab use `rel="noopener noreferrer"`. A skip link supports keyboard navigation.

## 8. CSS3 and Responsive Design
CSS custom properties define the colour system and spacing-related styles. CSS Grid is used for the hero, service cards and form; Flexbox is used for navigation and action groups. Media queries adjust the interface around 1100px, 850px and 560px. Hover transitions are brief and `prefers-reduced-motion` is respected. The banner image uses `cover` to avoid distortion.

## 9. JavaScript Interactivity
- `filterServices()` matches user text against service content and keywords, and applies category filtering.
- Detail buttons toggle `hidden` and update `aria-expanded`.
- Directory buttons scroll to the matching card.
- Sidebar search filters directory entries.
- Mobile menu toggles its expanded state.
- The enquiry form checks required fields, name length, message length and email format, then constructs an encoded `mailto:` draft. No backend transmission occurs.
- The p5.js sketch draws a network and responds to mouse/touch interaction.

## 10. Multimedia and p5.js Integration
A custom illustrative campus banner makes the landing section more engaging. The p5.js canvas presents a service relationship diagram with selectable nodes for Library, e-Learning, Health, Student Life, Admissions and Fees. The visual is labelled as an illustrative network rather than a geographic map. The p5.js library is loaded from a CDN, so an internet connection is required for the sketch. The project could be enhanced with compressed WebP images, captions/transcripts for any future video, and an offline local copy of p5.js.

## 11. Official Information Sources
The service summaries were compiled from public MSUAS pages:
- Health Services: https://msuas.ac.zw/health-services/
- Official MSUAS website: https://web.msuas.ac.zw/
- Admissions: https://web.msuas.ac.zw/admissions/
- Bursar's Department: https://web.msuas.ac.zw/bursars-department/
- Fees: https://web.msuas.ac.zw/fees/
- Student-affairs documents/downloads: https://web.msuas.ac.zw/downloads/
- e-Learning / Student Services: https://elearning.msuas.ac.zw/
- Library services: https://library.msuas.ac.zw/our-services/
- Library borrowing: https://library.msuas.ac.zw/services/borrow-reserve-renew/
- Library spaces: https://library.msuas.ac.zw/spaces-rooms/

**Currency and verification:** Pages may change after the prototype was developed. The health clinic hours and borrowing terms are displayed as information published on official pages and should be confirmed before use. Fees and payment channels must always be checked against the current official fee notice. The application avoids storing bank account numbers or passwords.

## 12. Testing Plan and Results
The following is a manual test checklist to run in the target browser before submission. Record actual outcomes and add your own browser/device details; do not claim a test was performed unless your group has performed it.

| Test | Steps | Expected result | Result to record |
|---|---|---|---|
| Initial load | Open `index.html` / local server | Page, styles and cards appear | Pending group verification |
| Search | Search “library” then “clinic” | Matching service cards remain | Pending group verification |
| Category filter | Select Academic, Wellbeing and All | Cards filter correctly | Pending group verification |
| Expand details | Activate each “View service details” button by keyboard and mouse | Details toggle and `aria-expanded` changes | Pending group verification |
| Empty search | Enter an unmatched phrase | Helpful no-results message appears | Pending group verification |
| Sidebar search | Search for “fees” | Directory list narrows | Pending group verification |
| Contact validation | Submit empty form, then invalid email, then valid data | Browser/form validation blocks invalid input; valid data opens email draft | Pending group verification |
| Responsive layout | Test widths around 375px, 768px and 1366px | No horizontal overflow; columns stack on narrow screens | Pending group verification |
| Keyboard access | Tab through links and controls | Visible focus ring and skip link work | Pending group verification |
| p5.js visual | Click/tap each network node | Status description updates | Pending group verification |
| External links | Open official links | Correct official page opens in a new tab | Pending group verification |
| Reduced motion | Enable OS/browser reduced-motion setting | Transitions/scroll animation are reduced | Pending group verification |

### Testing discussion
Potential usability risks include long service descriptions, external links that require internet access, and the `mailto:` form depending on a configured email client. These are mitigated with short summaries, expandable details, clear prototype messaging, a responsive layout and an official contact fallback. A production version should use an approved backend, a content-update workflow, formal accessibility testing and automated browser tests.

## 13. Demonstration Script
1. Explain the case-study problem and the decision to focus on a student services portal.
2. Show the desktop homepage and explain the colour palette and hierarchy.
3. Search for “library” and filter by Academic; then show the no-results state.
4. Expand Health Services and Library details and point out official-source verification links.
5. Use the sidebar directory to jump to Admissions or Bursar.
6. Click a p5.js node and explain that the visual demonstrates service relationships, not campus geography.
7. Submit the enquiry form with invalid data, then with valid sample data, and show the prepared email draft. Do not use real sensitive information during a classroom demonstration.
8. Resize the browser to mobile width and demonstrate the menu and stacked layout.
9. Explain limitations, sources and the test plan.

## 14. Development Process
**Case Study Analysis → Problem Identification → Planning → Interface Design → HTML5 Development → CSS3/Responsive Design → JavaScript Interactivity → Multimedia/p5.js Integration → Testing → Documentation → Final Demonstration**

Each phase is represented in the project structure and report. Before submission, the group should run the test checklist, replace pending test statuses with observed results, add actual screenshots from their browser, and insert the five members' names and assigned contributions.

## 15. Suggested Group-of-Five Work Allocation
1. **Member 1 — Analysis and documentation:** case study, requirements, source verification and report.
2. **Member 2 — HTML5 structure:** semantic markup, content and navigation.
3. **Member 3 — CSS/UI:** colour system, responsive layouts and accessibility styling.
4. **Member 4 — JavaScript:** search, filters, directory, validation and interaction tests.
5. **Member 5 — Multimedia/p5.js and QA:** visualisation, assets, cross-device checks and demonstration.
All members should understand and be able to explain the full application, not only their assigned component.

## 16. Conclusion
The MSUAS Student Services Information Portal demonstrates how a single responsive interface can reduce the effort of finding student service information. It combines verified public-source summaries with search, filters, expandable details, an interactive p5.js visual and an enquiry workflow. It meets the intended learning outcomes for an academic prototype while making clear that official university pages remain the source of truth.
