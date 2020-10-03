# µce starter with TypeScript and Rollup

[µce](https://github.com/WebReflection/uce) is a tiny helper library to create Custom Elements. This starter kit helps to set up a project using µce together with TypeScript.

## Features 

* Written in TypeScript
* Bundled by [Rollup](https://rollupjs.org/)
* Includes polyfills to support older browsers
* Tested on Internet Explorer 11


## Use with SPA libraries

Because Custom Elements can be used directly as HTML elements, the typing in the µce definition object gets lost.

It would be valid to use a component prop that isn't specified:

```tsx
<my-counter counter={99}></my-counter>
```

When using a SPA library like React or Mithril, you can preserve typing by using a thin wrapper around the Custom Element:

```tsx
import {
  MyCounter as MyCounterCE,
  MyCounterProps
} from "../uceElements/MyCounter";

// Create the Custom Element so that we can use
// <my-counter></my-counter>
define("my-counter", MyCounterCE);

export const MyCounter = (props: MyCounterProps) => (
  <my-counter {...props}></my-counter>
);
```

Now the CE can be used as a typed component:

```tsx
<MyCounter counter={99} />
```

This would generate the error:

```
Type '{ counter: number; }' is not assignable to type 'IntrinsicAttributes & MyCounterProps'.
Property 'counter' does not exist on type 'IntrinsicAttributes & MyCounterProps'. Did you mean 'count'? ts(2322)
```

Correct use:

```tsx
<MyCounter count={99} />
```

## Examples

Live examples on CodeSandbox (which is using Parcel instead of Rollup).


*  [µce with React](https://codesandbox.io/s/uce-with-react-and-typescript-45sbf)
*  [µce with Mithril](https://codesandbox.io/s/uce-with-mithril-and-typescript-4lhbk)


## Setup

The example component is a simple (and slightly modified) counter that is used on [webcomponents.dev](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/) to compare Web Component libraries.

1. Clone this repository
1. `cd uce-starter-typescript-rollup`
1. `npm install`

## Run and build

* `npm run dev` - runs the dev server on port `3000`
* `npm run build` - creates `bundle.js` in `dist`
* `npm run serve` - runs a server on `dist`
