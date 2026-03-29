import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-8 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          Durable Sessions
        </h1>
        <p className="text-lg text-gray-400 mb-12">
          Visual direction prototypes. Each explores a different aesthetic for
          the break/recover narrative.
        </p>

        <div className="grid gap-6">
          <Link
            href="/a"
            className="group block p-8 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300 text-left hover:bg-white/[0.02]"
          >
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-sm font-mono text-indigo-400">A</span>
              <h2 className="text-2xl font-semibold group-hover:text-indigo-300 transition-colors">
                Dither Matrix
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              Real-time pixel dithering. Elements dissolve into ordered noise
              and reconverge. Terminal/infrastructure feel.
            </p>
          </Link>

          <Link
            href="/b"
            className="group block p-8 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 text-left hover:bg-white/[0.02]"
          >
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-sm font-mono text-cyan-400">B</span>
              <h2 className="text-2xl font-semibold group-hover:text-cyan-300 transition-colors">
                Glitch Protocol
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              RGB channel splitting, chromatic aberration, scan lines. A
              transmission being disrupted and recovered.
            </p>
          </Link>

          <Link
            href="/c"
            className="group block p-8 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 text-left hover:bg-white/[0.02]"
          >
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-sm font-mono text-emerald-400">C</span>
              <h2 className="text-2xl font-semibold group-hover:text-emerald-300 transition-colors">
                Signal Persistence
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              Geometric fragmentation with smooth reassembly. Refined
              engineering aesthetic with subtle noise grain.
            </p>
          </Link>
          <Link
            href="/b-full"
            className="group block p-8 rounded-xl border border-cyan-500/30 bg-cyan-500/[0.02] hover:border-cyan-500/50 transition-all duration-300 text-left hover:bg-cyan-500/[0.04]"
          >
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-sm font-mono text-cyan-400">B+</span>
              <h2 className="text-2xl font-semibold group-hover:text-cyan-300 transition-colors">
                Glitch Protocol — Full Site
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              Selected direction with all content: scroll narrative + problem
              framing, definition, convergence, stats, developer voices, CTA.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
