import Image from "next/image"
import Button from "./components/Button"
import Link from "next/link"

export default function LandingPage() {
  return <div className="flex flex-col gap-4">
    <div className="flex px-8 mt-12 gap-4">
      <h1 className="text-4xl font-semibold">Skrach</h1>
      <Image src="/spite_lightning.svg" width={24} height={24} alt="" ></Image>
    </div>
    <div className="flex flex-col mx-8 gap-4">
      <div>
        <p className="text-2xl font-normal">Make your music project real.</p>
        <p className="text-2xl font-normal">Get ideas together.</p>
        <p className="text-2xl font-normal">Record it.</p>
      </div>
        <Link href="/login" ><Button text={'GET STARTED FOR FREE'} size="fit" type="primary" ></Button></Link>
        <Button text={'TALK TO US'} size="fit" type="secondary" ></Button>
    </div>
    <div className="flex flex-col px-8 gap-4">
      <h2 className="text-3xl font-semibold">How does it works</h2>
      <div className="flex justify-between">
        <ul className="text-2xl font-regular text-[var(--orange-300)]">
          <li>Recording</li>
          <li>Collaborating</li>
          <li>Equalizing</li>
          <li>Sharing</li>
        </ul>
        <Image src="/how-to-use.png" height={264} width={156} alt=""></Image>
      </div>
    </div>
    <div className="flex flex-col gap-4 bg-[var(--orange-300)] mx-8 p-4 rounded-xl">
      <p className="text-2xl font-semibold">Power your creativity</p>
      <div className="flex justify-between">
        <img src="https://picsum.photos/400/400?random=1" height={88} width={88} ></img>
        <img src="https://picsum.photos/400/400?random=2" height={88} width={88} ></img>
        <img src="https://picsum.photos/400/400?random=3" height={88} width={88} ></img>
      </div>
    </div>
  </div>
}