import Contacts from "../contacts/contacts-component"

export const SearchList = ({searchResults, setSearchResults}) => {
  return (
    <div className="mt-4">
        <h1 className="tracking-wide font-light text-green_4 font-bold text-lg mb-2">Contacts</h1>

        <div className="flex flex-col">
            {
                searchResults.map((result) => (<Contacts result={result} setSearchResults={setSearchResults}></Contacts>))
            }
        </div>
    </div>
  )
}
