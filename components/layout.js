import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Aadil Achha';
export const siteTitle = 'Online Jobs'
export const slide = {
  h1:[
    "Very fast Online Job site!",
    "Very confidence by realtime managers",
    "Feel Free",
    "Best useful",
    "Best secure"
  ],
  p:[
    "Very fast Online Job site!",
    "Very confidence by realtime managers",
    "Feel Free",
    "Best useful",
    "Best secure"
  ]
}

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Job site for online freelancer"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" href="/">
              <Image
                priority
                src="/images/logo.png"
                className={utilStyles.borderCircle}
                height={50}
                width={144}
                alt={name}
              />
            </Link>
            <button className="navbar-toggler" type="button" id = "toggle-btn" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" href="/info/how-works/">How works</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/top-developers">Top Developers</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href = "#">Get ideas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href = "/info/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href = "info/contact-us">Contact Us</Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <ul className = "navbar-nav me-auto mb-2 md-md-0">
                <li className = "nav-item">
                  <Link className = "nav-link" href = "/login">Login</Link>
                </li>
                <li className = "nav-item">
                  <Link className = "nav-link" href = "/register">Sign Up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {/* <content className={styles.content}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </content> */}
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  )
}
