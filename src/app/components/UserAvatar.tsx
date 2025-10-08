import { auth } from "../../auth"

export default async function UserAvatar() {
    const session = await auth()

    if (!session?.user) return null

    return (
        <div>
            {session ? <div>
                {JSON.stringify(session)}
                <img src={session!.user!.image} alt="User Avatar" />
            </div> : null}
        </div>
    )
}