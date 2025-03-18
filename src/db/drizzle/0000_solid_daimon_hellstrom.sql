CREATE TABLE "analytics" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "analytics_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"urlId" integer NOT NULL,
	"ipAdress" varchar(39) NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "urls" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "urls_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"originalUrl" varchar(2048) NOT NULL,
	"expiresAt" timestamp DEFAULT now() + INTERVAL 1 MONTH,
	"alias" varchar(20) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "urls_alias_unique" UNIQUE("alias")
);
--> statement-breakpoint
CREATE INDEX "url_idx" ON "analytics" USING btree ("urlId");