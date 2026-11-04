CREATE TABLE "local_thread_events" (
	"seq" bigserial PRIMARY KEY NOT NULL,
	"thread_id" text NOT NULL,
	"event" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "local_thread_locks" (
	"thread_id" text PRIMARY KEY NOT NULL,
	"run_id" text NOT NULL,
	"join_token" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "local_threads" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"agent_id" text NOT NULL,
	"name" text,
	"archived" boolean DEFAULT false NOT NULL,
	"learning_container_id" text,
	"last_run_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "local_thread_events_thread_idx" ON "local_thread_events" USING btree ("thread_id","seq");--> statement-breakpoint
CREATE INDEX "local_threads_user_idx" ON "local_threads" USING btree ("user_id","updated_at");