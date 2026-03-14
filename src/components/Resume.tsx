import autoCV from "../assets/autoCV.pdf";

const Resume = () => {
  return (
    <section className="w-full min-h-[80vh] p-4 md:p-6">
      <div className="w-full h-[80vh] rounded-xl overflow-hidden border border-white/10 bg-black/20">
        <iframe src={autoCV} title="AutoCV" className="w-full h-full" />
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={autoCV}
            download="Vathsav_CV.pdf"
            className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
          >
            Download Resume
          </a>

          <a
            href={autoCV}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
          >
            Open in new tab
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
