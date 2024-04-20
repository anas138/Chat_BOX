"use client"
import { ChangeEvent, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import { userInterface, chatInterface, dynamicRouteIsInterface } from "@/app/interface/interface";
import axios from "axios";
import Header from "@/app/componenets/headers/chatHeader";
import io from "socket.io-client";
import Chat from "@/app/componenets/chat/chat";
export default function chat({ params }: { params: dynamicRouteIsInterface }): JSX.Element {
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState<chatInterface[]>([])
    const [user, setUser] = useState<userInterface>()
    const [socket, setSocket] = useState<any>(null)
    useEffect(() => {
        getToUser()
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
        console.log(fromUserInfo, "info")
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
            socket.emit("chat", { data: payload })
            setMessage("")
            getChat()
        }
        catch (error) {
            console.log(error)
        }

    }


    return (
        <Chat setMessage={setMessage} sendMessage={sendMessage} chat={chat} HeaderName={user?.username} params={params} message={message} />
    )

}