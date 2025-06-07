
const Error = () => {
  return (
    <>
   <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-7xl font-bold">Error 404</h1>
      <h2 className="text-4xl">Page Not Found !!</h2>
      <h3 className="2xl">The Page You are trying to visit either not exists or moved to a new Url.!!</h3>
      <a href="/dashboard"><h3 className="underline">Back to Home</h3></a>
      </div>

    </>
  )
}

export default Error
