
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsInstagram, BsEnvelope, BsWhatsapp, BsQuote } from "react-icons/bs";
import { Link } from "react-router-dom";


export default function Component() {
  return (
    // Change footer colour to black
    <Footer className="bg-black rounded-none">
      <div className="w-full">
        <div className="grid justify-between sm:flex sm:justify-between md:flex-col md:grid-cols-1">
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div >
              <Footer.Title title="Contact Us" className="text-white"/>
              <Footer.LinkGroup className="flex justify-center gap-10">
                <Footer.Icon href="#" icon={BsEnvelope} className="text-white"/>
                <Footer.Icon href="#" icon={BsWhatsapp} className="text-white"/>
              </Footer.LinkGroup>
            </div>
            <div>
                {/* LOGO */}
                <div className="text-4xl font-bold pb-20 text-white">
                    <Link to="/">
                        <h1 style={{ fontFamily: 'limelight'}}>MICASA</h1>
                    </Link>
                    {/* Quote icon and text */}
                    <div className="flex justify-center gap-2">
                        <BsQuote className="text-white"/>
                        <p className="text-xl text-white pt-6" style={{ fontFamily: 'didact gothic' }}>Your home, your rules</p>
                    </div>
                </div>
            </div>
            <div>
              <Footer.Title title="Follow us" className="text-white"/>
              <Footer.LinkGroup className="flex justify-center gap-10">
                <Footer.Icon href="#" icon={BsInstagram} className="text-white"/>
                <Footer.Icon href="#" icon={BsFacebook} className="text-white"/>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        {/* <Footer.Divider /> */}
        {/* <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Flowbite™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div> */}
      </div>
    </Footer>
  );
}
