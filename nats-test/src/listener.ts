import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
    url: "http://localhost:4222"
});

stan.on("connect", () => {
    const data = JSON.stringify({
        id :123
    });
    const subscription = stan.subscribe("ticket:created");

    subscription.on("message", (msg:Message) => {
        const data = msg.getData();
        if(typeof data === "string") {
            console.log("event "+msg.getSequence()+" wiht data: "+data);
        }
    });
});