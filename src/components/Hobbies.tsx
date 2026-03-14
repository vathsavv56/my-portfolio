const Hobbies = () => {
  return (
    <div>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-white/20"></span>
            Hobbies
          </h2>

          <div className="flex flex-wrap gap-3">
            {[
              "Reading random books",
              "Watching Anime",
              "Exploring Dev Tools",
              "Learning New Technologies",
              "Reading Computer Science",
              "Building Side Tools",
            ].map((hobby, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-md border border-white/10 bg-white/5 hover:cursor-pointer"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hobbies;
