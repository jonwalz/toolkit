alter table "public"."storyAccomplishments" add column "user_id" uuid;

alter table "public"."storyAccomplishments" add constraint "public_storyAccomplishments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."storyAccomplishments" validate constraint "public_storyAccomplishments_user_id_fkey";

create policy "Enable insert for users based on user_id"
on "public"."storyAccomplishments"
as permissive
for insert
to public
with check ((user_id = auth.uid()));



