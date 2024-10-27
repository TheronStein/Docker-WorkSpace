import type { FunctionComponent } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getUser } from "../data";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
    invariant(params.userId, "Missing contactId param");{
    if (!user) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ user });
  };

export default function User() {

    const user = {
        first: "Your",
        last: "Name",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "your_handle",
        notes: "Some notes",
        favorite: true,
    };

    return (
    <div id="user">
      <div>
        <img
          alt={`${user.first} ${user.last} avatar`}
          key={user.avatar}
          src={user.avatar}
        />
      </div>

      <div>
        <h1>
          {user.first || user.last ? (
            <>
              {user.first} {user.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={user} />
        </h1>

        {user.twitter ? (
          <p>
            <a
              href={`https://twitter.com/${user.twitter}`}
            >
              {user.twitter}
            </a>
          </p>
        ) : null}

        {user.notes ? <p>{user.notes}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, "favorite">;
}> = ({ contact }) => {
  const favorite = contact.favorite;

  return (
    <Form method="post">
      <button
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
};