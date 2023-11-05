import React, { Component } from 'react'

type PageNumberProps = {
    onClick?: () => void,
    activePage: number,
    pageNumber: number
};

export default class PageNumber extends Component<PageNumberProps> {
    constructor(props: PageNumberProps) {
        super(props);
    };
    
    render() {
        return (
            <div
                onClick={this.props.onClick}
                className={`relative z-10 inline-flex items-center ${this.props.activePage === this.props.pageNumber ? "bg-primary" : "bg-secondary"}  px-6 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer`}>
                {this.props.pageNumber + 1}
            </div>
        );
    };
};