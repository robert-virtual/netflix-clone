import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  // useEffect(() => {
  //   if (session) {
  //     router.push("/movies");
  //   }
  // }, []);

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0,60%), rgba(0, 0, 0, 60%)), url(/header.jpg)",
      }}
      className="flex flex-col  justify-center  min-h-screen "
    >
      <Head>
        <title>Netflix Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full px-20 text-center ">
        {!session ? (
          <>
            <h1 className="text-5xl font-bold max-w-lg text-white">
              Peliculas ilimitadas, shows de tv y mas
            </h1>
            <h2 className="text-2xl mt-4 mb-8 text-white">
              Mira en cualquier lugar. Cancela en cualquier momento
            </h2>
            <p className="text-white">
              listo para mirar? ingrese su correo para crear su membrecia
            </p>
            <div className="flex my-4">
              <input
                type="text"
                className="text-gray-600 p-4 text-lg min-w-[500px]"
                placeholder="Correo Electronico"
              />
              <button
                onClick={() => signIn()}
                className="flex items-center bg-[#e50914] text-lg py-4 px-8 text-white"
              >
                <span>Iniciar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => router.push("/movies")}
            className="flex items-center bg-[#e50914] text-lg py-4 px-8 text-white"
          >
            <span>
              <img
                className="w-10 inline mr-4"
                src={session.user.image}
                alt=""
              />
              {session.user.name}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </main>
    </div>
  );
}
