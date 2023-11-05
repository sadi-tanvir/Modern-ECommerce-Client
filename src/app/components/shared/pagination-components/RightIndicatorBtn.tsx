import React, { Component } from 'react'

interface RightIndicatorBtnProps {
    handleIncreasePagination?: () => void;
    children: React.ReactNode;
};

export default class RightIndicatorBtn extends Component<RightIndicatorBtnProps> {
    constructor(props: RightIndicatorBtnProps) {
        super(props);
    };

    render() {
        return (
            <div
                onClick={this.props.handleIncreasePagination}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
                {this.props.children}
            </div>
        );
    };
};
