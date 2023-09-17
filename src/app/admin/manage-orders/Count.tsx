import React, { Component } from 'react'

interface CountProps {
    count: number;
}

interface CountState {
    thisCount: number;
    visibility: string;
}

export default class Count extends Component<CountProps, CountState> {
    constructor(props: { count: number }) {
        super(props);
        this.state = {
            thisCount: this.props.count,
            visibility: 'block'
        }
    }

    componentDidUpdate(prevProps: Readonly<CountProps>, prevState: unknown, snapshot?: any): void {
        if (prevProps.count != this.props.count) {
            console.warn('component updated');
            this.setState({ thisCount: this.props.count })
        }
    }


    componentWillUnmount(): void {
        this.setState({ visibility: 'block' })
    }

    static getDerivedStateFromProps(props: CountProps, state: CountState) {
        return {
            thisCount: state.thisCount * 2,
            visibility: 'hidden'
        }
    }

    render() {
        return (
            <>
                <div>Count : {this.state.thisCount}</div>
                <div className={`${this.state.visibility}`}>Color : {this.state.visibility}</div>
            </>
        )
    }
};