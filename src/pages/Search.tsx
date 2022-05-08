import { FC } from "react";
import NavBar from "../components/NavBar";
import SearchBox from "../components/Search/SearchBox";
import SearchResult from "../components/Search/SearchResult";
import Title from "../components/Title";
import TopSearches from "../components/Home/TopSearches";
import { useQueryParams } from "../hooks/useQueryParams";
import { Link } from "react-router-dom";

const Search: FC = () => {
  const queryParams = useQueryParams();
  const query = queryParams.get("q");
  console.log(!query?.trim())
  
  if (!query?.trim())
    return (
      <>
        <Title value="Search" />
        <Link to="/" type="button" className="bg-transparent absolute top-0 right-0 rounded-md p-2 pt-5 pr-5 inline-flex items-center justify-center text-gray-400 hover:brightness-150">
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        <div className="flex justify-center my-[100px] mx-6">
          <div className="w-full max-w-[400px] flex flex-col items-center gap-4">
            <div className="flex flex-col items-stretch gap-3">
              <h1 className="text-2xl">Search for your favorite movies</h1>
              <SearchBox autoFocus />
            </div>

            <div className="mt-8 w-full">
              <h1 className="text-lg mb-3">Top Searches</h1>
              <TopSearches />
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Title value={`Search for ${query}`} />
      <div className="flex flex-col items-stretch mx-[7vw] mb-8">
        <NavBar />
        <div>
          <h1 className="mb-6 text-3xl">Search result for {query}</h1>
        </div>
        <SearchResult query={query} />
      </div>
    </>
  );
};

export default Search;
