# React-dot

Dots are separated backend driven React components.

What does it mean? It means you can add multiple single react components on your front-end and send them initial props right from your backend.

`react-dot` is intended for projects where you can't leverage inertiajs' SPA approach, or for existing server-side rendered projects where you just need to easily add some react interactivity without resorting to rebuilding the whole thing in react.

### Backend adapters

While `react-dot` only needs html to work, you can use a backend adapter to help you generate the markup it needs to initialize.

https://github.com/patlamontagne/react-dot-php

## Installing

```sh
npm i @patlamontagne/react-dot
```

## Usage

Initialize the components (example with React 18's createRoot)
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

```html
<body>
    <div data-dot="MyComponent"
         data-prop-title="Welcome"
         data-prop-mode="dark"
         data-prop-list="['foo', 'bar']"
    >
        <div>Children content</div>
    </div>
</body>
```

```jsx
// components/MyComponent.jsx
export default function MyComponent({ title, mode, list, children }) {
    // ....
}
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
