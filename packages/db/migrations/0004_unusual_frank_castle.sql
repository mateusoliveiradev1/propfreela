ALTER TABLE "proposals" ADD COLUMN "view_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "last_viewed_at" timestamp with time zone;