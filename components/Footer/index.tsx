export default function Footer() {
  return (
    <>
      <div className="mx-auto max-w-screen-lg px-3 py-6">
        <div className="border-t border-gray-600 pt-5 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <div className="text-sm text-gray-200">
            Creado con ♥ por{" "}
            <a
              className="text-blue-650 hover:underline"
              href="https://www.nicotomasin.com.ar"
              target="_blank"
              rel="canonical"
            >
              Nico Tomasin.
            </a>
          </div>
          <div>
            <a
              href="mailto:hola@nicotomasin.com.ar?subject=Trabajo&body=Hola!%20me%20intereso%20tu%20trabajo"
              target="_blank"
            >
              <button className="bg-gradient-to-br from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-bold py-1 px-2 rounded text-sm">
                Enviar Mail
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
