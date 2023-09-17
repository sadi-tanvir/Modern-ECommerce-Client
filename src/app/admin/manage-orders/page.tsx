'use client'
import React, { Component } from 'react'
import Count from './Count';
import { count } from 'console';

interface ManageOrdersProps { }

interface StateTypes {
    count: number
}


export default class ManageOrders extends Component<ManageOrdersProps, StateTypes> {
    constructor(props: ManageOrdersProps) {
        super(props);

        this.state = {
            count: 0
        }
    }

    componentDidMount(): void {
        this.setState({ count: 10 })
    }

    updateCountVal() {
        this.setState({ count: this.state.count + 1 })
    }
    // updateCountVal = () => {
    //     this.setState({ count: this.state.count + 1 })
    // }


    static getDerivedStateFromProps(props: ManageOrdersProps, state: StateTypes) {
        return {
            count: state.count + 100
        }
    }


    render() {
        return (
            <div className='flex flex-col gap-10 justify-center items-center p-10'>
                <Count count={this.state.count} />
                <div>page</div>
                {/* <button onClick={this.updateCountVal.bind(this)} className='btn btn-primary'>update value</button> */}
                <button onClick={() => this.updateCountVal()} className='btn btn-primary'>update value</button>
            </div>
        )
    }
}
