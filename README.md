# React-dot

Dots are separated backend driven React components.

What does it mean? It means you can add multiple single react components on your front-end and send them initial props right from your backend.

`react-dot` is intended for projects where you can't leverage inertiajs' SPA approach, or for existing server-side rendered projects where you just need to easily add some react interactivity without resorting to rebuilding the whole thing in react.

### Backend adapters

While `react-dot` only needs html to work, it is intended to be used along a backend adapter:

https://github.com/patlamontagne/react-dot-php

## Installing

```sh
npm i @patlamontagne/react-dot
```

## Usage with React 18

```jsx
import { createDots } from "@patlamontagne/react-dot";
import { createRoot } from "react-dom/client";

createDots({
    resolve: (name) => require(`./components/${name}.jsx`),
    setup: ({ el, Dot, props }) => {
        createRoot(el).render(<Dot {...props} />);
    },
});
```

## Code splitting (optional)

Add `@babel/plugin-syntax-dynamic-import` to your project:

```sh
npm i @babel/plugin-syntax-dynamic-import
```

Add a `.babelrc` file at the project root:
```json
{
    "plugins": [
        "@babel/plugin-syntax-dynamic-import"
    ]
}
```

Use `import` instead of `require` :

```jsx
createDots({
    resolve: (name) => import(`./components/${name}.jsx`),
    /*...*/
});
```
