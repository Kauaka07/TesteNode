import { sql } from "./db.js";

await sql`
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL
);
`;

console.log("Tabela criada com sucesso ");