"use client"
import { ChangeEvent, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import { userInterface, chatPropsInterface } from "@/app/interface/interface";
import Header from "@/app/componenets/headers/chatHeader";
import { socketEmit } from "@/app/requests/handleSocckets";

export default function Chat(props: chatPropsInterface): JSX.Element {
    const { setMessage, sendMessage, chat, params, message, user, typing, toUser, } = props

    const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
        const token = JSON.stringify(localStorage.getItem("access-token"))
        const fromUserInfo: userInterface = jwtDecode(token)
        if (e.target.value === "") {
            socketEmit("typing", { fromUserInfo: fromUserInfo, typing: "" })

        } else {
            socketEmit("typing", { fromUserInfo: fromUserInfo, typing: "Typing..." })

        }

    }
    return (
        <div className="w-full max-w-lg mx-auto h-screen bg-white shadow-md rounded-lg overflow-hidden relative">
            <Header user={toUser} typing={typing} />
            <div className="px-4 py-6">
                <div className="space-y-4">
                    {chat?.map((message) => (
                        <>
                            {(message.to_user === +params.id || message.created_by === user?.id) ?
                                <div key={message.id} className="flex justify-end">
                                    <div className="bg-blue-200 rounded-lg p-2">
                                        {message.message}
                                    </div>
                                </div> :
                                <div key={message.id} className="flex justify-start">
                                    <div className="bg-gray-200 rounded-lg p-2">
                                        {message.message}
                                    </div>
                                </div>
                            }

                        </>
                    ))}
                </div>
            </div>

            <div className="bg-gray-100 absolute bottom-0 w-full max-w-lg mx-auto">
                <div className="flex items-center">
                    <input
                        type="text"
                        className="flex-1 appearance-none border rounded py-2 px-3 mr-2 bg-gray-200 focus:outline-none focus:bg-white"
                        placeholder="Type a message..."
                        value={message}
                        onChange={handleMessage}
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}