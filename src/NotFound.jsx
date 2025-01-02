import { useRouteError } from "react-router-dom";
function NotFound() {
  const err = useRouteError(); // Gives the error object or null if no error
  console.log(err);

  return (
    <>

      <div className="notFoundParent">
        {err ? (
          <>
            <h2 className="notFound">{err.status} {err.statusText}</h2>
            <h3 className="notFoundTwo">{err.data || "An unexpected error occurred."}</h3>
          </>
        ) : (
          <h2 className="notFound">404 Not Found</h2>
        )}
      </div>
      
    </>
  );
}

export default NotFound;
