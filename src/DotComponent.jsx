import { createElement } from 'react';

export function DotComponent({ initialComponent, initialProps, children }) {
    const Component = createElement(
        initialComponent,
        initialProps,
        createChildren({
            Component: () => (
                <div dangerouslySetInnerHTML={{ __html: children }} />
            ),
            key: Date.now(),
        }),
    );

    return Component;
}

function createChildren({ Component, key, childrenProps = {} }) {
    const child = createElement(Component, { key, ...childrenProps });

    if (typeof Component.layout === 'function') {
        return Component.layout(child);
    }

    if (Array.isArray(Component.layout)) {
        return Component.layout
            .concat(child)
            .reverse()
            .reduce((c, Layout) => createElement(Layout, {}, c));
    }

    return child;
}
