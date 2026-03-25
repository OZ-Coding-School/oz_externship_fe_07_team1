import Logo from '../../assets/images/logo-white.png'
import KakaoIcon from '../../assets/icons/kakao.svg?react'
import BlogIcon from '../../assets/icons/blog.svg?react'
import YoutubeIcon from '../../assets/icons/youtube.svg?react'
import InstagramIcon from '../../assets/icons/instagram.svg?react'

function Footer() {
  return (
    <footer className="text-gray-250 w-full bg-gray-800 px-90 py-20">
      <section className="border-b border-gray-500 pb-10">
        <div className="mb-10">
          <img src={Logo} alt="logo" />
        </div>
        <ul className="flex flex-col gap-6 text-lg">
          <li>초격차캠프</li>
          <li>사업개발캠프</li>
          <li>프로덕트 디자이너 캠프</li>
        </ul>
      </section>
      <section className="mt-10 flex justify-between">
        <div>
          <ul className="flex gap-7 text-base underline">
            <li>개인정보처리방침</li>
            <li>이용약관</li>
            <li>멘토링&강사지원</li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-3">
            <li>
              <KakaoIcon />
            </li>
            <li>
              <BlogIcon />
            </li>
            <li>
              <YoutubeIcon />
            </li>
            <li>
              <InstagramIcon />
            </li>
          </ul>
        </div>
      </section>
      <address className="mt-10 text-base leading-[140%] font-normal tracking-[-0.03em] text-gray-400 not-italic">
        <p>
          대표자 : 이한별 | 사업자 등록번호 : 540-86-00384 | 통신판매업 신고번호
          : 2020-경기김포-3725호
        </p>
        <p>
          주소 : 경기도 김포시 사우중로 87 201호 | 이메일 :
          <a href="mailto:kdigital@nextrunners.co.kr">
            kdigital@nextrunners.co.kr
          </a>
          {' | '}전화 :
          <a href="tel:07040998219" className="ml-1">
            070-4099-8219
          </a>
        </p>
      </address>
    </footer>
  )
}

export default Footer
