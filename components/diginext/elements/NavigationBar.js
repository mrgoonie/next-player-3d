import Link from "next/link"

import css from "./NavigationBar.module.scss"
import Svg from "../image/Svg"
// console.log(css)

class NavigationBar extends React.Component {
  textArr = [
    "HOME",
    "POPULAR",
    "AR",
    "VR",
    "WEB",
    "MOBILE",
    "GAME",
    "CHATBOT",
    "AI/ML",
    "DIGITAL INSTALLATION",
    "LIVE STREAMING",
    "VIDEO",
    "RELAX",
  ]

  componentDidMount() {
    // const clipWidth = this.clip.clientWidth
    console.log(this.clip.clientWidth, this.clipContent.clientWidth)
  }

  render() {
    return (
      <div className={css.navbar}>
        <div className="container">
          <div
            className={css.clip}
            ref={(clip) => {
              this.clip = clip
            }}
          >
            <ul
              ref={(clipContent) => {
                this.clipContent = clipContent
              }}
            >
              {this.textArr.map((value, index) => {
                const activeClass = index == 0 ? "active" : ""
                return (
                  <li key={index} className={activeClass}>
                    {value}
                  </li>
                )
              })}
            </ul>
          </div>
          <span className={[css.arrow, css.arrowLeft].join(' ')}>
            {/* <ArrowLeft fill="#000" /> */}
            <Svg src="arrow_left" />
          </span>
          <span className={[css.arrow, css.arrowRight].join(' ')}>
            {/* <ArrowRight fill="#000" /> */}
            <Svg src="arrow_right" />
          </span>
        </div>
      </div>
    )
  }
}

export default NavigationBar
