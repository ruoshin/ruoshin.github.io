import * as React from 'react'
import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { StaticImage } from 'gatsby-plugin-image'
// import Spline from '@splinetool/react-spline';
import '../styles/index.sass'
import { Helmet } from "react-helmet"

gsap.registerPlugin(ScrollTrigger);

const RuoshinWang = () => {

  const boxRef = React.useRef();

  React.useEffect(() => {
    gsap.to(boxRef.current, {
      rotation: -360,
      scrollTrigger: {
        trigger: '.description',
        scrub: true
      }
    });
  });

  return (
    <main className='index'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ruoshin wang</title>
        <link rel="canonical" href="http://ruoshin.wang" />
      </Helmet>
      <h1>
        <StaticImage src="../images/logo.svg" width="100" quality="100" alt="logo" />
        ruoshin.wang
      </h1>
      {/*<Spline scene="https://draft.spline.design/H3WvaSqqFaNr8OTR/scene.spline" />*/}
      <StaticImage src="../images/paper-lotus.png" quality="100" alt="logo" />
      <div className='description' ref={boxRef}>哈囉，我是一位前端工程師，重視設計與功能易用性，希望可以為使用者打造良好體驗的產品。曾經有過後端工程師與網站設計的經驗，可以減少在跨部門間溝通上的誤差。這是我一個簡單的作品展示！</div>
      <div className='projects'>
        <div className='title'>
          <StaticImage src="../images/project.svg" quality="100" alt="projects" />
        </div>
        <div className='project'>
          <div className='title'>
            <StaticImage src="../images/logo-smg.svg" quality="100" alt="logo" />
          </div>
          <p>與一名設計師共同開發的 project，目前正在 prototype 的製作與討論階段。這是一個用 React 開發的 web app，目前先使用 Sass 快速地製作出版型與樣式，可以用來更精確地檢視流程，在這個過程中也會整理出各個 component 的規範。預計之後會換成 Next.js 的框架，並且依照 design system 來開發。</p>
        </div>
      </div>
    </main>
  )
}

export default RuoshinWang
