import React from "react";


export class VectorInput extends React.Component<VectorInputProps> {
    createInput(dimensionIndex: number): JSX.Element | null {
        switch (dimensionIndex) {
            case 0:
                return <input type="number" step="1" min="0" max="65536" placeholder={this.props.xHint}>
                </input>;
            case 1:
                return <input type="number" step="1" min="0" max="65536" placeholder={this.props.yHint}>
                </input>;
            case 2:
                return <input type="number" step="1" min="0" max="65536" placeholder={this.props.zHint}>
                </input>;
        }

        return null;
    }

    render() {
        const label = <label>{this.props.label}</label>
        if (this.props.threeDimension) {
            const xInput = this.createInput(0);
            const yInput = this.createInput(1);
            const zInput = this.createInput(2);

            return <div>
                {label}
                {xInput}
                {yInput}
                {zInput}

            </div>;

        } else {
            const xInput = this.createInput(0);
            const yInput = this.createInput(1);

            return <div>
                {label}
                {xInput}
                {yInput}
            </div>
        }
    }
}

interface VectorInputProps {
    threeDimension?: boolean;
    label?: String
    xHint?: string;
    yHint?: string;
    zHint?: string;
}