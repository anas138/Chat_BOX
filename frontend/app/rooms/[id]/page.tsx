"use client"
import { ChangeEvent, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import { userInterface, chatInterface, dynamicRouteIsInterface } from "@/app/interface/interface";
import axios from "axios";
import io from "socket.io-client";
import Chat from "@/app/componenets/chat/chat";
import { postRequest, getRequest } from "@/app/requests/handleApis";
export default function chat({ params }: { params: dynamicRouteIsInterface }): JSX.Element {
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState<chatInterface[] | undefined>([])
    const [user, setUser] = useState<userInterface>()
    const [socket, setSocket] = useState<any>(null)
    useEffect(() => {
        getUser()
        getChat()

        //connect sockets
        const sock = io("http://localhost:3001");
        setSocket(sock)

        // listen event
        sock.on("message", () => {
            getChat()
        })
        return () => {
            sock.disconnect(); // Disconnect from the Socket.IO server when the component unmounts
            setSocket(null)
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
        socket.emit("chat", { data: payload })
        setMessage("")
        getChat()

    }

    const getUser = () => {
        const token = JSON.stringify(localStorage.getItem("access-token"))
        const fromUserInfo: userInterface = jwtDecode(token)
        setUser(fromUserInfo)
    }

    return (
        <Chat setMessage={setMessage} sendMessage={sendMessage} chat={chat} HeaderName={'GROUP'} params={params} message={message} user={user} />
    )

}