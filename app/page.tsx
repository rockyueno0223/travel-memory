import MainVisual from "@/components/MainVisual";

export default async function Index() {
  const desktopImages = [
    "main-visual1-pc.jpg",
    "main-visual2-pc.jpg",
    "main-visual3-pc.jpg",
    "main-visual4-pc.jpg"
  ];

  return (
    <div className="w-full relative">
      <MainVisual desktopImages={desktopImages} />
    </div>
  );
}
