# react-dot

While `react-dot` only needs html to work, it is intended to be used along a backend adapter:

https://github.com/patlamontagne/react-dot-php


## Usage with React 18

```jsx
import { createRoot } from "react-dom/client";
import { createDots } from "react-dot";

createDots({
    resolve: (name) => require(`./components/${name}.jsx`),
    setup: ({ el, Dot, props }) => {
        createRoot(el).render(<Dot {...props} />);
    },
});
```

## Code splitting

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