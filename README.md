# QuickTOC

A simple script that uses the headings in the content of a page and automatically generates a table of contents with styling.

You can see an example image of a generated TOC in [this example image](https://github.com/caganseyrek/QuickTOC/blob/main/img/example.png).

## Setup and Usage

First, install the package.

```bash
npm install quicktoc
# or
pnpm add quicktoc
```

You can initialize the TOC without any parameters.

```typescript
new QuickTOC().init();
```

By default, the script looks for an element with the ID "page-contents" to get the headings and an element with the ID "toc" to place the table of contents.

If you want to use elements with custom IDs, you can pass the parameters as shown below:

```typescript
new QuickTOC().init({
  includeH1: true,                  // includeH1?: boolean;
  pageContentsId: "page-contents",  // pageContentsId?: string;
  tocSectionId: "toc",              // tocSectionId?: string;
});
```

### Options

- **includeH1**: By default, the script uses `h2`, `h3`, and `h4` elements while generating the TOC and reserves `h1` element for the page title. To include `h1` in the TOC, just set the first parameter to `true`.

- **pageContentsId**: By default, the script looks for an element with the ID "page-contents" to get the headings. You can pass a custom element ID as the second parameter to use headings from that element.

- **tocSectionId**: By default, the script looks for an element with the ID "toc" to place the table of contents. You can pass a custom element ID as the third parameter to place the TOC in that element.

## Styling

To use the default stylings, you can just install the `quicktoc.css` file, which contains the default styles for the TOC, and import it.

```css
@import url("/path/to/quicktoc.css"); /* css */
```

```typescript
import "/path/to/quicktoc.css"; // typescript
```

```html
<link rel="stylesheet" href="/path/to/quicktoc.css" /> <!-- html -->
```

## Custom Styling

You can change appearance of the main list by adding styles to the container where the script places the list. Container and sublists have these classes as default:

```css
#toc {}
#toc ul {}
#toc ul li {}
#toc ul li a {}

.toc-sublist {} /* for h2 */
.toc-doublesublist {} /* for h3 */
.toc-triplesublist {} /* for h4 */
```

When you exclude `h1` tags, all the sublists go up one heading level.

```css
.toc-sublist {} /* for h3 */
.toc-doublesublist {} /* for h4 */

/* this class is not used when h1 is not included */
.toc-triplesublist {}
```
