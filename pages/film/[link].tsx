import { Film } from "../../interfaces/film.interface";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import Header from "../../components/Header";
import FilmPlayer from "../../components/FilmPlayer";

type FilmDetailProps = {
  link: string;
};

export default function FilmDetail({ link }: FilmDetailProps) {
  const { data, error } = useSWR("/api/film/" + link, fetcher) as {
    data: Film;
    error: any;
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Header page="movie" />
      <FilmPlayer key={data.link} film={data} />
      {data.title}
    </>
  );
}

export async function getServerSideProps({ params }: any) {
  return {
    props: {
      link: params.link,
    },
  };
}
