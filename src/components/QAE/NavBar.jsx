export default function NavBar() {

    return (
        <>
            <div className="flex items-center justify-between bg-white text-black text-3xl border-2 border-solid">
                <div>
                    <a href="/">
                        <img className="h-5 w-auto" src="src/FooterLogo.png" alt="Logo"/>
                    </a>
                </div>
                <div className="flex items-center space-x-10  p-5">
                    <a className="text-gray-700" href="/">
                        Dashboard
                    </a>
                    <a className="text-gray-700" href="/">
                        Submissions
                    </a>
                    <a className="text-white border-y-15 border-x-15 rounded-lg bg-blue-500" href="/">
                        Help Desk
                    </a>
                    <a className="text-gray-700" href="/">
                        Link 4
                    </a>
                </div>
            </div>
        </>
    )
}

