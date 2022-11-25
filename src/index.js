import { DotComponent } from "./DotComponent";

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

    const reactComponent = await resolveComponent(initialData.component).then(
        (initialComponent) => {
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
        }
    );

    return reactComponent;
}

export async function createDots({ className = "react-dot", resolve, setup }) {

    const elements = [
        ...document.querySelectorAll(
            `.${className}:not(.${className}--rendered)`
        ),
    ];

    return elements.map((el) => createDot(el, className, resolve, setup));
}
