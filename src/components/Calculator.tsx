import React from "react";
import { VectorInput } from "./VectorInput";

export class Calculator extends React.Component {
    state: {
        is3d: boolean;
        input_size: {
            x: number | undefined;
            y: number | undefined;
            z: number | undefined;
        };
        padding: {
            x: number | undefined;
            y: number | undefined;
            z: number | undefined;
        };
        kernel_size: {
            x: number | undefined;
            y: number | undefined;
            z: number | undefined;
        };
        stride: {
            x: number | undefined;
            y: number | undefined;
            z: number | undefined;
        };
        result: string;
    } = {
            is3d: true,
            input_size: { x: undefined, y: undefined, z: undefined },
            padding: { x: undefined, y: undefined, z: undefined },
            kernel_size: { x: undefined, y: undefined, z: undefined },
            stride: { x: undefined, y: undefined, z: undefined },
            result: "",
        };

    compute() {
        if (this.state.is3d) {
            const x =
                Math.floor(
                    this.state.input_size.x -
                    this.state.kernel_size.x +
                    2 * this.state.padding.x
                ) / this.state.stride.x;

            if (x.toString() == "NaN") return;
            const y =
                Math.floor(
                    this.state.input_size.y -
                    this.state.kernel_size.y +
                    2 * this.state.padding.y
                ) / this.state.stride.y;

            if (y.toString() == "NaN") return;
            const z =
                Math.floor(
                    this.state.input_size.z -
                    this.state.kernel_size.z +
                    2 * this.state.padding.z
                ) / this.state.stride.z;

            if (z.toString() == "NaN") return;
            this.state.result = `${x}\xd7${y}\xd7${z}`;
        } else {
            const x =
                Math.floor(
                    this.state.input_size.x -
                    this.state.kernel_size.x +
                    2 * this.state.padding.x
                ) / this.state.stride.x;

            if (x.toString() == "NaN") return;
            const y =
                Math.floor(
                    this.state.input_size.y -
                    this.state.kernel_size.y +
                    2 * this.state.padding.y
                ) / this.state.stride.y;

            if (y.toString() == "NaN") return;
            this.state.result = `${x}\xd7${y}`;
        }

        this.setState(this.state);
    }

    render() {
        return (
            <div>
                <label>Conv2d</label>
                <input
                    type="radio"
                    checked={!this.state.is3d}
                    onChange={(_ev) => {
                        this.state.is3d = false;

                        this.setState(this.state);
                    }}
                />
                <label>Conv3d</label>
                <input
                    type="radio"
                    checked={this.state.is3d}
                    onChange={(_ev) => {
                        this.state.is3d = true;

                        this.setState(this.state);
                    }}
                />
                <VectorInput
                    label="Input Size: "
                    xHint="Input Width"
                    yHint="Input Height"
                    zHint="Input Depth"
                    threeDimension={this.state.is3d}
                    doProcess={(x, y, z) => {
                        this.state.input_size = { x: x, y: y, z: z };
                        this.compute();
                    }}
                ></VectorInput>
                <VectorInput
                    label="Padding Size: "
                    xHint="Padding Width"
                    yHint="Padding Height"
                    zHint="Padding Depth"
                    threeDimension={this.state.is3d}
                    doProcess={(x, y, z) => {
                        this.state.padding = { x: x, y: y, z: z };
                        this.compute();
                    }}
                ></VectorInput>
                <VectorInput
                    label="Kernel Size: "
                    minimum={1}
                    xHint="Kernel Width"
                    yHint="Kernel Height"
                    zHint="Kernel Depth"
                    threeDimension={this.state.is3d}
                    doProcess={(x, y, z) => {
                        this.state.kernel_size = { x: x, y: y, z: z };
                    }}
                ></VectorInput>
                <VectorInput
                    label="Stride: "
                    minimum={1}
                    xHint="Stride X"
                    yHint="Stride Y"
                    zHint="Stride Z"
                    threeDimension={this.state.is3d}
                    doProcess={(x, y, z) => {
                        this.state.stride = { x: x, y: y, z: z };
                        this.compute();
                    }}
                ></VectorInput>
                <label>{this.state.result.length > 0 ? "Output Shape: " : ""}</label>
                <p>{this.state.result}</p>
            </div>
        );
    }
}
