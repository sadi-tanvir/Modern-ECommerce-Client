const BdtIcon = ({ color }: { color: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="20"
            height="20"
            fill={color}
            className="line-through"
        >
            <text x="30" y="80" font-size="80">৳</text>
        </svg>
    )
}


export { BdtIcon }