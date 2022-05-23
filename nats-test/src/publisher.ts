import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "abc", {
    url: "http://localhost:4222"
});

stan.on("connect", () => {
    const data = JSON.stringify({
        id :123
    });
    stan.publish("ticket:created", data, () => {
        
    })
});