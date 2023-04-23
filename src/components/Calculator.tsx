import React from "react";
import { VectorInput } from "./VectorInput";


export class Calculator extends React.Component {
    state = {
        is3d: true
    };

    render() {
        return <div>
            <label>Conv2d</label><input type="radio" checked={!this.state.is3d} onChange={(_ev) => {
                this.state.is3d = false;

                this.setState(this.state)
            }} />
            <label>Conv3d</label><input type="radio" checked={this.state.is3d} onChange={(_ev) => {
                this.state.is3d = true;

                this.setState(this.state)
            }} />
            <VectorInput label="Input Size: " xHint="Input Width" yHint="Input Height" zHint="Input Depth" threeDimension={this.state.is3d}></VectorInput>
            <VectorInput label="Padding Size: " xHint="Padding Width" yHint="Padding Height" zHint="Padding Depth" threeDimension={this.state.is3d}></VectorInput>
            <VectorInput label="Kernel Size: " xHint="Kernel Width" yHint="Kernel Height" zHint="Stride Depth" threeDimension={this.state.is3d}></VectorInput>
            <VectorInput label="Stride: " xHint="Stride X" yHint="Stride Y" zHint="Stride Z" threeDimension={this.state.is3d}></VectorInput>
        </div>
    }
}
