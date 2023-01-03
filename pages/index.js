import Head from 'next/head'
import Image from 'next/image'
import Layout, { slide } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from "next/link"
import Date from '../components/date'
import Carousel from '../components/carousel'
import NeedSomething from '../components/needSomething'
import NewProducts from '../components/newProducts'
import TopDev from '../components/topDev'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Carousel slide={slide}></Carousel>
      <NeedSomething />
      <NewProducts />
      <TopDev />
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
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
