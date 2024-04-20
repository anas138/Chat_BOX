"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { userInterface } from "@/app/interface/interface";
import { getRequest } from "../requests/handleApis";




export default function ChatBox(): JSX.Element {
    const router = useRouter()
    const [users, setUsers] = useState<userInterface[] | undefined>([]);

    const openChat = (id: number) => {
        router.push(`/chatbox/${id}`)
    }
    const getUsers = async () => {
        const data = await getRequest<userInterface[]>('/user-login')
        setUsers(data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="h-96 w-96 flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                <div className="mb-6">
                    <div onClick={() => router.push('/rooms')} className="bg-blue-600 text-white rounded-full py-2 px-4 cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out">
                        <span className="block text-center">Groups</span>
                    </div>
                </div>

                {users?.map((user) => (
                    <div key={user.id} className="p-4 border rounded-md w-full">
                        <div className="flex items-center" onClick={() => openChat(user.id)}>
                            <div>
                                <h2 className="text-lg font-semibold">{user.username}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
