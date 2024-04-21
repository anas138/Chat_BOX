"use client"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import { userInterface, chatInterface, dynamicRouteIsInterface } from "@/app/interface/interface";
import axios from "axios";
import io from "socket.io-client";
import Chat from "@/app/componenets/chat/chat";
import { socketOn, socketDisconnect, socketEmit } from "@/app/requests/handleSocckets";


export default function chat({ params }: { params: dynamicRouteIsInterface }): JSX.Element {
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState<chatInterface[]>([])
    const [user, setUser] = useState<userInterface>()
    const [typing, setTyping] = useState(null)
    useEffect(() => {
        getToUser()
        getChat()

        socketOn("message", () => getChat())

        socketOn("show-typing", (data: any) => setTyping(data))


        return () => {
            socketDisconnect(); // Disconnect from the Socket.IO server when the component unmounts
        };

    }, [])

    const getToUser = async () => {
        const token = JSON.stringify(localStorage.getItem("access-token"))
        const user = await axios.get(`http://localhost:3001/user-login/${params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setUser(user.data)
    }
    const getChat = async () => {
        const token = JSON.stringify(localStorage.getItem("access-token"))
        const chat = await axios.get(`http://localhost:3001/chat/user/${params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setChat(chat.data)
    }

    const sendMessage = async () => {
        const token = JSON.stringify(localStorage.getItem("access-token"))
        const fromUserInfo: userInterface = jwtDecode(token)
        const payload = {
            to_user: params.id,
            from_user: fromUserInfo.id,
            message: message,
            message_type: "PRIVATE",

        }
        try {
            await axios.post("http://localhost:3001/chat", { ...payload }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            // handle sockets
            socketEmit("chat", { data: payload })
            setMessage("")
            getChat()
        }
        catch (error) {
            console.log(error)
        }

    }
    return (
        <Chat setMessage={setMessage} sendMessage={sendMessage} chat={chat} params={params} message={message} typing={typing} toUser={user} />
    )

}