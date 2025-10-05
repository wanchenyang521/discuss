import { auth } from "../auth"
import {Image} from "@heroui/image";

export default async function UserAvatar() {
    const session = await auth()

    if (!session?.user) return null


    return (
        <div>
            <div>{JSON.stringify(session)}</div>
            <Image src={session.user.image || ''} alt="User Avatar" />
        </div>
    )
}