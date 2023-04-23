import React from "react";

export class VectorInput extends React.Component<VectorInputProps> {
    state: {
        x: number | undefined;
        y: number | undefined;
        z: number | undefined;
        error: string | undefined;
    } = {
            x: undefined,
            y: undefined,
            z: undefined,
            error: undefined,
        };

    createInput(dimensionIndex: number) {
        const handleInput = ((ev: React.ChangeEvent<HTMLInputElement>) => {
            if (ev.target.value.length == 0) {
                this.state.error = "";
                return;
            }
            try {
                const value = parseInt(ev.target.value);
                const index = parseInt(ev.target.getAttribute("data-index"));
                const minimum =
                    this.props.minimum != undefined ? this.props.minimum : 0;
                if (value < minimum) {
                    this.state.error = `Must be greater than ${minimum}`;
                } else {
                    this.state.error = "";

                    if (index == 0) this.state.x = value;
                    if (index == 1) this.state.y = value;
                    if (index == 2) this.state.z = value;

                    if (
                        this.props.doProcess != undefined &&
                        this.state.x != undefined &&
                        this.state.y != undefined &&
                        (this.props.threeDimension == false ? true : (this.state.z != undefined))
                    ) {
                        this.props.doProcess(this.state.x, this.state.y, this.state.z);
                    }

                    this.setState(this.state);
                    return;
                }
            } catch (_e) {
                this.state.error = "Must an integer value";
            }

            this.setState(this.state);
        }).bind(this);

        const handleInvalid = ((ev: React.ChangeEvent<HTMLInputElement>) => {
            if (ev.target.value.length == 0) return;
            this.state.error = "Must an integer value";
            this.setState(this.state);
        }).bind(this);

        switch (dimensionIndex) {
            case 0:
                return (
                    <input
                        type="number"
                        data-index={dimensionIndex}
                        step="1"
                        min="0"
                        max="65536"
                        value={this.state.x}
                        placeholder={this.props.xHint}
                        onChange={(ev) => handleInput(ev)}
                        onInvalidCapture={(ev) => handleInvalid(ev)}
                    />
                );
            case 1:
                return (
                    <input
                        type="number"
                        data-index={dimensionIndex}
                        step="1"
                        min="0"
                        max="65536"
                        value={this.state.y}
                        placeholder={this.props.yHint}
                        onChange={(ev) => handleInput(ev)}
                        onInvalidCapture={(ev) => handleInvalid(ev)}
                    />
                );
            case 2:
                return (
                    <input
                        type="number"
                        data-index={dimensionIndex}
                        step="1"
                        min="0"
                        max="65536"
                        value={this.state.z}
                        placeholder={this.props.zHint}
                        onChange={(ev) => handleInput(ev)}
                        onInvalidCapture={(ev) => handleInvalid(ev)}
                    />
                );
        }

        return null;
    }

    render() {
        const label = <label> {this.props.label} </label>;

        if (this.props.threeDimension) {
            const xInput = this.createInput(0);
            const yInput = this.createInput(1);
            const zInput = this.createInput(2);

            return (
                <div>
                    {label}
                    {xInput}
                    {yInput}
                    {zInput}
                    <div className="error-message">{this.state.error}</div>
                </div>
            );
        } else {
            const xInput = this.createInput(0);
            const yInput = this.createInput(1);

            return (
                <div>
                    {label} {xInput} {yInput}
                    <div className="error-message">{this.state.error}</div>
                </div>
            );
        }
    }
}

interface VectorInputProps {
    threeDimension?: boolean | undefined;
    label?: string | undefined;
    xHint?: string | undefined;
    yHint?: string | undefined;
    zHint?: string | undefined;
    minimum?: number | undefined;
    doProcess?: ((x: number, y: number, z: number | undefined) => void) | undefined;
}
