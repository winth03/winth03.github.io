"use client";

export function testConnection() {
    const testMessage = {
        type: 'TEST_CONNECTION',
        data: { test: true }
    };

    window.postMessage(testMessage, '*');
}

export function sendMessage(message: string) {
    window.postMessage({ type: "SEND_MESSAGE", message: message }, "*");
    console.log("Message sent");
}