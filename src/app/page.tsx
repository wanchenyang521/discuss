// app/page.tsx
import SingButton from "@/component/sing-button";
import UserAvatar from "@/component/UserAvatar";
import SignoutButton from "@/component/signout-button";

export default function Page() {
    return (
        <div>
            <SingButton />
            <UserAvatar></UserAvatar>
            <SignoutButton></SignoutButton>
        </div>
    )
}
