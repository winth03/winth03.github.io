"use client";

import { sendMessage, testConnection } from "@/utils/extensions";
import { useEffect, useState } from "react";

export default function MessagePage() {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            if (event.data.type !== "VTT_RESPONSE") return;

            setStatus(true);
        }

        window.addEventListener('message', handleMessage);

        const intervalId = setInterval(testConnection, 5000);

        return () => {
            window.removeEventListener('message', handleMessage);
            clearInterval(intervalId);
        };
    }, []);

    async function send(data: FormData) {
        const message = data.get("message") as string;

        sendMessage(message);
    }

    return (
        <div>
            <h1>Message</h1>
            <div>
                <p>Status: {status ? "Connected" : "Disconnected"}</p>
            </div>
            <form action={send} className="space-y-2">
                <input type="text" id="message" name="message" placeholder="Enter your message" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}