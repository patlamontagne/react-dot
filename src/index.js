import { DotComponent } from "./DotComponent";
import { ErrorComponent } from "./ErrorComponent";

function getRootProps(el) {
    const props = {};

    Object.entries(el.dataset).forEach(([key, value]) => {
        const nkey = renamePropKey(key);

        if (!nkey) return;

        try {
            value = JSON.parse(value);
        } catch (e) {
            //
        }

        props[nkey] = value;
    });

    return props;
}

function getDotRoots() {
    return [
        ...document.querySelectorAll(`[data-dot]:not([data-dot-rendered])`),
    ];
}

function renamePropKey(key) {
    let value = key.toString();

    if (value.startsWith("prop")) {
        value = value.replace(/^prop/i, "");
        return value.charAt(0).toLowerCase() + value.slice(1);
    } else {
        return;
    }
}

export async function createDot(el, resolve, setup) {
    const initialProps = getRootProps(el);
    const component = el.dataset.dot;
    el.dataset.dotRendered = true;

    const resolveComponent = (name) => Promise.resolve(resolve(name)).then((module) => module.default || module);

    await resolveComponent(component)
        .then((initialComponent) => {
            return setup({
                el,
                Dot: DotComponent,
                props: {
                    initialProps,
                    initialComponent,
                    children: el.innerHTML,
                },
            });
        })
        .catch((error) => {
            return setup({
                el,
                Dot: ErrorComponent,
                props: {
                    message: error.toString(),
                },
            });
        });
}

export async function createDots({ resolve, setup }) {
    getDotRoots().map((el) => createDot(el, resolve, setup));
}
