import { DotComponent } from "./DotComponent";
import { ErrorComponent } from "./ErrorComponent";

export async function createDot(el, className = "react-dot", resolve, setup) {
    el.classList.add(`${className}--rendered`);
    const initialData = JSON.parse(el.dataset.react);
    const resolveComponent = (name) =>
        Promise.resolve(resolve(name)).then(
            (module) => module.default || module
        );

    // clean up markup
    el.classList.add(`${className}--rendered`);
    delete el.dataset.react;

    await resolveComponent(initialData.component)
        .then((initialComponent) => {
            return setup({
                el,
                Dot: DotComponent,
                props: {
                    initialData,
                    initialComponent,
                    children: el.innerHTML,
                    resolveComponent,
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

export async function createDots({ className = "react-dot", resolve, setup }) {
    const elements = [
        ...document.querySelectorAll(
            `.${className}:not(.${className}--rendered)`
        ),
    ];

    elements.map((el) => createDot(el, className, resolve, setup));
}
