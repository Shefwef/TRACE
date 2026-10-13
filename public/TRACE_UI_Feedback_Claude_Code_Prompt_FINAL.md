# TRACE Website — UI Feedback Implementation Prompt for Claude Code

## ROLE

You are working inside the existing TRACE website codebase in VS Code.

Your task is to implement **ONLY the UI/design changes explicitly requested in the attached feedback document**, using the component recommendations and implementation direction below.

The feedback document is the authoritative source for what needs to change. Do not invent additional redesigns, new sections, new features, content, branding changes, or unrelated refactors.

The user will provide this prompt together with the feedback document:
**“Feedbacks for the TRACE website design.docx”**

Read and inspect the feedback document first. Then inspect the existing codebase to identify the exact components/pages/sections corresponding to the feedback.

---

# PRIMARY OBJECTIVE

Address the relevant UI feedback points from the document:

1. Remove the specified homepage segment.
2. Redesign the homepage segment that was described as needing a more creative and visually engaging presentation.
3. Improve the homepage Service section so each service contains small, useful details.
4. Revise the Project section animation while preserving the existing project content/data and overall purpose.
5. Keep the TRACE logo desk image in the homepage About Us section.
6. Make the Insights section automatically animated in a creative way, similar in spirit to the existing automatically scrolling Expert section.
7. Remove the Related Projects section from the Projects page.
8. Design the Careers page according to the feedback and prevent applications to positions whose deadlines have passed.
9. Redesign the Service Details page in a more creative way.

IMPORTANT:
These are the ONLY requested changes for this task.

Do not redesign unrelated sections.
Do not change the site's brand identity.
Do not change colors, typography, copy, images, navigation, footer, routing, database schema, APIs, or business logic unless required to implement one of the feedback items above.
Do not introduce unrelated animations merely because they look attractive.

---

# IMPLEMENTATION PHILOSOPHY

The goal is a polished, elegant, premium TRACE website.

Prefer:
- sophisticated motion
- subtle hover interactions
- smooth transitions
- structured layouts
- strong visual hierarchy
- restrained animation
- good whitespace
- accessibility
- responsive behavior

Avoid:
- excessive effects
- flashy/glowing UI everywhere
- unnecessary 3D
- particle effects unless already part of the affected section
- random gradients
- cursor trails
- excessive text scrambling
- animation overload
- changing the visual identity of TRACE

The implementation should look intentional and corporate/premium rather than like a collection of animation demos.

---

# COMPONENT DIRECTION

Use existing project dependencies/components whenever possible.

Before installing anything:
1. Inspect `package.json`.
2. Determine whether Motion/Framer Motion, GSAP, React Bits, Aceternity-style components, Tailwind, shadcn/ui, or similar libraries already exist.
3. Reuse existing infrastructure where practical.
4. Do not add a new dependency if the existing stack can implement the required result cleanly.
5. If a component is copied/adapted from an external component library, adapt its styling and behavior to the existing TRACE design system rather than blindly importing the demo's visual identity.

## REQUIRED COMPONENT SOURCE / REFERENCE WEBSITE

The preferred component reference source for this task is:

**Aceternity UI — https://ui.aceternity.com/components**

Use the following exact Aceternity UI components/patterns as the implementation references where applicable:

| Feedback / Area | Preferred component | Source / reference |
|---|---|---|
| Creative homepage section | Bento Grid | https://ui.aceternity.com/components/bento-grid |
| Creative homepage section | Layout Grid | https://ui.aceternity.com/components/layout-grid |
| Creative homepage section | Card Hover Effect | https://ui.aceternity.com/components/card-hover-effect |
| Homepage Services | Expandable Cards | https://ui.aceternity.com/components/expandable-card |
| Homepage Services | Text Reveal Card | https://ui.aceternity.com/components/text-reveal-card |
| Homepage Services | Card Hover Effect | https://ui.aceternity.com/components/card-hover-effect |
| Homepage Projects | Apple Cards Carousel | https://ui.aceternity.com/components/apple-cards-carousel |
| Homepage Projects | Images Slider | https://ui.aceternity.com/components/images-slider |
| Homepage Insights | Infinite Moving Cards | https://ui.aceternity.com/components/infinite-moving-cards |
| Homepage Insights | Marquee / continuous movement | Use the Infinite Moving Cards implementation as the primary reference; use another marquee only if the existing stack already provides one |
| Careers | Expandable Cards | https://ui.aceternity.com/components/expandable-card |
| Careers | Card Hover Effect | https://ui.aceternity.com/components/card-hover-effect |
| Service Details | Sticky Scroll Reveal | https://ui.aceternity.com/components/sticky-scroll-reveal |
| Service Details | Timeline | https://ui.aceternity.com/components/timeline |
| Service Details | Parallax Grid Scroll | https://ui.aceternity.com/components/parallax-scroll |

These links are **component references**, not permission to redesign the site around Aceternity's branding. Preserve TRACE's existing colors, typography, spacing language, borders, imagery, content, and overall visual identity.

## ADDITIONAL COMPONENT SOURCES — USE SELECTIVELY

The user has previously taken components from **React Bits** and **Motion UI**, so these are explicitly approved reference sources for this task in addition to Aceternity UI.

### 1. React Bits — primary creative/motion reference
Official source: https://reactbits.dev/

React Bits currently provides a broad catalogue of React/Tailwind components covering cards, carousels, text animation, scroll effects, flowing menus, spotlight cards, stacks, and other interactive patterns. citeturn0search2turn0search9

Use these React Bits patterns when they produce a better fit than the Aceternity equivalent:

| Feedback / Area | React Bits pattern to inspect first | Why it fits |
|---|---|---|
| Feedback 2 — creative homepage section | **Chroma Grid**, **Spotlight Card**, **Card Nav**, or **Flowing Menu** | Gives the section a more editorial/interactive presentation without requiring a full visual redesign |
| Feedback 3 — Homepage Services | **Flowing Menu**, **Animated Content**, **Spotlight Card**, or **Card Swap** | Lets service cards reveal useful details while keeping the default state clean |
| Feedback 4 — Homepage Projects | **Skewed Carousel**, **Elastic Slider**, **Card Swap**, **Tilted Card**, or **Scroll Stack** | Stronger project movement/presentation while preserving the existing project content |
| Feedback 6 — Homepage Insights | **Flowing Menu**, **Infinite/looping motion patterns**, **Scroll Velocity**, or a simple continuous carousel/marquee pattern | Can create the requested automatically moving editorial feed |
| Feedback 8 — Careers | **Animated List**, **Card Nav**, **Accordion-like interaction**, or **Spotlight Card** where appropriate | Makes open positions easier to scan and interact with |
| Feedback 9 — Service Details | **Scroll Stack**, **Scroll Expand**, **Animated Content**, **Fade Content**, **Scroll Velocity**, or **Tilted Card** | Particularly useful for a premium scroll-driven storytelling page |

**Important:** Do not use React Bits' more experimental backgrounds, cursor effects, particles, shaders, or 3D effects merely because they exist. The TRACE feedback calls for a polished corporate/premium result, not a showcase of effects.

### 2. Motion UI — preferred motion system/reference
Official source: https://motion.dev/ui

Motion UI provides production-oriented animated marketing sections and components, including editorial staggered heroes, parallax/scroll-driven sections, coverflow carousels, draggable card stacks, bento reveals, scroll-linked spotlights, accordions, and other interaction patterns. Its components are designed to adapt to an existing design system rather than forcing a separate visual identity. citeturn0view1

Use Motion UI when its interaction model is cleaner than an Aceternity/React Bits alternative:

| Feedback / Area | Motion UI pattern to inspect | Recommended use |
|---|---|---|
| Feedback 2 | **Bento reveal / scroll-linked spotlight / editorial stagger** | Creative homepage section with controlled motion |
| Feedback 3 | **Accordion / smooth height-morph interaction** | Expand service details elegantly |
| Feedback 4 | **Coverflow / Carousel** | Premium project browsing with a clear active item |
| Feedback 6 | **Ticker / infinitely scrolling carousel** | Automatic Insights movement |
| Feedback 8 | **Accordion / animated list** | Careers listings and state changes |
| Feedback 9 | **Scroll-driven / parallax / editorial reveal sections** | Service Details storytelling |

Motion's carousel is also an appropriate implementation reference when accessibility and interaction quality are priorities; it supports pointer, wheel and keyboard navigation and reduced-motion behavior. citeturn0search7

Motion's text-animation guidance may be used for **small, intentional heading/label reveals only**. Do not apply scramble/typewriter effects to large amounts of body copy. citeturn0search8

### 3. Aceternity UI — structural/interaction reference
Keep the existing Aceternity mapping below as a strong reference for:
- Bento Grid
- Layout Grid
- Card Hover Effect
- Expandable Cards
- Apple Cards Carousel
- Infinite Moving Cards
- Sticky Scroll Reveal
- Timeline
- Parallax Grid Scroll

Official source: https://ui.aceternity.com/components

Aceternity is particularly useful when a section needs a polished, self-contained interaction while remaining consistent with React + Tailwind + Motion. citeturn0search4

---

## OPTIONAL ADDITIONAL SOURCES — ONLY IF THEY CLEARLY IMPROVE A FEEDBACK ITEM

These are reference libraries, **not dependencies to install wholesale**:

### Magic UI
Official source: https://magicui.design/docs/components

Useful candidates:
- **Bento Grid** → Feedback 2
- **Marquee** → Feedback 6
- **Animated List** → Feedback 6 or 8
- **Magic Card / Spotlight-style interactions** → Feedback 2/3

Magic UI has reusable animated components such as Bento Grid, Marquee, Animated List, Ticker, Text Reveal, Scroll Based Velocity, and other Motion/Tailwind patterns. citeturn1search1turn1search6turn1search4

### Hover.dev
Official source: https://www.hover.dev/

Useful candidates:
- Carousels → Feedback 4
- Features/cards → Feedback 2/3
- Text/hover interactions → Feedback 2/3
- Menus/navigation patterns only if directly relevant to the affected section

Hover.dev focuses on interactive React/Tailwind components using Motion and other established animation approaches. citeturn0search1

### 21st.dev
Official source: https://21st.dev/

Use only as a **discovery/reference source** when the above libraries do not provide a suitable pattern. It contains a large collection of React/Tailwind components, including animated cards, carousels, scroll areas, timelines, marquee sections, and motion components. citeturn1search2turn1search10

Good candidates to inspect:
- **Animated Cards Stack** → Feedback 4
- **Scroll X Carousel** → Feedback 4/6
- **Process Timeline** → Feedback 9
- **Parallax Scroll Feature Section** → Feedback 9
- **Interactive Image Accordion** → Feedback 2/3
- **Spotlight Card** → Feedback 2/3
- **Image auto slider** → Feedback 4/6

Do not browse 21st.dev indefinitely. If a suitable pattern is already available in React Bits, Motion UI, or Aceternity, prefer the existing source instead.

---

## COMPONENT SOURCE PRIORITY

When multiple libraries provide similar components, use this priority:

1. **Existing TRACE component / existing dependency**
2. **Motion UI** — when the requirement is primarily sophisticated motion, scroll choreography, accessibility, or carousel behavior
3. **React Bits** — when the requirement is a distinctive creative visual interaction
4. **Aceternity UI** — when the requirement is a polished structural/card/scroll component
5. **Magic UI** — especially marquee, animated list, bento, or simple Motion/Tailwind effects
6. **Hover.dev / 21st.dev** — only for a specific interaction that is clearly superior and directly relevant

**Do not combine multiple libraries in the same section unless there is a clear reason.** One coherent component pattern is better than stacking unrelated effects.

The goal is to make the TRACE website look like one deliberately designed product, not like Aceternity + React Bits + Motion UI + Magic UI demos pasted together.

---

## DESIGN-MATCH RULE — VERY IMPORTANT

The live TRACE website at:

https://traceconsultingltd.vercel.app/

is the **visual reference for the existing design language**.

Before changing any affected section, inspect the live site and the corresponding source code. Pay attention to:
- existing typography
- spacing rhythm
- card radius/borders
- image treatment
- current hover behavior
- current section transitions
- existing color usage
- existing animation timing
- how the existing **Expert** section automatically scrolls
- overall density and whitespace

The feedback indicates that the existing non-affected components are already liked. Therefore:

**Do not make the new components look like foreign UI-library demos.**

Instead:
- borrow the *interaction model* from the selected source,
- adapt the component to TRACE's existing visual language,
- preserve the site's established visual rhythm,
- use existing design tokens whenever possible,
- keep motion restrained and intentional.

A useful mental model is:

> **TRACE design + proven interaction pattern = final component**

not:

> **library demo + TRACE logo = final component**

---

### Component-selection rule

For every affected section:

1. Inspect the current implementation first.
2. Identify whether the existing code already contains an equivalent/reusable component.
3. If an equivalent exists, extend/reuse it instead of importing a duplicate.
4. If no equivalent exists, use the closest component from the source table above.
5. Copy/adapt only the necessary interaction/layout pattern.
6. Remove demo-only content, colors, gradients, images, branding, and effects from the reference implementation.
7. Do not install a component library merely to obtain one simple effect that can be implemented with the existing stack.
8. If a referenced component requires a dependency that is not already present, prefer a lightweight local implementation when that avoids an unnecessary dependency.

### Preferred component patterns

## 1. Creative Homepage Section
Preferred:
- **Bento Grid**
- **Layout Grid**
- **Card Hover Effect**

Use the pattern that best matches the EXISTING section's content.

Do not force a Bento Grid if the current content is better represented by a Layout Grid.

## 2. Homepage Services
Preferred:
- **Expandable Cards**
- **Card Hover Effect**
- **Text Reveal Card**

The purpose is to expose small details for each service while keeping the homepage clean.

## 3. Projects Section
Preferred:
- **Apple Cards Carousel**
- **Images Slider**
- subtle 3D Card interaction only if appropriate

The existing project content must remain intact.

## 4. Insights
Preferred:
- **Infinite Moving Cards**
- Marquee/continuous horizontal movement

Create continuous automatic movement similar in concept to the existing Expert auto-scroll.

## 5. Careers
Preferred:
- **Expandable Cards**
- **Card Hover Effect**

The page should clearly distinguish open and closed positions.

## 6. Service Details
Preferred:
- **Sticky Scroll Reveal**
- **Timeline**
- **Parallax Grid Scroll**

Use these only where they improve the existing content's presentation.

---

# FEEDBACK-BY-FEEDBACK IMPLEMENTATION SPECIFICATION

## FEEDBACK 1 — REMOVE THE SPECIFIED HOMEPAGE SEGMENT

Find the exact homepage segment referred to by item 1 in the feedback document.

Remove that segment completely from the homepage.

Requirements:
- Remove its rendering from the page.
- Remove any unnecessary wrapper/layout associated only with that segment.
- Do not replace it with a new section unless another feedback item explicitly requires a replacement.
- Do not remove shared components/data that are used elsewhere.
- Verify that spacing between the surrounding sections remains correct.

Do not guess which section this refers to. Determine it by inspecting the existing homepage and the feedback context.

---

## RECOMMENDED VISUAL DIRECTION BY FEEDBACK

The following recommendations are intentionally specific so Claude Code can make strong design decisions instead of choosing generic animations.

### Feedback 2 — Creative homepage segment
**First inspect:** the existing section, then compare:
1. React Bits **Chroma Grid / Spotlight Card / Flowing Menu**
2. Motion UI **Bento reveal / scroll-linked spotlight**
3. Aceternity **Bento Grid / Layout Grid**

Choose **one primary structure**.

Preferred outcome:
- a visually distinctive editorial/bento composition,
- clear primary vs secondary content,
- restrained hover/spotlight behavior,
- image/content reveals that feel purposeful,
- no generic "three cards in a row" redesign unless the existing content demands it.

### Feedback 3 — Homepage Services
**First inspect:** React Bits Flowing Menu / Spotlight Card and Motion UI Accordion, then Aceternity Expandable Cards.

Preferred outcome:
- service name remains immediately visible,
- small supporting detail is available without making the section text-heavy,
- interaction feels discoverable,
- expansion is smooth,
- mobile uses tap/click rather than hover-only behavior.

### Feedback 4 — Projects
**First inspect:** Motion UI Coverflow/Carousel and React Bits Skewed Carousel/Scroll Stack, then Aceternity Apple Cards Carousel.

Preferred outcome:
- one project is visually dominant/active,
- neighboring projects provide context,
- movement is smooth and controlled,
- image remains the visual focus,
- existing project information and links remain intact.

Do not create a generic auto-advancing carousel if it makes project exploration worse. User-controlled interaction plus subtle automatic motion is preferable where appropriate.

### Feedback 6 — Insights
**First inspect:** Motion UI ticker/carousel, React Bits continuous/looping motion, Aceternity Infinite Moving Cards, and Magic UI Marquee.

Preferred outcome:
- automatic movement begins naturally,
- movement is continuous rather than jumpy,
- cards remain readable,
- pause-on-hover is encouraged,
- touch interaction remains usable,
- reduced-motion users receive a calmer/static or user-controlled presentation.

The animation should feel related to the existing Expert auto-scroll rather than becoming a completely different visual language.

### Feedback 8 — Careers
**First inspect:** Motion UI Accordion and React Bits Animated List/Card Nav/Spotlight Card.

Preferred outcome:
- open positions are immediately scannable,
- expired positions are visually/behaviorally closed,
- an expired position must not expose an active application action,
- deadline information is easy to understand,
- opening a job reveals details without requiring a separate redesign of the entire careers architecture.

### Feedback 9 — Service Details
**First inspect:** Motion UI scroll-driven sections, React Bits Scroll Stack/Scroll Expand, and Aceternity Sticky Scroll Reveal/Timeline.

Preferred outcome:
- service information unfolds progressively as the user scrolls,
- important information receives visual emphasis,
- transitions have a clear beginning/middle/end,
- the page feels like a premium service story rather than a static document,
- all existing service information remains accessible.

Avoid turning every paragraph into an animated block. Animation should establish hierarchy.

---

# FEEDBACK 2 — MAKE THE SPECIFIED HOMEPAGE SEGMENT MORE CREATIVE AND VISUALLY ENGAGING

The feedback asks for:
- a more creative presentation
- a more visually engaging presentation
- an alternative layout/structure
- improved visual appeal
- improved readability
- improved user engagement

Do NOT simply add an entrance animation to the existing layout.

Instead, redesign the structure of the affected section while preserving its existing purpose/content.

Preferred direction:
- Bento Grid OR Layout Grid
- subtle Card Hover Effect where appropriate
- clear hierarchy
- asymmetric or editorial layout if it fits the current content
- responsive layout

Interaction behavior:
- subtle hover movement
- controlled image/content reveal
- smooth transitions
- no excessive effects

Desktop:
- use the available width intelligently
- create visual hierarchy between primary and secondary items

Tablet/mobile:
- collapse naturally into a single-column or appropriately structured layout
- preserve readability
- avoid horizontal overflow
- avoid requiring hover to understand important content

Do not invent new business information.

---

# FEEDBACK 3 — IMPROVE THE HOMEPAGE SERVICE SECTION WITH SMALL DETAILS

The feedback explicitly asks that the homepage Service section contain small details for the respective services.

Do not turn the section into a giant text-heavy service catalogue.

Recommended structure:

Default state:
- service name
- existing service visual/icon/image if present
- very short supporting detail or teaser

Interaction:
- expandable card OR elegant reveal
- show the existing relevant service details/content
- smooth transition
- clear affordance for expansion

Preferred component:
**Expandable Cards**

Alternative:
**Text Reveal Card / Card Hover Effect**

Important:
- preserve the existing service names and content
- do not invent services
- do not invent descriptions unless there is already corresponding information in the code/content
- if service descriptions already exist elsewhere in the project, reuse them
- keep the homepage concise

Mobile:
- tapping/clicking should provide the same information
- do not rely exclusively on hover

---

# FEEDBACK 4 — REVISE THE PROJECT SECTION ANIMATION

The feedback says the Project section design is acceptable but its animation should be revised.

Therefore:

DO NOT redesign the project information architecture unnecessarily.

Keep:
- existing project data
- existing project names
- existing project images
- existing project links/actions
- overall Projects section purpose

Change primarily:
- animation
- transition behavior
- presentation movement

Preferred direction:
**Apple Cards Carousel style**

Alternative:
**Images Slider**

Optional:
subtle 3D card interaction if it improves the presentation without becoming gimmicky.

Desired behavior:
- smooth project-to-project transitions
- clear active project
- visually strong project image
- readable project information
- natural scrolling/interaction
- no abrupt movement
- no excessive parallax

If using a carousel:
- keyboard accessible
- touch/swipe friendly
- responsive
- no broken layout at mobile widths

If the existing section is scroll-driven, preserve that concept where possible and improve the animation rather than replacing the entire project architecture unnecessarily.

---

# FEEDBACK 5 — KEEP THE TRACE LOGO DESK IMAGE IN HOMEPAGE ABOUT US

This is a preservation requirement.

The homepage About Us section must retain the existing TRACE logo desk image.

Do NOT:
- replace it
- remove it
- substitute another image
- redesign this image out of the section

You may improve surrounding layout/spacing only if required by another feedback item, but the image itself must remain.

Verify after implementation that the image still renders correctly on desktop and mobile.

### REQUIRED IMAGE ASSET — `about_us_trace.jpg`

The About Us desk image is a **specific existing asset** and must be handled as an original source image, not as a redesigned/re-generated image.

- Exact filename: **`about_us_trace.jpg`**
- Locate and use the existing `about_us_trace.jpg` asset from the codebase.
- **Do not replace, regenerate, redraw, compress, recompress, optimize, convert, crop, or otherwise modify the source image file.**
- **Do not change its original pixel dimensions.**
- **Do not stretch, distort, upscale, downscale, or non-uniformly resize the image.**
- Preserve the original aspect ratio exactly.
- Do not use `object-fit: cover` or any other treatment that crops the image.
- Do not apply CSS transforms that change the image's apparent proportions.
- If responsive sizing is necessary, preserve the exact aspect ratio and do not modify the underlying asset file. Prefer the browser's native image rendering with the correct intrinsic aspect ratio rather than generating a new image variant.
- Do not introduce image optimization that rewrites/re-encodes this JPG.
- Verify in the final implementation that the rendered image corresponds to the original `about_us_trace.jpg` and that no alternate/generated copy has been substituted.

**Important distinction:** responsive layout may change the *displayed CSS size* when necessary for the container, but the source file itself must remain byte-for-byte/original-dimension intact and the image must never be stretched, cropped, or re-encoded. If the design can accommodate the image at its native dimensions, prefer doing so.

---

# FEEDBACK 6 — AUTO-ANIMATE THE INSIGHTS SECTION

The feedback asks for the Insights section to be auto-animated similarly to the Expert section's auto-scrolling behavior and encourages more creative presentation.

Implement an elegant continuously moving Insights presentation.

Preferred component:
**Infinite Moving Cards**

Alternative:
**Marquee**

Recommended behavior:
- automatic continuous horizontal movement
- slow, smooth speed
- seamless looping
- pause on hover/focus if appropriate
- card hover can slightly elevate/enlarge the active card
- users can still click/open/read an Insight
- no distracting rapid movement

The animation should feel editorial/premium.

Do not change the actual Insight content/data unless necessary for the layout.

Accessibility:
- respect `prefers-reduced-motion`
- ensure content remains readable if animation is disabled
- ensure keyboard users can access all insights
- avoid motion that makes reading difficult

Important:
Use the existing Expert section as a reference for the site's current auto-scroll behavior so the Insights animation feels like part of the same design system, while still being more creative as requested.

---

# OTHER PAGES

# FEEDBACK 7 — REMOVE RELATED PROJECTS FROM PROJECTS PAGE

On the Projects page:

Remove the Related Projects section.

Requirements:
- completely remove the section from the rendered page
- remove only code/data/imports that are exclusively needed by this section
- do not remove the main project content
- do not alter unrelated project functionality
- ensure page spacing remains clean after removal

Do not replace it with another section.

---

# FEEDBACK 8 — CAREERS PAGE

This feedback contains both UI and behavior requirements.

## A. Career page design

Redesign the Careers page using an elegant, structured job-listing presentation.

Preferred:
**Expandable Cards**

Each position should present at minimum the existing information already available in the application.

Suggested visual structure:

POSITION TITLE
Location / employment type / relevant metadata
Status

On interaction:
- job description
- responsibilities
- requirements
- deadline
- application action

Do not invent job details.

Use existing job data/content.

### Open position

Show a clear:
**Apply Now**

action when the deadline has not passed.

### Expired position

Clearly show:
**Applications Closed**

or equivalent existing terminology.

The expired position must NOT present an active application action.

## B. Deadline behavior

This is a functional requirement directly tied to the UI.

Determine the position's existing deadline field and current date.

If:

`currentDate > deadline`

then:
- disable/remove the application action
- show the closed state
- prevent direct application through the UI
- ensure a stale/expired position cannot still be submitted through the affected frontend flow

Be careful with date handling:
- inspect how dates are currently stored
- preserve the existing timezone/date semantics
- do not introduce an incorrect timezone conversion
- do not treat a deadline date as expired prematurely if the existing system semantics indicate the position remains open through that date

If the existing application submission path has a frontend/API validation layer already, preserve it and ensure the UI state matches it.

Do NOT make unrelated backend changes.

---

# FEEDBACK 9 — SERVICE DETAILS PAGE

Redesign the Service Details page in a more creative way while preserving the actual service information.

Preferred pattern:
**Sticky Scroll Reveal**

Use the service information to create a scroll-driven storytelling layout.

Potential structure:

LEFT:
- service visual / image / service identifier

RIGHT:
- service title
- short description
- service-specific details
- capabilities / features already present in the existing content

As the user scrolls:
- relevant content changes smoothly
- visual area remains anchored where appropriate
- sections reveal progressively
- transitions remain restrained

If the service already has a process/methodology, use:
**Timeline**

For image-heavy content, consider:
**Parallax Grid Scroll**

Do not add a timeline merely for decoration if the existing service content does not contain a process.

Important:
- preserve all existing service information
- do not invent claims
- do not change the business meaning of the content
- do not remove useful existing information
- do not create unnecessary sections

Mobile:
- convert the sticky layout into a natural vertical flow
- maintain the same information
- avoid awkward sticky behavior
- maintain readable spacing

---

# DESIGN CONSISTENCY

All changes should feel like one website.

Use consistent:
- border radius
- typography
- spacing
- shadows
- interaction timing
- easing
- hover behavior
- card treatment
- image treatment

Do not mix radically different visual styles between sections.

For example:
- If one section uses very subtle motion, do not introduce aggressive neon/glow animation elsewhere.
- If cards already have a particular border/radius system, reuse it.
- If the website already has a defined color palette, use it.

---

# RESPONSIVENESS

Every affected section must work at:
- desktop
- laptop
- tablet
- mobile

Specifically test:
- no horizontal overflow
- no clipped text
- no inaccessible controls
- no broken sticky positioning
- no carousel overflow
- no hover-only functionality
- appropriate card stacking
- readable typography
- appropriate image cropping

Do not redesign unrelated mobile sections.

---

# ACCESSIBILITY

For all newly introduced interactions:

- keyboard accessible
- semantic HTML where possible
- visible focus states
- buttons should be buttons
- links should be links
- expandable elements should communicate their state
- carousel controls should be accessible
- animations should respect `prefers-reduced-motion`
- essential information must remain available without animation

---

# PERFORMANCE

Do not introduce unnecessarily heavy animation.

Prefer:
- transform
- opacity
- CSS transitions
- existing animation framework
- GPU-friendly properties

Avoid animating:
- large layout properties unnecessarily
- width/height when transform can achieve the same effect
- expensive continuous effects across the whole page

Do not introduce Three.js/WebGL for these feedback items unless the existing implementation already uses it and it is clearly necessary.

The goal is elegant UI, not maximum technical complexity.

---

# CODEBASE SAFETY

Before editing:
1. Inspect the project structure.
2. Identify the exact files/components for:
   - homepage
   - services section
   - projects section
   - About Us
   - insights
   - careers
   - projects page
   - service details page
3. Inspect package.json and existing animation dependencies.
4. Inspect existing reusable UI components before creating new ones.

Do not duplicate components unnecessarily.

If a reusable component already exists, extend it rather than creating another version.

Do not modify unrelated files.

Do not change:
- database schema
- authentication
- unrelated APIs
- unrelated routes
- unrelated pages
- unrelated content
- unrelated business logic

unless strictly necessary for Feedback #8 deadline behavior.

---

# IMPLEMENTATION PROCESS

Follow this process strictly.

## STEP 1 — READ AND MAP

Read the attached feedback document.

Create an internal mapping:

Feedback 1 → exact existing homepage section
Feedback 2 → exact existing homepage section
Feedback 3 → existing homepage Services section
Feedback 4 → existing homepage Projects section
Feedback 5 → existing homepage About Us image
Feedback 6 → existing homepage Insights section
Feedback 7 → Projects page Related Projects section
Feedback 8 → Careers page
Feedback 9 → Service Details page

Then inspect the corresponding source files.

Do not start changing code before understanding the existing implementation.

## STEP 2 — CHECK EXISTING COMPONENTS

Determine:
- current animation library
- current card components
- current carousel components
- current motion utilities
- current responsive patterns
- current design tokens
- current service/project/insight data structures
- current career deadline field and application flow

Reuse existing infrastructure wherever possible.

## STEP 3 — IMPLEMENT ONLY THE FEEDBACK

Implement each feedback item independently.

Avoid combining unrelated changes into one giant refactor.

## STEP 4 — VERIFY

After implementation:
- run the project's available lint/typecheck/build/test commands
- fix errors caused by your changes
- verify imports
- verify responsive behavior
- verify affected routes
- verify animations
- verify expired career positions cannot be applied to
- verify About Us desk image remains
- verify Related Projects is removed
- verify Insights auto-scroll works
- verify Projects animation is revised
- verify Service Details presentation is redesigned

## STEP 5 — FINAL AUDIT AGAINST FEEDBACK

Before finishing, explicitly check each item:

[ ] Feedback 1 addressed
[ ] Feedback 2 addressed
[ ] Feedback 3 addressed
[ ] Feedback 4 addressed
[ ] Feedback 5 preserved
[ ] Feedback 6 addressed
[ ] Feedback 7 addressed
[ ] Feedback 8 UI addressed
[ ] Feedback 8 deadline/application behavior addressed
[ ] Feedback 9 addressed
[ ] Exact component reference/source used for each redesigned section is documented/traceable
[ ] `about_us_trace.jpg` preserved as the original source asset
[ ] `about_us_trace.jpg` intrinsic dimensions/aspect ratio verified unchanged
[ ] No image compression/re-encoding/cropping/stretching introduced
[ ] No external demo branding/content accidentally copied into TRACE
[ ] No unnecessary component/dependency added
[ ] Selected component source is documented for each affected section
[ ] New components visually match the existing TRACE website rather than the source-library demo
[ ] Live TRACE site was inspected before and after the affected-section implementation
[ ] `prefers-reduced-motion` behavior was considered for newly animated sections
[ ] Keyboard/touch interaction was verified for new interactive components

If an item cannot be implemented because the existing code/data does not support it, explain exactly why instead of inventing content or silently skipping it.

---

# IMPORTANT SCOPE RESTRICTION

DO NOT:
- redesign the entire website
- redesign the navbar
- redesign the footer
- change branding
- change the TRACE logo
- change colors globally
- change typography globally
- add unrelated sections
- add unrelated animations
- rewrite website copy
- add new services
- add new projects
- add new insights
- change database architecture
- change unrelated business logic
- refactor unrelated components
- install a large collection of animation libraries

The requested task is strictly:

**Apply the UI/design feedback from the provided feedback document and only the related functionality required by the Career deadline requirement.**

---

# REQUIRED IMPLEMENTATION TRACEABILITY

Claude Code must be able to trace every requested change back to the feedback and to a concrete implementation target.

Before coding, create an internal mapping equivalent to the following:

| Feedback | Exact target | Required action | Must preserve |
|---|---|---|---|
| 1 | Exact homepage segment identified from the feedback document | Remove only that segment | All surrounding sections and shared components |
| 2 | Exact homepage segment identified from the feedback document | Restructure using the most appropriate referenced component pattern | Existing purpose/content/business meaning |
| 3 | Homepage Services | Add concise details through an expandable/reveal interaction | Existing service names/content |
| 4 | Homepage Projects | Revise animation/presentation | Existing project data, images, names, links |
| 5 | Homepage About Us | Keep `about_us_trace.jpg` exactly as the existing source asset | Original file, dimensions, aspect ratio, quality |
| 6 | Homepage Insights | Add continuous automatic movement inspired by Expert | Existing insight data/content |
| 7 | Projects page Related Projects | Remove section | Main project content/functionality |
| 8 | Careers | Redesign job presentation + enforce expired/open state | Existing job data and application flow |
| 9 | Service Details | Creative scroll/storytelling redesign | All existing service information/business meaning |

### Mandatory component-source traceability

For each redesigned section, Claude Code should record in its implementation notes/comments (where appropriate) which reference was used:

- Feedback 2 → Aceternity UI Bento Grid / Layout Grid / Card Hover Effect
- Feedback 3 → Aceternity UI Expandable Cards / Text Reveal Card / Card Hover Effect
- Feedback 4 → Aceternity UI Apple Cards Carousel / Images Slider
- Feedback 6 → Aceternity UI Infinite Moving Cards
- Feedback 8 → Aceternity UI Expandable Cards / Card Hover Effect
- Feedback 9 → Aceternity UI Sticky Scroll Reveal / Timeline / Parallax Grid Scroll

This does **not** mean the site must visually copy the demo. It means the interaction/layout pattern should be taken from the named reference component and adapted to TRACE.

### Mandatory About Us image verification

After implementation, explicitly verify:

- `about_us_trace.jpg` is still the actual image used.
- The original asset file was not overwritten or replaced.
- Its intrinsic pixel dimensions are unchanged.
- Its aspect ratio is unchanged.
- No crop is applied.
- No stretch/distortion is applied.
- No generated/recompressed derivative is being used.
- Desktop and mobile both display the same source image without distortion.

---

# MOTION QUALITY, PERFORMANCE, AND ACCESSIBILITY REQUIREMENTS

Because multiple component libraries are being considered, motion quality must be treated as a design constraint.

### Motion rules
- Prefer transform/opacity/layout animations over expensive paint-heavy effects.
- Avoid continuous animations on large numbers of DOM nodes.
- Do not use WebGL/shaders/particle systems for these feedback items unless the existing TRACE site already uses them in that exact affected section and the feedback clearly benefits from them.
- Do not add cursor-following effects globally.
- Do not add artificial 3D perspective everywhere.
- Do not animate every text character unless the effect is genuinely appropriate for a short heading.
- Do not make automatic carousels move so quickly that users cannot read content.
- Pause or reduce non-essential motion on hover/focus where appropriate.
- Respect `prefers-reduced-motion`.
- Ensure keyboard users can operate interactive cards, accordions, sliders, and carousels.
- Ensure focus states remain visible.
- Never make essential information accessible only through hover.

### Visual consistency rule
Before finalizing a redesigned section, compare it side-by-side mentally/visually with the site's existing liked sections. If the new section looks like it came from a different website, reduce the effect intensity and adapt its spacing, typography, borders, and motion to match TRACE.

### Asset rule
Do not substitute external demo images from any component website for TRACE's actual content. Component-library images are references only. Existing TRACE images/content must remain the source material unless the feedback explicitly requests a replacement.

---

# EXPECTED RESULT

The final website should preserve its current identity and content while making the specifically criticized areas more polished:

- removed homepage segment
- more creative affected homepage section
- more informative but still clean Services section
- revised Project animation
- TRACE logo desk image preserved
- automatically animated Insights
- Related Projects removed
- improved Careers UI + expired application handling
- significantly more creative Service Details presentation

Do not report success merely because code compiles. Verify that the actual requested UI behavior is present.

If there are multiple reasonable component choices, prefer the one that:
1. best fits the existing TRACE design,
2. requires the least unnecessary code/dependency change,
3. provides the requested visual improvement,
4. preserves existing content and functionality,
5. performs well and remains accessible.

Begin by reading the feedback document and inspecting the codebase. Do not make changes until you have mapped each feedback item to the relevant implementation.
