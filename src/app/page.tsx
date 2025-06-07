import { Hero } from "../templates/hero";
import { generatePageMetadata } from "../utils/page-title";

export const metadata = generatePageMetadata("Home", "Home page")

export default function Home() {

  return (
    <main>
      <Hero />
    </main>
  );
}
