import { Sidebar } from "../sidebar/sidebar-component";

const Home = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center dark:bg-dark_bg_1 overflow-hidden">
            <div className="w-[1700px] h-full min-h-screen flex">
                <Sidebar></Sidebar>
            </div>

        </div>
    );
};

export default Home;