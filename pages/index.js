import Layout, { slide } from '../components/layout'
import { siteTitle } from '../components/layout';
import Head from "next/head";
import { getSortedPostsData } from '../lib/posts'
import Carousel from '../components/carousel'
import NeedSomething from '../components/needSomething'
import NewProducts from '../components/newProducts'
import TopDev from '../components/topDev'

export default function Home({ newProducts,topDevelopers }) {
  return (
    <Layout home>
      <Head>
          <title>
              {siteTitle}
          </title>
      </Head>
      <Carousel slide={slide}></Carousel>
      <NeedSomething />
      <NewProducts newProducts = {newProducts} />
      <TopDev topDev = {topDevelopers} />
      {/* <div className={utilStyles.topDev}>
        <p>Hi Every one. I am Aadil Achha. I am a Full Stack developer. You can find me from this address. https://linkdin.com/manstar03/</p>
      </div>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href = {`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString = {date} />
              </small>
              {date}
            </li>
          ))}
        </ul>
      </section> */}
    </Layout>
  )
}

export async function getStaticProps() {
  const newProducts = getSortedPostsData();
  return {
    props:{
      "id":123
    }
  }
  console.log(newProducts);
  // const topDevelopers = getTopDevelopers();
  const topDevelopers = [];
  return {
    props: {
      newProducts,
      topDevelopers,
    }
  }
}

// export async function getServerSideProps(context){
//   let res = await fetch("http://localhost:3000/api/posts",{
//     method: "GET",
//     headers:{
//       "Content-Type":"application/json",
//     }
//   });
//   const allPostsData = await res.json();
//   return {
//     props:{
//       allPostsData
//     }
//   };
// }