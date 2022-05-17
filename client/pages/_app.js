import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({Component, pageProps, currentUser}) => {
    console.log("currentUser ", currentUser);
    return <div>
        <Header currentUser={currentUser}/>
        <Component {...pageProps}/>
    </div>
};

AppComponent.getInitialProps = async (appContext) => {
    const { data } = buildClient(appContext.ctx).get("/api/users/currentuser");
    // console.log("data ", data);
    // console.log("appContext.ctx ", appContext.ctx);
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {
        pageProps,
        ...data
    };
}

export default AppComponent;