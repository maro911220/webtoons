import Card from "./(components)/(home)/card";
import List from "./(components)/(home)/list";
import "@/style/pages/home.scss";
export default function Page() {
  // sample

  return (
    <>
      {/* hero && search */}
      <section className="home-hero">
        <div className="home-con">
          <Card url="/icon/logo_naver.png" title="Naver" />
          <Card url="/icon/logo_kakao.png" title="kakao" />
          <Card url="/icon/logo_kakao_page.png" title="Kakao Page" />
        </div>
      </section>
      {/* new card */}
      <section className="home-update">
        <div className="home-con">
          <List />
        </div>
      </section>
    </>
  );
}
