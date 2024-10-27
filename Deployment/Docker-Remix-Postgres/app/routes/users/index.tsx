
export default function Index() {
    const { users } = useLoaderData<typeof loader>();
    
return (
    <html lang="en">
      {/* existing elements */}
      <body>
        <div id="sidebar">
          {/* existing elements */}
          <div 
            className={
            navigation.state === "loading" ? "loading" : ""
            }
            id="detail"
            >
          </div>
          <ul>
            {user.map((user) => (
              <li key={user.id}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "active"
                      : isPending
                      ? "pending"
                      : ""
                  }
                  to={`contacts/${user.id}`}
                >
                  {/* existing elements */}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* existing elements */}
        </div>
        {/* existing elements */}
      </body>
    </html>
  );
}