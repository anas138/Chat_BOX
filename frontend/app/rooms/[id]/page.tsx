"use client"
import { useState, useEffect, useRef } from "react"
import { jwtDecode } from "jwt-decode";
import { userInterface, chatInterface, dynamicRouteIsInterface } from "@/app/interface/interface";
import { socketOn, socketEmit, socketDisconnect } from "@/app/requests/handleSocckets";

import io from "socket.io-client";
import Chat from "@/app/componenets/chat/chat";
import { postRequest, getRequest } from "@/app/requests/handleApis";
export default function chat({ params }: { params: dynamicRouteIsInterface }): JSX.Element {
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState<chatInterface[] | undefined>([])
    const [user, setUser] = useState<userInterface>()
    const notification = useRef()

    useEffect(() => {
        getUser()
        getChat()

        // listen event
        socketOn("message", () => getChat())

        socketOn('group-notification', (data: any) => showNotification(data))

        return () => {
            socketDisconnect()

        };

    }, [])


    const getChat = async () => {
        const data = await getRequest<chatInterface[]>(`/group/${params.id}/message`)
        setChat(data)
    }

    const sendMessage = async () => {
        const payload = {
            message: message,


        }

        await postRequest(`/group/${params.id}/message`, payload)
        // handle sockets
        socketEmit("chat", { data: payload })
        setMessage("")
        getChat()

    }

    const getUser = () => {
        const token = JSON.stringify(localStorage.getItem("access-token"))
        const fromUserInfo: userInterface = jwtDecode(token)
        setUser(fromUserInfo)
    }

    const getGroupUser = async () => {
        const data = await getRequest<any>(`/group/${params.id}/users`)
        return data
    }

    const showNotification = async (data: any) => {
        const token = JSON.stringify(localStorage.getItem("access-token"))
        const loggedInUser: userInterface = jwtDecode(token)
        const groupUsers = await getGroupUser()
        const getExist = groupUsers.find((group: any) => group.user_id === loggedInUser.id && data.roomId === group.group_id)
        if (getExist) {
            console.log(data.message, "exists")
            notification.current = data.message
            console.log(notification.current, "current")
        }

    }


    return (
        <>
            <div className="fixed top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md">{notification.current}</div>
            <Chat setMessage={setMessage} sendMessage={sendMessage} chat={chat} params={params} message={message} user={user} />
        </>
    )

}