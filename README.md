# µce starter with TypeScript and Rollup

[µce](https://github.com/WebReflection/uce) is a tiny helper library to create Custom Elements. This starter kit helps to set up a project using µce together with TypeScript.

- [µce starter with TypeScript and Rollup](#µce-starter-with-typescript-and-rollup)
  - [Features](#features)
  - [Examples](#examples)
  - [Use with SPA libraries](#use-with-spa-libraries)
    - [React](#react)
    - [Mithril](#mithril)
    - [CSS](#css)
  - [Repo setup](#repo-setup)
  - [Run and build](#run-and-build)
  - [See also](#see-also)

## Features 

* Written in TypeScript
* Bundled by [Rollup](https://rollupjs.org/)
* Optionally use PostCSS for styling
* Includes polyfills to support older browsers
* Tested on Internet Explorer 11


## Examples

Live examples on CodeSandbox (which is using Parcel instead of Rollup).

*  [µce with React](https://codesandbox.io/s/uce-with-react-and-typescript-45sbf)
*  [µce with Mithril](https://codesandbox.io/s/uce-with-mithril-and-typescript-4lhbk)



## Use with SPA libraries

### React 

Typed Custom Elements can simply be used in a React project. For example:

```tsx
import React from "react";
// Import the uce Custom Element (which activates it with tag "my-counter")
import  "./my-counter";

export const App = () => {
  return (
    <>
      <my-counter />
      <my-counter count="99" />
    </>
  );
};
```

In order to preserve typing, "my-counter" is listed in globals.d.ts (which is included in tsconfig.json). This also solves the TS error "Property 'my-counter' does not exist on type 'JSX.IntrinsicElements'" (raised because React JSX elements must be written in  PascalCase).

To include "my-counter" to the accepted tags (and to add the types), take these steps:

1. Create a type definition file `globals.d.ts` in the root of your project:

```ts
// globals.d.ts
import type { MyCounterProps } from "./src/my-counter";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-counter': MyCounterProps;
    }
  }
}
```

2. Include the type definition file in `tsconfig.json`:

```json
{
  "include": [
    "./src/*",
    "./globals.d.ts"
  ],
  "compilerOptions": {}
}
```

### Mithril

For Mithril, you can preserve typing by using a thin wrapper component around the Custom Element:

```ts
import m from "mithril";
import { MyCounterProps } from "./my-counter";
// Import the uce Custom Element (which activates it with tag "my-counter")
import "./my-counter";

export const MyCounter: m.Component<MyCounterProps> = {
  view: (vnode) => m("my-counter", vnode.attrs)
};
```

and then use the wrapper component:

```ts
import m from "mithril";
import { MyCounter } from "./MyCounter";

export const App = {
  view: () => {
    return [
      m(MyCounter),
      m(MyCounter, { count: "99" })
    ];
  }
};
```

Alternatively, use a wrapper function:

```ts
const customElement =
  <Attrs>(tag: string) =>
  (attrs?: Attrs) =>
    m(tag, attrs);

const myCounter = customElement<MyCounterProps>("my-counter");

export const App = {
  view: () => {
    return [
      myCounter(),
      myCounter({ count: "12" }),
    ];
  },
};
```

### CSS 

`my-counter-postcss` is styled with CSS Variables that are defined in the element's CSS definition. However, this does not work for IE 11, that only accepts CSS Variables that are defined in `:root` - see `my-counter-postcss-ie11`.

If you must support Internet Explorer 11, you have two choices:

1. Always define CSS Variables in `:root` (which is the document root). If you're not careful, variables may be overwritten - alternatively use a single root file for all definitions.
2. Use PostCSS plugin [postcss-cssnext](https://www.npmjs.com/package/postcss-cssnext) (deprecated) to process all CSS Variables to static values. However, as expected, this does remove the option for theming by simply changing CSS Variable values.

## Repo setup

The example component is a simple (and slightly modified) counter that is used on [webcomponents.dev](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/) to compare Web Component libraries.

1. Clone this repository
1. `cd uce-starter-typescript-rollup`
1. `npm install`

## Run and build

* `npm run dev` - runs the dev server on port `3000`
* `npm run build` - creates `bundle.js` in `dist`
* `npm run serve` - runs a server on `dist`


## See also

* [uce-svelte-typescript](https://github.com/ArthurClemens/uce-svelte-typescript)
* [µce](https://github.com/WebReflection/uce)
