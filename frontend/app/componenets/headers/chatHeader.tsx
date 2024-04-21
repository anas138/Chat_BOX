import { userInterface } from "@/app/interface/interface";

interface HeaderProps {
    user: userInterface | undefined;
    typing: { fromUserInfo: userInterface, typing: string } | undefined
}

const Header: React.FC<HeaderProps> = ({ user, typing }) => {
    return (
        <div className="px-4 py-2 bg-gray-200">
            <h1 className="text-xl font-semibold">{user?.username}</h1>
            {user?.id === typing?.fromUserInfo.id && <span className="text-gray-600">
                {typing?.typing}
            </span>}

        </div>
    );
};

export default Header;