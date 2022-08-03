import { Film } from "../../interfaces/film.interface";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import Header from "../../components/Header";
import FilmPlayer from "../../components/FilmPlayer";
import Skeleton from "../../components/Skeleton";
import { FilmsResponse } from "../../interfaces/films-response.interface";

type FilmDetailProps = {
  link: string;
};

export default function FilmDetail({ link }: FilmDetailProps) {
  const { data, error } = useSWR<FilmsResponse>(
    "/api/all?page=1&sortBy=latest&perPage=10000",
    fetcher
  );

  let filmDetail;
  if (data) {
    filmDetail = data.data.find((film) => film.link === link) as Film;
  }

  if (error) return <div>failed to load</div>;
  //if (!data) return <div>loading...</div>;

  return (
    <>
      <Header page="movie" />

      {(() => {
        if (!data) {
          return <Skeleton type="filmDetail" />;
        } else {
          return (
            <FilmPlayer key={filmDetail?.link} film={filmDetail as Film} />
          );
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
