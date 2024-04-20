interface HeaderProps {
    username: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
    return (
        <div className="px-4 py-2 bg-gray-200">
            <h1 className="text-xl font-semibold">{username}</h1>
        </div>
    );
};

export default Header;