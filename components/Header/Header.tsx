'use client';

import React from "react";

interface HeaderProps {
    text : string
}

const Header : React.FC<HeaderProps> = ({
    text
}) => {
    return (
        <div className="
                w-full
                p-4
                font-normal
                text-3xl
            "
        >
            {text}
        </div>
    );
}

export default Header;