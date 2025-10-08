
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { prisma } from "@/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({ user, account }) {
            if (!user.email) return false

            // 创建或更新用户到数据库
            await prisma.user.upsert({
                where: { email: user.email },
                update: {
                    name: user.name,
                    image: user.image,
                },
                create: {
                    email: user.email,
                    name: user.name,
                    image: user.image,
                },
            })

            // 保存 Account 信息
            if (account) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email }
                })

                if (dbUser) {
                    await prisma.account.upsert({
                        where: {
                            provider_providerAccountId: {
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                            }
                        },
                        update: {
                            access_token: account.access_token,
                            refresh_token: account.refresh_token,
                            expires_at: account.expires_at,
                            token_type: account.token_type,
                            scope: account.scope,
                            id_token: account.id_token,
                        },
                        create: {
                            userId: dbUser.id,
                            type: account.type,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            access_token: account.access_token,
                            refresh_token: account.refresh_token,
                            expires_at: account.expires_at,
                            token_type: account.token_type,
                            scope: account.scope,
                            id_token: account.id_token,
                        },
                    })
                }
            }

            return true
        },
        async jwt({ token, user }) {
            if (user?.email) {
                // 在登录时从数据库获取用户ID
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email }
                })
                if (dbUser) {
                    token.id = dbUser.id
                }
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        },
    },
})