# TOC-Generator

A simple script that uses the headings in the content of the page and automatically generates a table of contents.

As default, the generator uses `h2`, `h3`, and `h4` tags while generating the toc and reserves `h1` tag for the page title.

You can see an example [here](https://github.com/caganseyrek/TOC-Generator/blob/main/example.png).

***

## Usage

First, install the `toc-generator.js` file. Then edit the parts shown below if necessary:

```javascript
// "page-contents" is where the generator will get the headers.
var pageContents = document.getElementById("page-contents");

// "toc" is  where the generator will put the list.
document.getElementById("toc").appendChild(toclist);
```

Then, you can add the script right before the `</body>` tag in your HTML file.

```html
<!-- Don't forget to change the path to you file's location --> 
<script src="/toc-generator.js"></script>
```

***

## Styling

If you don't want to deal with the styling, you can just install the `toc-style.css` file and add this line to your main css file:

```css
/* Don't forget to change the path to you file's location */
@import url("./toc-style.css");
```

or you can add this line to between `<head>` tags in your html file:

```html
<!-- Don't forget to change the path to you file's location --> 
<link rel="stylesheet" href="./toc-style.css" />
```

***

A bit of information if you want to use a custom styling:

 * You can change main list's (`h2`) styling just by adding styles to container where the script put the list (`#toc` as default).
   ```css
   #toc { /* your styling */ }
   #toc ul { /* your styling */ }
   #toc ul li { /* your styling */ }
   #toc ul li a{ /* your styling */ }
   ```
 * Sublist's have these classes as default:
   ```css
   .toc-sublist { /* for h3 */ }
   .toc-doublesublist { /* for h4 */ }
   ```
 * If you want to change these classes, don't forget to also update those classes' name in the `toc-generator.js` file.
