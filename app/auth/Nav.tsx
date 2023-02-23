import Link from "next/link";
import Login from "./Login";
import { getServerSession } from 'next-auth';
import {authOptions} from '../../pages/api/auth/[...nextauth]';
import Loggerd from "./Loggerd";
export default async function Nav(){
  const session = await getServerSession(authOptions);
  return(
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-bold text-lg">Send it.</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user ? (
          <Login />
        ) : (
          <Loggerd image={session?.user?.image || ""} />
        )}
      </ul>
    </nav>
  )
}