import { NavLink } from "react-router-dom";
function AppHeader() {
    const nav = [
        {
            path: "/",
            title: "Home Page"
        },
        {
            path: "/posts",
            title: "Ricette"
        }
        
        
    ];
    return (
        <header className="bg-light text-center">
        <ul>
            {nav.map((curItem) => (
                <li key={curItem.title}>
                    <NavLink to={curItem.path}> {curItem.title}</NavLink>
                </li>
            ))}
        </ul>
        </header>
    )
}
export default AppHeader;