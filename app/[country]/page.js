import HomePage from "@/Components/HomePage";


export default function CountryPage({ params }) {
  return <HomePage countryFromURL={params.country} />;
}