import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  // required when using unstable features
  experimental: {
    externalTables: true,
  },
  // declare the `users` table and `role` enum as external
  tables: {
    external: [
      "auth.audit_log_entries",
      "auth.users",
      "auth.flow_state",
      "auth.identities",
      "auth.instances",
      "auth.mfa_amr_claims",
      "auth.mfa_challenges",
      "auth.mfa_factors",
      "auth.one_time_tokens",
      "auth.refresh_tokens",
      "auth.saml_providers",
      "auth.saml_relay_states",
      "auth.schema_migrations",
      "auth.schema_migrations",
      "auth.sessions",
      "auth.sso_domains",
      "auth.sso_providers",
    ],
  },
  enums: {
    external: [
      "auth.aal_level",
      "auth.code_challenge_method",
      "auth.factor_status",
      "auth.factor_type",
      "auth.one_time_token_type",
    ],
  },
  migrations: {
    seed: "tsx seed.ts",
  },
});
