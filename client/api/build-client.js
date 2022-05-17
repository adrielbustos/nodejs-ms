import axios from "axios";

const buildClient = ({req}) => {
    if (typeof window === "undefined") {
        // on the server
        return axios.create({
            baseURL: "http://localhost:3001/", // this is for kubernetetes
            // baseURL: "http://localhost:3001/", // this is for kubernetetes
            // baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local", // this is for kubernetetes
            headers: req.headers
        });
    } else {
        // on the browser
        return axios.create({
            baseURL: "http://localhost:3001/"
        });
    }
}

export default buildClient;