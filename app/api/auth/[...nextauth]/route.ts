import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID ?? "",
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? "",
            tenantId: process.env.AZURE_AD_TENANT_ID ?? "",
        })
    ],
    debug: true,
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account?.access_token) {
                token.accessToken = account.access_token;
                token.name = profile?.name;
                token.email = profile?.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string | undefined;
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


