import { Film } from "../../interfaces/film.interface";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import Header from "../../components/Header";
import FilmPlayer from "../../components/FilmPlayer";
import Skeleton from "../../components/Skeleton";

type FilmDetailProps = {
  link: string;
};

export default function FilmDetail({ link }: FilmDetailProps) {
  const { data, error } = useSWR<Film>("/api/film/" + link, fetcher);

  if (error) return <div>failed to load</div>;
  //if (!data) return <div>loading...</div>;

  return (
    <>
      <Header page="movie" />

      {(() => {
        if (!data) {
          return <Skeleton type="filmDetail" />;
        } else {
          return <FilmPlayer key={data.link} film={data} />;
        }
      })()}
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
