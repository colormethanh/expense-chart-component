import{ ReactComponent as Logo } from './assets/images/logo.svg'

export default function Balance() {
  return (
    <div className="balance-cont">
      <div className="balance-txt">
        <span className="title-sm">My balance</span>
        <span className="title-lg">$921.48</span>
      </div>
      <div className="logo">
        <Logo />
      </div>
    </div>
  )
}
