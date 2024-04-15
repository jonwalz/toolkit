drop policy "Enable delete for users based on user_id" on "public"."progress";

drop policy "Update by user id" on "public"."progress";

drop policy "Enable read access for all users" on "public"."storyAccomplishments";

revoke delete on table "public"."storyAccomplishments" from "anon";

revoke insert on table "public"."storyAccomplishments" from "anon";

revoke references on table "public"."storyAccomplishments" from "anon";

revoke select on table "public"."storyAccomplishments" from "anon";

revoke trigger on table "public"."storyAccomplishments" from "anon";

revoke truncate on table "public"."storyAccomplishments" from "anon";

revoke update on table "public"."storyAccomplishments" from "anon";

revoke delete on table "public"."storyAccomplishments" from "authenticated";

revoke insert on table "public"."storyAccomplishments" from "authenticated";

revoke references on table "public"."storyAccomplishments" from "authenticated";

revoke select on table "public"."storyAccomplishments" from "authenticated";

revoke trigger on table "public"."storyAccomplishments" from "authenticated";

revoke truncate on table "public"."storyAccomplishments" from "authenticated";

revoke update on table "public"."storyAccomplishments" from "authenticated";

revoke delete on table "public"."storyAccomplishments" from "service_role";

revoke insert on table "public"."storyAccomplishments" from "service_role";

revoke references on table "public"."storyAccomplishments" from "service_role";

revoke select on table "public"."storyAccomplishments" from "service_role";

revoke trigger on table "public"."storyAccomplishments" from "service_role";

revoke truncate on table "public"."storyAccomplishments" from "service_role";

revoke update on table "public"."storyAccomplishments" from "service_role";

alter table "public"."storyAccomplishments" drop constraint "storyAccomplishments_pkey";

drop index if exists "public"."storyAccomplishments_pkey";

drop table "public"."storyAccomplishments";

create policy "Update single progress entry"
on "public"."progress"
as permissive
for update
to public
using ((user_id = auth.uid()));



