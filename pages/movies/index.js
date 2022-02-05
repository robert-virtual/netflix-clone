import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Movie from "../../components/movie";

export default function Movies({ movies = [] }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [random] = useState(() => Math.round(Math.random() * movies.length));
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
    console.log(movies);
  }, [session]);
  return (
    <div className="flex flex-col  justify-center  min-h-screen bg-black ">
      <Head>
        <title>Netflix Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="sticky top-0 right-0 p-4 w-full flex justify-between items-center text-white bg-black">
        <span className="text-4xl text-red-600">Netflix</span>
        {session && (
          <div className="text-2xl">
            <span>{session.user.name}</span>
            <button onClick={signOut} className="ml-2 bg-red-600 p-2 w-[100px]">
              Salir
            </button>
          </div>
        )}
      </nav>
      <header
        className="flex flex-col justify-center text-white h-[70vh] p-2"
        style={{
          backgroundImage: `url(${movies[random].url})`,
          backgroundSize: "cover",
        }}
      >
        <div className="title">
          <h1 className="text-4xl">{movies[random].caption}</h1>
        </div>
        <div className="btns flex">
          <button className=" hover:bg-black hover:text-white text-2xl flex items-center  bg-white text-black p-2 rounded-sm  font-bold m-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            <span>Reproducir</span>
          </button>
          <button className="hover:text-black hover:bg-white text-2xl  rounded-sm flex items-center m-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Mas Informacion</span>
          </button>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full px-20 text-center ">
        <div className="grid grid-cols-3 gap-5">
          {movies.map((m) => (
            <Movie movie={m} key={m.id} />
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://imdb8.p.rapidapi.com/title/get-images?tconst=tt0944947&limit=25",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "6a2debca1amsh068eaeb09d91275p14e9f5jsn04575bc5692d",
      },
    }
  );
  const data = await res.json();
  return {
    props: {
      movies: data.images,
    },
  };
}
