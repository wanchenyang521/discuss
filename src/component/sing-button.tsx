import React from 'react';
import {signIn} from "@/auth";

const SingButton = () => {
    return (
        <div>
            <form
                action={async () => {
                    "use server"
                    await signIn("github")
                }}
            >
                <button type="submit">Signin with GitHub</button>
            </form>
        </div>
    );
};

export default SingButton;