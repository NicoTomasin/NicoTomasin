import { FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="container">
        <div className="gif">
          <img
            src="https://i.giphy.com/media/AspxmCZmV8kEG2VS8M/giphy.webp"
            alt="gif_ing"
          />
        </div>
        <div className="content">
          <h1 className="main-heading">This site is under construction</h1>
          <p>...maybe you would like to visit my socials:</p>
          <div className="flex justify-center items-center p-2">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex justify-center">
                <a
                  href="https://www.linkedin.com/in/nicotomasin/"
                  target="blank"
                >
                  <button>
                    <FaLinkedinIn />
                  </button>
                </a>
              </div>
              <div className="flex justify-center">
                <a href="https://www.github.com/NicoTomasin" target="blank">
                  <button className="bg-slate-500">
                    <FaGithub />
                  </button>
                </a>
              </div>
              <div className="flex justify-center">
                <a href="https://twitter.com/NicolasTomasin" target="blank">
                  <button className="bg-cyan-400">
                    <FaTwitter />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
