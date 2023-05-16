import 'react';

export function ErrorComponent(props) {
    return (
        <div
            style={{
                padding: 16,
                background: 'rgb(150, 80, 80)',
                color: 'white',
            }}>
            <div
                style={{
                    fontSize: '1rem',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    marginBottom: 8,
                }}>
                React-dot could not render the {props.component} component.
            </div>
            <code>{props.message}</code>
        </div>
    );
}
