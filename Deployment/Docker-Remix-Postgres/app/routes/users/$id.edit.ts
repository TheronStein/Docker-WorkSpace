import type { 
  ActionFunctionArgs, 
  LoaderFunctionArgs, 
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getUser, updateUser } from "../data";

export const loader = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  invariant(params.userId, "Missing contactId param");
  const formData = await request.formData();
  const firstName = formData.get("first");
  const lastName = formData.get("last");
  const updates = Object.fromEntries(formData);
  await updateContact(params.userId, updates);
  return redirect(`/contacts/${params.userId}`);
}
}: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const user = await getContact(params.userId);
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ user });
};

const updates = Object.fromEntries(formData);
updates.first; // "Some"
updates.last; // "Name"

export default function EditUser() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <Form key={user.id} id="contact-form" method="post">
      <p>
        <span>Name</span>
        <input
          defaultValue={user.first}
          aria-label="First name"
          name="first"
          type="text"
          placeholder="First"
        />
        <input
          aria-label="Last name"
          defaultValue={user.last}
          name="last"
          placeholder="Last"
          type="text"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          defaultValue={user.twitter}
          name="twitter"
          placeholder="@jack"
          type="text"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          aria-label="Avatar URL"
          defaultValue={user.avatar}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          defaultValue={user.notes}
          name="notes"
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}