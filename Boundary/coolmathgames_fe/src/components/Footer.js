
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsInstagram, BsEnvelope, BsWhatsapp, BsQuote } from "react-icons/bs";
import { Link } from "react-router-dom";


export default function Component() {
  return (
    <Footer className="bg-black rounded-none">
      <div className="w-full">
        {/* padding */}
        <div className='pt-5'></div>

        <div className="flex justify-center sm:flex sm:justify-between md:flex-col md:grid-cols-1">
          <div className="grid sm:grid-cols-2 sm:gap-8 mt-4 lg:grid-cols-3 lg:gap-6">
            {/* Contact us */}
            <div className="text-center">
              <Footer.Title title="Contact Us" className="text-white" />
              <Footer.LinkGroup className="flex justify-center gap-5">
                <Footer.Icon href="#" icon={BsEnvelope} className="text-white" />
                <Footer.Icon href="#" icon={BsWhatsapp} className="text-white" />
              </Footer.LinkGroup>
            </div>

            <div className="text-center">
              {/* LOGO */}
              <div className="text-4xl pb-20 text-white">
                <Link to="/">
                  <h1 style={{ fontFamily: 'limelight' }}>MICASA</h1>
                </Link>
                {/* Quote icon and text */}
                <div className="flex justify-center gap-2">
                  <BsQuote className="text-white" />
                  <p className="text-base text-white pt-6">Your home, your rules</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Footer.Title title="Follow us" className="text-white" />
              <Footer.LinkGroup className="flex justify-center gap-5">
                <Footer.Icon href="#" icon={BsInstagram} className="text-white" />
                <Footer.Icon href="#" icon={BsFacebook} className="text-white" />
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
}
