ALTER TABLE "proposals" ADD COLUMN "public_token" text;--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_public_token_unique" UNIQUE("public_token");