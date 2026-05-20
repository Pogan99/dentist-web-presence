import { useClientConfig } from "@/lib/use-client-config";

export function Team() {
  const config = useClientConfig();

  return (
    <section id="team" className="w-full py-20" style={{ backgroundColor: "#fff" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center reveal">
          <h2 className="font-serif text-3xl md:text-4xl" style={{ color: "#1A1A1A" }}>
            Meet Your Dentists
          </h2>
          <p className="mt-3 text-base" style={{ color: "#6B7280" }}>
            Board-certified, Jacksonville-rooted, genuinely kind.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {config.team.map((member, i) => (
            <div
              key={member.name}
              className={`reveal reveal-delay-${i + 1} card-lift group w-full max-w-xs rounded-2xl bg-[#F8F6F1] p-6 text-center`}
            >
              <div className="img-zoom mx-auto mb-4 h-36 w-36 rounded-full overflow-hidden border-4" style={{ borderColor: "#1B4D5C" }}>
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-serif text-4xl text-white" style={{ backgroundColor: "#1B4D5C" }}>
                    {member.name[0]}
                  </div>
                )}
              </div>
              <h3 className="font-serif text-xl" style={{ color: "#1A1A1A" }}>
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest" style={{ color: "#C9963A" }}>
                {member.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
