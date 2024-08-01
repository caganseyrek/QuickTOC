# TOC-Generator

A simple script that uses the headings in the content of a page and automatically generates a table of contents with styling.

You can see an example image of a generated TOC in [this example image](https://github.com/caganseyrek/TOC-Generator/blob/main/img/example.png).

## Setup and Usage

First, install the `toc.min.js` file.

Then add the script right before the `</body>` tag in your HTML file.

```html
  ...
  <script src="/path/to/toc.min.js"></script>
</body>
```

Next, call the function on the page where you want to add the TOC:

```html
  ...
  <script src="/path/to/toc.min.js"></script>
  <script>
    GenerateTOC();
  </script>
</body>
```

You can call the function without any parameters. By default, the script looks for an element with the ID "page-contents" to get the headings and an element with the ID "toc" to place the table of contents.

If you want to use elements with custom IDs, you can pass the parameters as shown below:

```html
  ...
  <script src="/path/to/toc.min.js"></script>
  </body>
  <script>
    GenerateTOC(
      true,            // includeH1: boolean
      "page-contents", // pageContentsId: string
      "toc"            // tocSectionId: string
    );
  </script>
</html>
```

### Options

- **includeH1**: By default, the generator uses `h2`, `h3`, and `h4` elements while generating the TOC and reserves `h1` element for the page title. To include `h1` in the TOC, just set the first parameter to `true`.

- **pageContentsId**: By default, the generator looks for an element with the ID "page-contents" to get the headings. You can pass a custom element ID as the second parameter to use headings from that element.

- **tocSectionId**: By default, the generator looks for an element with the ID "toc" to place the table of contents. You can pass a custom element ID as the third parameter to place the TOC in that element.

## Styling

To use the default stylings, you can just install the `toc.css` file, which contains the default styles for the TOC, and import it into your main CSS file.

```css
@import url("/path/to/toc.css");
```

Alternatively, you can add it directly to your HTML file without importing it into your main CSS file:

```html
<link rel="stylesheet" href="/path/to/toc.css" />
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

## Customizing

After modifying the `toc.js`, you can run the following command to minify it and overwrite the `toc.min.js`:

```bash
npm run minify
```
