"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";




export default function Home() {
  const { data: session } = useSession();

  const [environments, setEnvironments] = useState([]);

  async function fetchEnvironments() {
    const response = await fetch("/api/github");
    const data = await response.json();
    setEnvironments(data.contents)
  }

  useEffect(() => {
    if(session) {
      fetchEnvironments();
    }
  }, [session])

  return (
    <div>
      {session ? (
         <>
          <p>Welcome { session.user?.name }</p>
          <p>email { session.user?.email }</p>

          { environments.map((environment) => (
            <p key={environment}>{environment}</p>
          ))}

          <button onClick={() => signOut()}>
            Logout
          </button>
        </>
      ) : (
        <button 
          onClick={() => signIn("azure-ad")} 
          className="button bg-green-600 w-25 p-2 rounded text-white"
        >
          Login 
        </button>
      )}
    </div>
  );
}