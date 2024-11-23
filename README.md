# QuickTOC

A simple script that uses the headings in the content of a page and automatically generates a table of contents.

You can see an example image of a generated TOC in [this example image](https://github.com/caganseyrek/QuickTOC/blob/main/img/example.png).

## Installation

You can install the script as a package.

```bash
npm install quicktoc
# or
pnpm add quicktoc
```

Alternatively you can use the script as a vanilla javascript file. To do this, you need to clone the repo, compile the typescript files, and optionally minify the javascript file.

```bash
git clone https://github.com/caganseyrek/QuickTOC.git # cloning the repo

pnpm build:vanilla # converting typescript files into javascript files

pnpm minify:vanilla # (optional) minify the newly generated javascript file
```

Finally, a new file that contains the final code named `quicktoc.min.js` should be in a folder named `js`.

## Options

```typescript
declare interface QuickTOCConfigProps {
  tocRootListType?: TOCRootListTypes;
  includeH1Element?: boolean;
  pageContentElementId?: string;
  tocPlacementElementId?: string;
  tocLevelClasses?: TOCLevelClassType;
  levelQuery?: string;
  debugMode?: boolean;
}

declare type TOCRootListTypes = "numbered" | "bulleted";
```

- **tocRootListType**: Determines the type of the root list in the table of contents. By default, the script generates an ordered (numbered) list as the outer list. You can pass `dotted` to make the outer list an unordered (bulleted) list or pass `numbered` to explicitly set it as an ordered list.

- **pageContentElementId**: Specifies the ID of the element containing the page content which script should be used to generate the table of contents. By default, the script looks for an element with the ID `content`.

- **tocPlacementElementId**: Specifies the ID of the element where the table of contents should be placed. By default, the script looks for an element with the ID `toc`.

- **tocLevelClasses**: Defines CSS classes for specific header levels in the table of contents. This allows custom styling for each level of the generated TOC. By default the scripts assigns `toc-level-n` as class for each level of the sublist (where n is a level number). You can use custom classes by passing an object like one shown below.

```typescript
{
  "toc-level-1": "myCustomClass1",
  "toc-level-2": "myCustomClass2",
  "toc-level-3": "myCustomClass3",
  // ...
}
```

You need to pass as many custom class as your heading levels.

- **levelQuery**: A CSS selector string to identify the elements in the document to be included in the table of contents. This allows which levels are selected for the TOC (e.g., h2, h3, etc.). You can pass a string that includes heading tags sperated by commas like the one shown below.

```typescript
const exampleLevelQuery = "h1,h2,h3,h4,h5,h6";
```

- **debugMode**: Enables logging and debugging information in the console for development purposes. It helps identify issues in TOC generation by displaying detailed information about parsed elements, configuration, and errors.

# Example Usage

You can initialize the TOC without any parameters.

```typescript
QuickTOC.init();
```

You can pass parameters mentioned above to the `init` function.

```typescript
const config: QuickTOCConfigProps = {
  tocRootListType: "numbered",
  pageContentElementId: "content",
  tocPlacementElementId: "toc",
  tocLevelClasses: {
    "toc-level-2": "myCustomClass2",
    "toc-level-3": "myCustomClass3",
    "toc-level-4": "myCustomClass4",
    "toc-level-5": "myCustomClass5",
    "toc-level-6": "myCustomClass6",
  },
  levelQuery: "h2,h3,h4,h5,h6",
  debugMode: false,
};

QuickTOC.init(config);
```

## Legacy Code

The previous version of the code is still present on the `lib/` folder. I do not recommend using it as it is not as flexible and extensible as the latest varsion but if you still want to use it, the code is still available.

You can minify the legacy cSode if you like.

```bash
pnpm minify:legacy
```

## License

This project is open-source and licensed under [MIT License](https://github.com/caganseyrek/QuickTOC/blob/main/LICENSE).
