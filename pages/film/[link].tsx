import { Film } from "../../interfaces/film.interface";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import Header from "../../components/Header";
import FilmPlayer from "../../components/FilmPlayer";
import Skeleton from "../../components/Skeleton";
import { FilmsResponse } from "../../interfaces/films-response.interface";
import FilmCard from "../../components/FilmCard";
import homeStyles from "../../styles/Home.module.scss";
import Footer from "../../components/Footer";

type FilmDetailProps = {
  link: string;
};

export default function FilmDetail({ link }: FilmDetailProps) {
  const { data, error } = useSWR<FilmsResponse>(
    "/api/all?page=1&sortBy=latest&perPage=10000",
    fetcher
  );

  let filmDetail;
  let randomFilms;
  if (data) {
    filmDetail = data.data.find((film) => film.link === link) as Film;

    const copyFilms = [...data.data];
    const shuffled = copyFilms.sort(() => 0.5 - Math.random());
    randomFilms = shuffled.slice(0, 9);
  }

  if (error) return <div>failed to load</div>;
  //if (!data) return <div>loading...</div>;

  return (
    <>
      <Header page="movie" />

      {(() => {
        if (!data) {
          return (
            <>
              <Skeleton type="filmDetail" />
              {[...Array(60)].map((x, i) => (
                <Skeleton key={i} type="listPage" />
              ))}
            </>
          );
        } else {
          return (
            <>
              <FilmPlayer key={filmDetail?.link} film={filmDetail as Film} />
              <div className={homeStyles.container}>
                <div className={homeStyles.sectionTitle}>
                  <span>Rastgele Filmler</span>
                  <span className={homeStyles.right}></span>
                </div>

                <div className={homeStyles.filmCardContainer}>
                  {randomFilms?.map((film) => (
                    <FilmCard key={film.link} film={film} />
                  ))}
                </div>
              </div>
            </>
          );
        }
      })()}

      <Footer />
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
