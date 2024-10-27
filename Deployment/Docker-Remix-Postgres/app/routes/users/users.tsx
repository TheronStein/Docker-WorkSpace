export async function loader() {
    return json(await getUsers());
  }
  
  export default function Users() {
    return (
      <UsersView users={useLoaderData<typeof loader>()} />
    );
  }