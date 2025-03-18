CREATE TABLE "analytics" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "analytics_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"url_id" integer NOT NULL,
	"ip_address" varchar(39) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "urls" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "urls_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"original_url" varchar(2048) NOT NULL,
	"expires_at" timestamp DEFAULT NOW() + INTERVAL '1 month',
	"alias" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "urls_alias_unique" UNIQUE("alias")
);
--> statement-breakpoint
CREATE INDEX "url_idx" ON "analytics" USING btree ("url_id");--> statement-breakpoint
CREATE INDEX "alias_idx" ON "urls" USING btree ("alias");