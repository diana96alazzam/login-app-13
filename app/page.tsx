import Link from "next/link";

/**
 * Home page component.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Quality Professionals Task</h1>
      <h2>Login Application</h2>
      <h3>Candidate: Diana Alazzam</h3>
      <Link href="/register">Register</Link>
      <Link href="/login">Login</Link>
    </main>
  );
}
