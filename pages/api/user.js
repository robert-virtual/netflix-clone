import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return res.json({
      msg: "debes iniciar session para acceder a esta ruta",
      session,
    });
  }

  res.json({ msg: `welcome ${session.user.name}` });
};
