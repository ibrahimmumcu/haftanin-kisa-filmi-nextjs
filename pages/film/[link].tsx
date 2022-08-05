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

export default function FilmDetail({ film }: any) {
  return (
    <>
      <Header page="movie" />

      {(() => {
        if (!film) {
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
              <FilmPlayer key={film?.link} film={film as Film} />
              <div className={homeStyles.container}>
                <div className={homeStyles.sectionTitle}>
                  <span>Rastgele Filmler</span>
                  <span className={homeStyles.right}></span>
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

export async function getStaticProps({ params }: any) {
  const link = params.link;
  const results = await fetch(`http://localhost:3000/api/film/${link}`).then(
    (res) => res.json()
  );

  return {
    props: {
      film: results,
    },
  };
}

export async function getStaticPaths() {
  const data = await fetch(
    "http://localhost:3000/api/all?page=1&sortBy=latest&perPage=10000"
  ).then((res) => res.json());
  const films = data.data;
  return {
    paths: films.map((film: Film) => {
      const link = film.link;
      return {
        params: {
          link,
        },
      };
    }),
    fallback: false,
  };
}
