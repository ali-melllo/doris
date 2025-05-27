"use client"
import createGlobe from "cobe"
import { Baby, Briefcase, BriefcaseMedical, HomeIcon, Landmark, Map, Sparkles } from "lucide-react"
import Link from "next/link"
import { FunctionComponent, useEffect, useRef } from "react"

export const GlobalDatabase: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 4.7

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: 1200 * 2,
      height: 1200 * 2,
      phi: 0,
      theta: -0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 25000,
      mapBrightness: 13,
      mapBaseBrightness: 0.05,
      baseColor: [0.3, 0.3, 0.3],
      glowColor: [0.15, 0.15, 0.15],
      markerColor: [100, 100, 100],
      markers: [
        // { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
        // { location: [40.7128, -74.006], size: 0.03 }, // New York City
        // { location: [35.6895, 139.6917], size: 0.03 }, // Tokyo
        // { location: [28.7041, 77.1025], size: 0.03 }, // Delhi
      ],
      onRender: (state: { phi?: number }) => {
        state.phi = phi
        phi += 0.0002
      },
    })

    return () => {
      globe.destroy()
    }
  }, [])

  const features = [
    {
      name: "Global Clusters",
      description: "Enable low-latency global access, enhancing performance.",
    },
    {
      name: "Serverless Triggers",
      description: "Trigger functions automatically for dynamic app behavior.",
    },
    {
      name: "Monitoring & Alerts",
      description:
        "Monitor health with key metrics or integrate third-party tools.",
    },
  ]

  return (
    <div className="">
      <section
        aria-labelledby="global-database-title"
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center overflow-hidden pt-14"
      >
        <div className="absolute top-[15rem] size-[40rem] rounded-full bg-green-800 blur-3xl md:top-[20rem]" />
        <div className="z-10 inline-block rounded-lg border border-primary/20 bg-green-800/20 px-3 py-1.5 font-semibold uppercase leading-4 tracking-tight sm:text-sm">
          <span className="bg-gradient-to-b from-green-200 to-primary bg-clip-text text-transparent">
            Made for the migrants
          </span>
        </div>
        <h2
          id="global-database-title"
          className="z-10 mt-6 inline-block bg-gradient-to-b from-white to-primary bg-clip-text px-2 text-center text-3xl font-bold tracking-tighter text-transparent md:text-8xl"
        >
          Doris <span className="text-primary">AI</span> 
          <br /> 
         <span className="text-gray-300">The New Migrants Solution</span> 
        </h2>
        <canvas
          className="absolute top-[7.1rem] z-20 aspect-square size-full max-w-fit md:top-[12rem]"
          ref={canvasRef}
          style={{ width: 1200, height: 1200 }}
        />
        <div className="z-20 -mt-32 h-[36rem] w-full overflow-hidden md:-mt-36">
          <div className="absolute bottom-0 h-3/5 w-full bg-gradient-to-b from-transparent via-gray-950/95 to-background" />
          <div className="absolute inset-x-6 bottom-24 m-auto max-w-4xl md:top-2/3">
            <div className="flex flex-col gap-5 rounded-md border border-white/[3%] bg-white/[1%] p-5 shadow-xl backdrop-blur md:grid-cols-3">
              <div className="flex flex-row items-center justify-center gap-3">
                <span className="size-24 font-semibold text-sm flex flex-col gap-2 items-center justify-center rounded-2xl bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
                  <BriefcaseMedical className="stroke-primary" />
                  Medical
                </span>
                <span className="size-24 font-semibold text-sm flex flex-col gap-2 items-center justify-center rounded-2xl bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
                  <Briefcase className="stroke-primary" />
                  Jobs
                </span>
                <Link href={'/chat'} className="size-24 font-semibold text-sm flex flex-col gap-2 items-center justify-center rounded-2xl bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
                  <Sparkles className="stroke-primary" />
                  AI Chat
                </Link>
              </div>
              <div className="flex flex-row items-center justify-center gap-3">
                <span className="size-24 font-semibold text-sm flex flex-col gap-2 items-center justify-center rounded-2xl bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
                  <Landmark className="stroke-primary" />
                  Government
                </span>
                <span className="size-24 font-semibold text-sm flex flex-col gap-2 items-center justify-center rounded-2xl bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
                  <HomeIcon className="stroke-primary" />
                  Housing
                </span>
                <span className="size-24 font-semibold text-sm flex flex-col gap-2 items-center justify-center rounded-2xl bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
                  <Map className="stroke-primary" />
                  Map
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
