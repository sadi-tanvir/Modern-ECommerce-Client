const DropdownMenuItem = ({ children, rest, onClick }: { children: string, rest?: any, onClick: () => void }) => {
    return (
        <a onClick={onClick} href="#" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${rest}`} role="menuitem" >
            {children}
        </a>
    );
};

export default DropdownMenuItem;