# µce starter with TypeScript and Rollup

[µce](https://github.com/WebReflection/uce) is a tiny helper library to create Custom Elements. This starter kit helps to set up a project using µce together with TypeScript.

- [Features](#features)
- [Examples](#examples)
- [Use with SPA libraries](#use-with-spa-libraries)
- [Repo setup](#repo-setup)
- [Run and build](#run-and-build)
- [See also](#see-also)

## Features 

* Written in TypeScript
* Bundled by [Rollup](https://rollupjs.org/)
* Includes polyfills to support older browsers
* Tested on Internet Explorer 11


## Examples

Live examples on CodeSandbox (which is using Parcel instead of Rollup).

*  [µce with React](https://codesandbox.io/s/uce-with-react-and-typescript-45sbf)
*  [µce with Mithril](https://codesandbox.io/s/uce-with-mithril-and-typescript-4lhbk)



## Use with SPA libraries

Using Custom Elements as HTML elements, the typing in the µce definition object would get lost. For example, it would be valid to use a component prop that isn't specified:

```tsx
<my-counter counter={99}></my-counter>
```

When using a SPA library like React or Mithril, you can preserve typing by using a thin wrapper around the Custom Element:

```tsx
// Import the uce definition plus its types
import {
  MyCounter as MyCounterCE,
  MyCounterProps
} from "../uceElements/MyCounter";

// Create the Custom Element so that we can use
// <my-counter></my-counter>
define("my-counter", MyCounterCE);

// Export as SPA component

// React example:
export const MyCounter = (props: MyCounterProps) => (
  <my-counter {...props}></my-counter>
);

// Mithril example:
export const MyCounter: m.Component<MyCounterProps> = {
  view: (vnode) => m("my-counter", vnode.attrs)
};
```


Now the wrapped Custom Element can be used as a typed component:

```tsx
<MyCounter counter={99} />
```

Which will generate a type error:

```
Type '{ counter: number; }' is not assignable to type 'IntrinsicAttributes & MyCounterProps'.
Property 'counter' does not exist on type 'IntrinsicAttributes & MyCounterProps'. Did you mean 'count'? ts(2322)
```

Correct use:

```tsx
<MyCounter count={99} />
```


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
