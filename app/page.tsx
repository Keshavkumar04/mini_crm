import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const { fullName } = clerkUser;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f9",
      }}
    >
      <h1 style={{ color: "#4CAF50", fontSize: "3rem", marginBottom: "20px" }}>
        Welcome {fullName}
      </h1>
      <ul style={{ listStyleType: "none", padding: 0, textAlign: "center" }}>
        <li style={{ margin: "10px 0" }}>
          <Link
            href="/customers"
            style={{
              color: "#1976D2",
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
          >
            Add Customers
          </Link>
        </li>
        <li style={{ margin: "10px 0" }}>
          <Link
            href="/orders"
            style={{
              color: "#1976D2",
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
          >
            Add Orders
          </Link>
        </li>
        <li style={{ margin: "10px 0" }}>
          <Link
            href="/audience"
            style={{
              color: "#1976D2",
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
          >
            Create Audience
          </Link>
        </li>
        <li style={{ margin: "10px 0" }}>
          <Link
            href="/campaigns"
            style={{
              color: "#1976D2",
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
          >
            View Campaign History
          </Link>
        </li>
        <li style={{ margin: "10px 0" }}>
          <Link
            href="/sendMessage"
            style={{
              color: "#1976D2",
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
          >
            Send Messages
          </Link>
        </li>
      </ul>
      <div style={{ marginTop: "20px" }}>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
