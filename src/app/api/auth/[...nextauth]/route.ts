import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { OAuthConfig } from "next-auth/providers/oauth";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    {
      id: "oracle-hyperion",
      name: "Oracle Hyperion",
      type: "oauth",
      version: "2.0",

      authorization: {
        url: "https://idcs-5e4e9268c130470ebe37c7569a765801.identity.oraclecloud.com/oauth2/v1/authorize",
        params: {
          scope: "openid profile email",
          response_type: "code",
        },
      },
      token: {
        url: "https://idcs-6ff67d7de76c4581a1523ec7839428b4.identity.oraclecloud.com/oauth2/v1/token",
      },
      userinfo: {
        url: "https://idcs-6ff67d7de76c4581a1523ec7839428b4.identity.oraclecloud.com/oauth2/v1/userinfo",
      },
      clientId: process.env.ORACLE_HYPERION_CLIENT_ID || "",
      clientSecret: process.env.ORACLE_HYPERION_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.sub, // Ensure this matches the field from the userinfo response
          name: profile.name || profile.username,
          email: profile.email,
          image: profile.picture, // Optional
        };
      },
    } as OAuthConfig<any>, // Specify the type explicitly to match NextAuth typing
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    newUser: "/auth/signup", // Optional: Custom sign-up page for new users
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // async session({ session, token }) {
    //   session.accessToken = token.accessToken;
    //   return session;
    // },
  },
});

export { handler as GET, handler as POST };
