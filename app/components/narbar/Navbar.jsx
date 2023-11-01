import React from 'react';
import Container from "@/app/components/Container";
import Logo from "@/app/components/narbar/Logo";
import Search from "@/app/components/narbar/Search";
const Navbar = () => {
    return (
        <div className='fixed w-full bg-white z-10 shadow-sm'>
            <div
                className='
                    py-4
                    border-b-[1px]
                '
            >
                <Container>
                    <div className="
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                    ">

                    </div>
                    <Logo />
                    <Search />

                    Nav bar is coming
                </Container>

            </div>
        </div>
    );
};

export default Navbar;
