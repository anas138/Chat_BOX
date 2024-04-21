"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GroupInterface, userInterface, } from "@/app/interface/interface";
import { getRequest, postRequest } from "../requests/handleApis";
import { socketEmit, socketOn } from "../requests/handleSocckets";
import { jwtDecode } from "jwt-decode";




export default function ChatBox(): JSX.Element {
    const router = useRouter()
    const [group, setGroup] = useState<GroupInterface[] | undefined>([]);
    const [groupName, setGroupName] = useState("");

    const joinGroup = async (id: number) => {
        await postRequest(`/group/join/group/${id}`, { join: "" })
        const token = JSON.stringify(localStorage.getItem("access-token"))
        const fromUserInfo: userInterface = jwtDecode(token)
        const groupData = await getGroupById(id)
        router.push(`/rooms/${id}`)



    }

    const handleAddGroup = async () => {
        const payload = {
            group_name: groupName
        }
        const data = await postRequest('/group', payload)
        getGroups()
        setGroupName("");
    };

    const getGroups = async () => {
        const data = await getRequest<GroupInterface[]>('/group')
        setGroup(data)
    }

    const getGroupById = async (id: number) => {
        const data = await getRequest(`/group/${id}`)
        return data
    }
    useEffect(() => {
        getGroups()
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="h-96 w-96 flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                <div className="mb-6 flex items-center">
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full px-4 py-2 mr-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter group name"
                    />
                    <button
                        onClick={handleAddGroup}
                        className="bg-blue-600 text-white rounded-full py-2 px-4 cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        Add
                    </button>
                </div>

                {group?.map((group) => (
                    <div key={group.id} className="p-4 border rounded-md w-full">
                        <div className="flex items-center" onClick={() => joinGroup(group.id)}>
                            <div >
                                <h2 className="text-lg font-semibold">{group.group_name}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
