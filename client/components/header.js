import Link from "next/link";

const header = ({currentUser}) => {
    const links = [
        !currentUser && {
            label: "Sign Up", href: "/auth/signup"
        },
        !currentUser && {
            label: "Sign In", href: "/auth/signin"
        },
        currentUser && {
            label: "Sign Out", href: "/auth/signout"
        }
    ]
        .filter(linkConifg => linkConifg)
        .map(({label, href}) => {
            return <li key={href}>
                <Link href={href}>
                    <a className="nav-link">{label}</a>
                </Link>
            </li>
        });
    return (<nav className="navbar navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand">GitTix</a>
            </Link>
            <div className="d-flex justify-content-end">
                <ul className="nev d-flex- aling-items-center">
                    {links}
                </ul>
            </div>
        </nav>);
}

export default header;