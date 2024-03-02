import Image from "next/image";
import {UserButton} from '@clerk/nextjs'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <div className="flex lg:flex-row flex-col">
        <div className="flex flex-col p-10 space-y-3">
          <h1 className="sm:text-5xl text-4xl font-semibold sm:mb-5">
            Welcome to Dropbox 2.0
            <br />
            <span className="text-4xl font-light">Storing everything that you and your business needs.</span>
          </h1>
          <p className="pb-20">
            Enhance your personal and professional by using Dropbox, offering a simple and efficient way to upload, organize and access files from anywhere
          </p>

          <Link href={'/dashboard'} className="flex">
            <Button className="">
              Get started
              <ArrowRight className=" hover:translate-x-1 transition-all delay-100" />
            </Button>
          </Link>
        </div>

        <div className="">
          {/* Video section */}
          <video src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4" autoPlay loop muted className="rounded-xl" />
        </div>

      </div>

      <p className="text-center font-bold pt-5 text-xl">Disclaimer</p>
      <p className="text-center font-light p-2">
        This project is a clone and is intended only for practional usage. It is solely developed with the purpose of practice and implementing real-world capabilities of the actual application. 
        <br /> <br />
        <span className="text-gray-400">
          Looking for a developer for yourself or your brand? <Link href={'https://www.linkedin.com/in/parvs9577/'} className="dark:hover:text-white hover:text-blue-700"> Let's connect and discuss today! </Link>
        </span>
      </p>
    </main>
  );
}
